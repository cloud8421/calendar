import moment from 'moment';
import Baobab from 'baobab';
import AppDispatcher from './dispatcher';
import Transport from './ajax-transport';
import Event from './entities/event';
import {incOneMonth, decOneMonth} from './utils';

let facets = {
  eventsGroupedByDay: {
    cursors: {
      events: ['events']
    },
    get: function(data) {
      return Event.groupByDay(data.events);
    }
  }
}

let stateOpts = {
  facets: facets,
  autoCommit: false
}

let State = new Baobab({
    startDate: null,
    currentDate: moment(),
    currentDetails: null,
    workspaceOpen: false,
    events: []
  },
  stateOpts);

let startDateCursor = State.select('startDate');
let workspaceOpenCursor = State.select('workspaceOpen');
let eventsCursor = State.select('events');

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case 'forward-one-month':
      startDateCursor.apply(incOneMonth);
      State.set('currentDetails', null);
      State.commit();
      break;
    case 'back-one-month':
      startDateCursor.apply(decOneMonth);
      State.set('currentDetails', null);
      State.commit();
      break;
    case 'set-current-date':
      State.set('startDate', payload.value);
      State.set('currentDetails', null);
      State.commit();
      break;
    case 'open-details':
      State.set('currentDetails', payload.value);
      State.commit();
      break;
    case 'open-workspace':
      State.set('workspaceOpen', true);
      State.commit();
      break;
    case 'close-workspace':
      State.set('workspaceOpen', false);
      State.commit();
      break;
    case 'get-events':
      Transport.fetchEvents((data) => {
        State.set('events', data);
        State.commit();
      });
      break;
    case 'create-event':
      Transport.createEvent(payload.value, (created) => {
        eventsCursor.apply((current) => {
          current.push(created);
          return current;
        });
        State.set('workspaceOpen', false);
        State.commit();
      });
      break;
    case 'delete-event':
      eventsCursor.apply((current) => {
        return current.filter((evt) => {
          return evt.id !== payload.value.id
        });
      });
      State.commit();
      break;
    default:
      return true
  }
});

export default State;

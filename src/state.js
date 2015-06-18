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
  autocommit: false
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
      break;
    case 'back-one-month':
      startDateCursor.apply(decOneMonth);
      State.set('currentDetails', null);
      break;
    case 'set-current-date':
      State.set('startDate', payload.value);
      State.set('currentDetails', null);
      break;
    case 'open-details':
      State.set('currentDetails', payload.value);
      break;
    case 'open-workspace':
      State.set('workspaceOpen', true);
      break;
    case 'close-workspace':
      State.set('workspaceOpen', false);
      break;
    case 'get-events':
      Transport.fetchEvents((data) => {
        State.set('events', data);
      });
      break;
    case 'create-event':
      eventsCursor.apply((current) => {
        current.push(payload.value);
        return current;
      });
      break;
    default:
      return true
  }
  State.commit();
});

export default State;

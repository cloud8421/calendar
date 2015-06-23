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
    workspaceOpen: false,
    events: [],
    weather: {}
  },
  stateOpts);

let startDateCursor = State.select('startDate');
let workspaceOpenCursor = State.select('workspaceOpen');
let eventsCursor = State.select('events');

let addEvent = (newEvent) => {
  eventsCursor.apply((current) => {
    current.push(newEvent);
    return current;
  });
  State.set('workspaceOpen', false);
  State.commit();
}

let deleteEvent = (evtId) => {
  eventsCursor.apply((current) => {
    return current.filter((evt) => {
      return evt.id !== evtId
    });
  });
  State.commit();
}

let setError = (error, resp) => {
  console.log(error);
  console.log(resp);
}

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case 'set-start-date':
      State.set('startDate', payload.value);
      State.set('currentDate', null);
      State.commit();
      break;
    case 'go-to-date':
      State.set('currentDate', payload.value);
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
      Transport.createEvent(payload.value, addEvent, setError);
      break;
    case 'delete-event':
      Transport.deleteEvent(payload.value, deleteEvent, setError);
      break;
    case 'get-weather':
      Transport.fetchWeather((data) => {
        State.set('weather', data);
        State.commit();
      });
    default:
      return true
  }
});

export default State;

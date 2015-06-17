import moment from 'moment';
import Baobab from 'baobab';
import AppDispatcher from './dispatcher';
import Transport from './ajax-transport';

let currentDate = moment();

let stateOpts = {
  autocommit: false
}

let State = new Baobab({
    startDate: null,
    currentDate: currentDate,
    currentDetails: null,
    workspaceOpen: false,
    clusteredEvents: {},
    events: []
  },
  stateOpts);

let incOneMonth = (current) => {
  return current.add(1, 'month')
}

let decOneMonth = (current) => {
  return current.subtract(1, 'month')
}

let clusterEvents = (events) => {
  let initial = {}

  events.forEach((evt) => {
    let start = evt.startsAt;
    let year = start.getFullYear();
    let month = start.getMonth();
    let day = start.getDate();

    let yearMonthKey = `${year}-${month}`;

    if (!initial[yearMonthKey]) {
      initial[yearMonthKey] = {};
    }

    if (!initial[yearMonthKey][day]) {
      initial[yearMonthKey][day] = [evt];
    } else {
      initial[yearMonthKey][day].push(evt);
    }
  });

  return initial;
}

let startDateCursor = State.select('startDate');
let workspaceOpenCursor = State.select('workspaceOpen');

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
        State.set('clusteredEvents', clusterEvents(data));
      });
    default:
      return true
  }
  State.commit();
});

export default State;

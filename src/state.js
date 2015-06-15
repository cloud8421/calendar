import moment from 'moment';
import Baobab from 'baobab';
import AppDispatcher from './dispatcher';

let toBeginningOfMonth = function(mom) {
  return mom.date(1);
}

let currentDate = moment();

let State = new Baobab({
  startDate: null,
  currentDate: currentDate,
  currentDetails: null,
  events: [
    {
      id: 1,
      name: 'Dentist',
      startsAt: new Date(2015,5,1,10,30),
      endsAt:   new Date(2015,5,1,11,30)
    },
    {
      id: 2,
      name: 'Important meeting',
      startsAt: new Date(2015,5,8,10,30),
      endsAt:   new Date(2015,5,8,11,30)
    },
    {
      id: 3,
      name: 'Someone\'s birthday',
      startsAt: new Date(2015,5,10,10,30),
      endsAt:   new Date(2015,5,10,11,30)
    },
    {
      id: 4,
      name: 'Pub Night',
      startsAt: new Date(2015,5,10,17,30),
      endsAt:   new Date(2015,5,10,18,30)
    },
  ]
})

let incOneMonth = (current) => {
  return current.add(1, 'month')
}

let decOneMonth = (current) => {
  return current.subtract(1, 'month')
}

let startDateCursor = State.select('startDate');

startDateCursor.on('update', () => {
  State.set('currentDetails', null);
});

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case 'forward-one-month':
      startDateCursor.apply(incOneMonth);
      break;
    case 'back-one-month':
      startDateCursor.apply(decOneMonth);
      break;
    case 'set-current-date':
      State.set('startDate', payload.value);
      break;
    case 'open-details':
      State.set('currentDetails', payload.value);
      break;
    default:
      return true
  }
});

export default State;

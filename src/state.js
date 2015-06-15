import moment from 'moment';
import Baobab from 'baobab';
import AppDispatcher from './dispatcher';

let toBeginningOfMonth = function(d) {
  return moment(d).date(1)._d;
}

let currentDate = new Date();
let startDate = toBeginningOfMonth(currentDate);

let State = new Baobab({
  startDate: startDate,
  currentDate: currentDate,
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
  return moment(current)
         .add(1, 'month')
         ._d
}

let decOneMonth = (current) => {
  return moment(current)
         .subtract(1, 'month')
         ._d
}

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case 'forward-one-month':
      State
        .select('startDate')
        .apply(incOneMonth);
      break;
    case 'back-one-month':
      State
        .select('startDate')
        .apply(decOneMonth);
      break;
    default:
      return true
  }
});

export default State;

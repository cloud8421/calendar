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
  currentDate: currentDate
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

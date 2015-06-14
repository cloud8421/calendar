import moment from 'moment';

let now = function() {
  return new Date();
}

let toBeginningOfMonth = function(d) {
  return moment(d).date(1)._d;
}

let currentTime = now();

let startDate = toBeginningOfMonth(currentTime);

export default {
  startDate: startDate,
  now: currentTime
}

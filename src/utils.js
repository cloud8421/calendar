import moment from 'moment';
import C from 'calendar';

let Cal = new C.Calendar(1); // Monday;

let isSameDay = (d1, d2) => {
  return moment(d1).isSame(d2, 'day');
}

let dateToDayPair = (d, now) => {
  return {
    day: d,
    selected: isSameDay(d, now)
  }
}

let weeksFromDate = function(d, now) {
  return Cal.monthDates(d.getFullYear(),
                       d.getMonth(),
                       (curDate) => dateToDayPair(curDate, now),
                       (curWeek) => curWeek)
}

export default {
  isSameDay,
  dateToDayPair,
  weeksFromDate
}

import moment from 'moment';
import C from 'calendar';

let Cal = new C.Calendar(1); // Monday;

let rotate = (array) => {
  let first = array.shift();
  array.push(first);
  return array;
}

let weekDays = () => {
  return rotate(moment.weekdaysShort())
}

let isSameDay = (mom1, mom2) => {
  return mom1.isSame(mom2, 'day');
}

let dateToDayPair = (d, now) => {
  return {
    day: d,
    selected: isSameDay(d, now)
  }
}

let weeksFromDate = (mom, now) => {
  let d = mom._d;
  return Cal.monthDates(d.getFullYear(),
                       d.getMonth(),
                       (curDate) => dateToDayPair(moment(curDate), now),
                       (curWeek) => curWeek)
}

export default {
  weekDays,
  weeksFromDate
}

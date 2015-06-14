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

let weeksFromDate = (d, now) => {
  return Cal.monthDates(d.getFullYear(),
                       d.getMonth(),
                       (curDate) => dateToDayPair(curDate, now),
                       (curWeek) => curWeek)
}

let followingMonthFromDate = (d) => {
  return moment(d).add(1, 'month');
}

let previousMonthFromDate = (d) => {
  return moment(d).subtract(1, 'month');
}

export default {
  weeksFromDate,
  followingMonthFromDate,
  previousMonthFromDate
}

import moment from 'moment';
import C from 'calendar';

let Cal = new C.Calendar(1); // Monday;

let rotate = (array) => {
  let first = array.shift();
  array.push(first);
  return array;
}

let incOneMonth = (current) => {
  return current.add(1, 'month')
}

let decOneMonth = (current) => {
  return current.subtract(1, 'month')
}

let weekDays = () => {
  return rotate(moment.weekdaysShort())
}

let isSameDay = (mom1, mom2) => {
  return mom1.isSame(mom2, 'day');
}

let dateToDayPair = (d, selected) => {
  return {
    day: d,
    selected: isSameDay(d, selected)
  }
}

let weeksFromDate = (mom, now, selected) => {
  let d = mom._d;
  return Cal.monthDates(d.getFullYear(),
                       d.getMonth(),
                       (curDate) => dateToDayPair(moment(curDate), now, selected),
                       (curWeek) => curWeek)
}

export default {
  weekDays,
  weeksFromDate,
  isSameDay,
  incOneMonth,
  decOneMonth
}

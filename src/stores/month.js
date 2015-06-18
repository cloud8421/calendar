import State from '../state';
import Base from './_base';

// Setup cursors into main state and local data references
let eventsCursor = State.select('events');
let groupedEvents = {};

// Library functions to manipulate data
let groupByDay = (events) => {
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

// Store public API
class _MonthStore extends Base {
  getEvents() { return groupedEvents }
}

// Lifecycle setup - on state changes,
// manipulate local data and notify listeners
const MonthStore = new _MonthStore();
eventsCursor.on('update', (update) => {
  let flatList = update.data.data;
  groupedEvents = groupByDay(flatList);
  MonthStore.emitChange();
})

export default MonthStore;

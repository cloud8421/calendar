import State from '../state';
import Base from './_base';
import {groupByDay} from '../entities/event';

// Setup cursors into main state and local data references
let eventsCursor = State.select('events');
let groupedEvents = {};

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

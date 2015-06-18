import { EventEmitter } from "events";

const CHANGE_EVENT = 'change';

class Base extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }
  removeChangeListener(cb) {
    this.off(CHANGE_EVENT, cb);
  }
}

export default Base;

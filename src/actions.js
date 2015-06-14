import appDispatcher from './dispatcher';

const Actions = {
  setCurrentDay(date) {
    appDispatcher.dispatch({
      actionType: 'set-current-date',
      value: date
    });
  },
  forwardOneMonth() {
    appDispatcher.dispatch({
      actionType: 'forward-one-month'
    });
  },
  backOneMonth() {
    appDispatcher.dispatch({
      actionType: 'back-one-month'
    });
  }
}

export default Actions;

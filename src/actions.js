import appDispatcher from './dispatcher';

const Actions = {
  setCurrentDay(mom) {
    appDispatcher.dispatch({
      actionType: 'set-current-date',
      value: mom
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

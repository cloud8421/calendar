import appDispatcher from './dispatcher';

const Actions = {
  setStartDate(mom) {
    appDispatcher.dispatch({
      actionType: 'set-start-date',
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
  },
  openDetails(mom) {
    appDispatcher.dispatch({
      actionType: 'open-details',
      value: mom
    })
  },
  openWorkspace() {
    appDispatcher.dispatch({
      actionType: 'open-workspace'
    });
  },
  closeWorkspace() {
    appDispatcher.dispatch({
      actionType: 'close-workspace'
    });
  },
  getEvents() {
    appDispatcher.dispatch({
      actionType: 'get-events'
    });
  },
  createEvent(data) {
    appDispatcher.dispatch({
      actionType: 'create-event',
      value: data
    });
  },
  deleteEvent(evt) {
    appDispatcher.dispatch({
      actionType: 'delete-event',
      value: evt
    });
  }
}

export default Actions;

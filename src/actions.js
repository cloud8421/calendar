import appDispatcher from './dispatcher';

const Actions = {
  setStartDate(mom) {
    appDispatcher.dispatch({
      actionType: 'set-start-date',
      value: mom
    });
  },
  goToDate(mom) {
    appDispatcher.dispatch({
      actionType: 'go-to-date',
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
  },
  getWeather() {
    appDispatcher.dispatch({
      actionType: 'get-weather'
    });
  },
}

export default Actions;

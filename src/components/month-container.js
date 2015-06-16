import React from 'react';
import moment from 'moment';
import State from '../state';
import Month from './month';
import Actions from '../actions';
import Loading from './loading';

let startDateCursor;
let currentDateCursor;
let openDetailsCursor;
let eventsCursor;

let getState = () => {
  return {
    startDate: startDateCursor.get(),
    currentDate: currentDateCursor.get(),
    events: eventsCursor.get(),
  }
}

let validParams = (params) => {
  return params.year && params.month;
}

let setMonth = (params) => {
  let curDate;

  if (validParams(params)) {
    curDate = moment(new Date(params.year, params.month - 1, 1));
  } else {
    curDate = moment(new Date());
  }
  Actions.setCurrentDay(curDate);
}

let getEventsForMonth = (beginning) => {
  return eventsCursor.get().filter((ev) => {
    console.log(ev.startsAt)
      console.log(beginning._d)
    let result = moment(ev.startsAt).isBetween(beginning._d, beginning.endOf('month')._d);
    return result;
  });
}

class MonthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      currentDate: null
    }
  }
  render() {
    if (this.state.startDate && this.state.currentDate) {
      // let events = getEventsForMonth(this.state.startDate);
      let clustered = clusterEvents(this.state.startDate);
      console.log(clustered);

      // console.log(events.length);

      return (
        <Month startDate={this.state.startDate}
               currentDate={this.state.currentDate} />
      );
    } else {
      return <Loading />;
    }
  }
  componentWillMount() {
    startDateCursor   = State.select('startDate');
    currentDateCursor = State.select('currentDate');
    eventsCursor = State.select('events');
  }
  componentWillUnmount() {
    startDateCursor.release();
    currentDateCursor.release();
    eventsCursor.release();
  }
  componentWillReceiveProps(props) {
    if (props.params) { setMonth(props.params) }
  }
  componentDidMount() {
    if (this.props.params) { setMonth(this.props.params) }

    this.setState(getState());
    startDateCursor.on('update', () => {
      this.setState(getState());
    })
    currentDateCursor.on('update', () => {
      this.setState(getState());
    })
  }
}

export default MonthContainer;

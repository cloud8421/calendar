import React from 'react';
import moment from 'moment';
import State from '../state';
import Month from './month';
import Actions from '../actions';
import Loading from './loading';

let startDateCursor;
let currentDateCursor;
let openDetailsCursor;
let clusteredEventsCursor;
let currentDetailsCursor;

let getState = () => {
  return {
    startDate: startDateCursor.get(),
    currentDate: currentDateCursor.get(),
    clusteredEvents: clusteredEventsCursor.get(),
    currentDetails: currentDetailsCursor.get()
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

class MonthContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      currentDate: null,
      currentDetails: null,
      clusteredEvents: {}
    }
  }
  render() {
    if (this.state.startDate && this.state.currentDate) {
      return (
        <div className="month-container">
          <Month startDate={this.state.startDate}
                 currentDate={this.state.currentDate}
                 events={this.state.clusteredEvents}
                 details={this.state.currentDetails} />
          <section className="workspace"></section>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
  componentWillMount() {
    startDateCursor   = State.select('startDate');
    currentDateCursor = State.select('currentDate');
    clusteredEventsCursor = State.select('clusteredEvents');
    currentDetailsCursor = State.select('currentDetails');
  }
  componentWillUnmount() {
    startDateCursor.release();
    currentDateCursor.release();
    clusteredEventsCursor.release();
    currentDetailsCursor.release();
  }
  componentWillReceiveProps(props) {
    if (props.params) { setMonth(props.params) }
  }
  componentDidMount() {
    Actions.getEvents();
    if (this.props.params) { setMonth(this.props.params) }

    this.setState(getState());
    startDateCursor.on('update', () => {
      this.setState(getState());
    })
    currentDateCursor.on('update', () => {
      this.setState(getState());
    })
    currentDetailsCursor.on('update', () => {
      this.setState(getState());
    })
  }
}

export default MonthContainer;

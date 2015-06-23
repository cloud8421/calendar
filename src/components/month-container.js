import React from 'react';
import moment from 'moment';
import State from '../state';
import Month from './month';
import Actions from '../actions';
import Loading from './loading';

let startDateCursor;
let currentDateCursor;
let openDetailsCursor;

let eventsFacet = State.facets.eventsGroupedByDay;

let getState = () => {
  return {
    startDate: startDateCursor.get(),
    currentDate: currentDateCursor.get(),
    groupedEvents: eventsFacet.get()
  }
}

let validParams = (params) => {
  return params.year && params.month;
}

let setMonth = (params) => {
  let startDate;

  if (validParams(params)) {
    startDate = moment(new Date(params.year, params.month - 1, 1));
  } else {
    startDate = moment(new Date());
  }
  Actions.setStartDate(startDate);
}

class MonthContainer extends React.Component {
  constructor(props) {
    super(props);
    startDateCursor   = State.select('startDate');
    currentDateCursor = State.select('currentDate');

    this.state = getState();
  }
  render() {
    if (this.state.startDate) {
      return (
        <div className="month-container">
          <Month startDate={this.state.startDate}
                 currentDate={this.state.currentDate}
                 events={this.state.groupedEvents} />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
  componentWillMount() {
    startDateCursor   = State.select('startDate');
    currentDateCursor = State.select('currentDate');
  }
  componentWillUnmount() {
    startDateCursor.release();
    currentDateCursor.release();
    eventsFacet.off('update', () => {
      this.setState(getState());
    })
  }
  componentWillReceiveProps(props) {
    if (props.params) { setMonth(props.params) }
  }
  componentDidMount() {
    if (this.props.params) { setMonth(this.props.params) }

    this.setState(getState());
    eventsFacet.on('update', () => {
      this.setState(getState());
    })
    startDateCursor.on('update', () => {
      this.setState(getState());
    });
    currentDateCursor.on('update', () => {
      this.setState(getState());
    });
    Actions.getEvents();
  }
}

export default MonthContainer;

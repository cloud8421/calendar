import React from 'react';
import moment from 'moment';
import State from '../state';
import MonthStore from '../stores/month';
import Month from './month';
import Actions from '../actions';
import Loading from './loading';

let startDateCursor;
let currentDateCursor;
let openDetailsCursor;
let currentDetailsCursor;

let getState = () => {
  return {
    startDate: startDateCursor.get(),
    currentDate: currentDateCursor.get(),
    groupedEvents: MonthStore.getEvents(),
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
      groupedEvents: {}
    }
  }
  render() {
    if (this.state.startDate && this.state.currentDate) {
      return (
        <div className="month-container">
          <Month startDate={this.state.startDate}
                 currentDate={this.state.currentDate}
                 events={this.state.groupedEvents}
                 details={this.state.currentDetails} />
        </div>
      );
    } else {
      return <Loading />;
    }
  }
  componentWillMount() {
    startDateCursor   = State.select('startDate');
    currentDateCursor = State.select('currentDate');
    currentDetailsCursor = State.select('currentDetails');
  }
  componentWillUnmount() {
    startDateCursor.release();
    currentDateCursor.release();
    currentDetailsCursor.release();
    MonthStore.removeChangeListener(() => {
      this.setState(getState());
    })
  }
  componentWillReceiveProps(props) {
    if (props.params) { setMonth(props.params) }
  }
  componentDidMount() {
    if (this.props.params) { setMonth(this.props.params) }

    this.setState(getState());
    MonthStore.addChangeListener(() => {
      this.setState(getState());
    })
    startDateCursor.on('update', () => {
      this.setState(getState());
    });
    currentDateCursor.on('update', () => {
      this.setState(getState());
    });
    currentDetailsCursor.on('update', () => {
      this.setState(getState());
    });
    Actions.getEvents();
  }
}

export default MonthContainer;

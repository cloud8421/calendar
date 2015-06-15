import React from 'react';
import moment from 'moment';
import State from '../state';
import Month from './month';
import Actions from '../actions';
import Loading from './loading';

let startDateCursor;
let currentDateCursor;
let openDetailsCursor;

let getState = () => {
  return {
    startDate: startDateCursor.get(),
    currentDate: currentDateCursor.get()
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
      currentDate: null
    }
  }
  render() {
    if (this.state.startDate && this.state.currentDate) {
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
  }
  componentWillUnmount() {
    startDateCursor.release();
    currentDateCursor.release();
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

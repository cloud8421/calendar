import React from 'react';
import moment from 'moment';
import State from '../state';
import Month from './month';
import Actions from '../actions';

let startDateCursor = State.select('startDate');
let currentDateCursor = State.select('currentDate');

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
    this.state = getState();
  }
  render() {
    if (this.state.startDate && this.state.currentDate) {
      return (
        <section className="calendar">
          <Month startDate={this.state.startDate}
                 currentDate={this.state.currentDate} />
        </section>
      );
    } else {
      return <div className="loading">Loading</div>
    }
  }
  componentWillReceiveProps(props) {
    if (props.params) { setMonth(props.params) }
  }
  componentDidMount() {
    if (this.props.params) { setMonth(this.props.params) }
    startDateCursor.on('update', () => {
      this.setState(getState());
    })
    currentDateCursor.on('update', () => {
      this.setState(getState());
    })
  }
}

export default MonthContainer;

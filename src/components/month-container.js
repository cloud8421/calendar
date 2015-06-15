import React from "react";
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

class MonthContainer extends React.Component {
  constructor(props) {
    super(props);
    if (props.params) {
      let p = props.params;
      let curDate = new Date(p.year, p.month, 1);
      Actions.setCurrentDay(curDate);
    }
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
  componentDidMount() {
    startDateCursor.on('update', () => {
      this.setState(getState());
    })
    currentDateCursor.on('update', () => {
      this.setState(getState());
    })
  }
}

export default MonthContainer;

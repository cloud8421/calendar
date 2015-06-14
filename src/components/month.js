import React from 'react';
import moment from 'moment';
import c from 'calendar';
import Week from './week';

let Cal = new c.Calendar(1); // Monday;

let isSameDay = (d1, d2) => {
  return moment(d1).isSame(d2, 'day');
}

let dateToDayPair = (d, now) => {
  return {
    day: d,
    selected: isSameDay(d, now)
  }
}

let weeksFromDate = function(d, now) {
  return Cal.monthDates(d.getFullYear(),
                       d.getMonth(),
                       (curDate) => dateToDayPair(curDate, now),
                       (curWeek) => curWeek)
}

class Month extends React.Component {
  constructor(props) {
    super(props);
    let d = props.startDate;
    let now = props.now;
    this.state = {
      weeks: weeksFromDate(d, now)
    }
  }
  backOneMonth() {
    console.log('back');
  }
  forwardOneMonth() {
    console.log('forward');
  }
  render() {
    let weekComponents = this.state.weeks.map((week, idx) => {
      return <Week week={week} key={idx} />
    });
    let monthName = moment(this.props.startDate).format('MMMM')

    return (
      <div className="month">
        <header>
          <button onClick={this.backOneMonth}>&lt;&lt;</button>
          <h2>{monthName}</h2>
          <button onClick={this.forwardOneMonth}>&gt;&gt;</button>
        </header>
        {weekComponents}
      </div>
    )
  }
}

export default Month;

import React from 'react';
import moment from 'moment';
import c from 'calendar';

import Actions from '../actions';
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
  backOneMonth() {
    Actions.backOneMonth();
  }
  forwardOneMonth() {
    Actions.forwardOneMonth();
  }
  render() {
    let weeks = weeksFromDate(this.props.startDate, this.props.now);
    let weekComponents = weeks.map((week, idx) => {
      return <Week week={week} key={idx} />
    });
    let monthName = moment(this.props.startDate).format('MMMM YYYY')

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

import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import Actions from '../actions';
import Week from './week';
import U from '../utils';

class MonthHeaders extends React.Component {
  shouldComponentUpdate() { return false }
  render() {
    let labels = U.weekDays().map((day) => {
      return <li key={day}>{day}</li>
    });
    return (
      <ul className="day-names">{labels}</ul>
    )
  }
}

class Month extends React.Component {
  render() {
    let weeks = U.weeksFromDate(this.props.startDate, this.props.currentDate);
    let weekComponents = weeks.map((week, idx) => {
      return <Week week={week} key={idx} events={this.props.events} />
    });

    let startDate = this.props.startDate._d
    let nextMonth = moment(startDate).add(1, 'month');
    let prevMonth = moment(startDate).subtract(1, 'month');

    let monthName = moment(startDate).format('MMMM YYYY');

    return (
      <div className="month-container">
        <section className="calendar">
          <nav className="month-switcher">
            <Link to="month" params={{
                year: prevMonth.year(),
                month: prevMonth.month() + 1}}>
              &lt;
            </Link>
            <h1>{monthName}</h1>
            <Link to="month" params={{
                year: nextMonth.year(),
                month: nextMonth.month() + 1}}>
              &gt;
            </Link>
          </nav>
          <section className="month">
            <MonthHeaders />
            {weekComponents}
          </section>
        </section>
        <section className="workspace"></section>
      </div>
    )
  }
}

export default Month;

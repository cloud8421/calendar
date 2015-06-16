import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

class MonthSwitcher extends React.Component {
  render() {
    let startDate = this.props.startDate._d
    let nextMonth = moment(startDate).add(1, 'month');
    let prevMonth = moment(startDate).subtract(1, 'month');
    let monthName = moment(startDate).format('MMMM YYYY');

    return (
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
    )
  }
}

export default MonthSwitcher;

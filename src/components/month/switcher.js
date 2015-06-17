import React from 'react';
import moment from 'moment';
import {Link} from 'react-router';

class MonthSwitcher extends React.Component {
  render() {
    let startDate = this.props.startDate._d
    let nextMonth = moment(startDate).add(1, 'month');
    let prevMonth = moment(startDate).subtract(1, 'month');
    let monthName = moment(startDate).format('MMMM YYYY');
    let prevLinkParams = {
      year: prevMonth.year(),
      month: prevMonth.month() + 1
    };
    let nextLinkParams = {
      year: nextMonth.year(),
      month: nextMonth.month() + 1
    };

    return (
      <nav className="month-switcher">
        <Link to="month"
              className="ui"
              params={prevLinkParams}>&lt;</Link>
        <h1>{monthName}</h1>
        <Link to="month"
              className="ui"
              params={nextLinkParams}>&gt;</Link>
      </nav>
    )
  }
}

export default MonthSwitcher;

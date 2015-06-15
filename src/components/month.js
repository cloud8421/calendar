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
      return <div className='day-header' key={day}>{day}</div>
    });
    return (
      <div className='week-header'>
        {labels}
      </div>
    )
  }
}

class Month extends React.Component {
  render() {
    let weeks = U.weeksFromDate(this.props.startDate, this.props.currentDate);
    let weekComponents = weeks.map((week, idx) => {
      return <Week week={week} key={idx} />
    });

    let startDate = this.props.startDate._d
    let nextMonth = moment(startDate).add(1, 'month');
    let prevMonth = moment(startDate).subtract(1, 'month');

    let monthName = moment(startDate).format('MMMM YYYY');

    return (
      <div className="month">
        <header>
          <Link to="month" params={{
              year: prevMonth.year(),
              month: prevMonth.month() + 1}}>
            {prevMonth.format('MMM YYYY')}
          </Link>
          <h2>{monthName}</h2>
          <Link to="month" params={{
              year: nextMonth.year(),
              month: nextMonth.month() + 1}}>
            {nextMonth.format('MMM YYYY')}
          </Link>
        </header>
        <MonthHeaders />
        {weekComponents}
      </div>
    )
  }
}

export default Month;

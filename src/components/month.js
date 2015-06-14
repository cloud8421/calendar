import React from 'react';
import moment from 'moment';

import Actions from '../actions';
import Week from './week';
import U from '../utils';

class Month extends React.Component {
  render() {
    let weeks = U.weeksFromDate(this.props.startDate, this.props.currentDate);
    let weekComponents = weeks.map((week, idx) => {
      return <Week week={week} key={idx} />
    });
    let monthName = moment(this.props.startDate).format('MMMM YYYY');
    let nextLabel = U.followingMonthFromDate(this.props.startDate).format('MMM YYYY');
    let prevLabel = U.previousMonthFromDate(this.props.startDate).format('MMM YYYY');

    return (
      <div className="month">
        <header>
          <button onClick={Actions.backOneMonth}>{prevLabel}</button>
          <h2>{monthName}</h2>
          <button onClick={Actions.forwardOneMonth}>{nextLabel}</button>
        </header>
        {weekComponents}
      </div>
    )
  }
}

export default Month;

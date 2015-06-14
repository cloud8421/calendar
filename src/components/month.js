import React from 'react';
import moment from 'moment';

import Actions from '../actions';
import Week from './week';
import U from '../utils';

class Month extends React.Component {
  render() {
    let weeks = U.weeksFromDate(this.props.startDate, this.props.now);
    let weekComponents = weeks.map((week, idx) => {
      return <Week week={week} key={idx} />
    });
    let monthName = moment(this.props.startDate).format('MMMM YYYY')

    return (
      <div className="month">
        <header>
          <button onClick={Actions.backOneMonth}>&lt;&lt;</button>
          <h2>{monthName}</h2>
          <button onClick={Actions.forwardOneMonth}>&gt;&gt;</button>
        </header>
        {weekComponents}
      </div>
    )
  }
}

export default Month;

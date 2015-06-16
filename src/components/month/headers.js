import React from 'react';
import U from '../../utils';

class MonthHeaders extends React.Component {
  shouldComponentUpdate() { return false }
  render() {
    let labels = U.weekDays().map((day) => {
      return <li className="day-name" key={day}>{day}</li>
    });
    return (
      <ul className="day-names">{labels}</ul>
    )
  }
}

export default MonthHeaders;

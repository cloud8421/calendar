import React from 'react';
import moment from 'moment';
import PropTypes from '../prop-types';

let dayClass = (selected) => {
  return selected ? 'day selected' : 'day'
}

class Day extends React.Component {
  render() {
    let day = moment(this.props.day).format('D');
    let selected = this.props.selected;

    return (
      <div className={dayClass(selected)}>
        <span className="date">{day}</span>
      </div>
    )
  }
}

Day.propTypes = {
  day: PropTypes.date,
  selected: React.PropTypes.bool
};

export default Day;

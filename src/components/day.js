import React from 'react';
import moment from 'moment';
import PropTypes from '../prop-types';
import Actions from '../actions';

let dayClass = (selected) => {
  return selected ? 'day selected' : 'day'
}

class Day extends React.Component {
  render() {
    let day = moment(this.props.day).format('D');
    let selected = this.props.selected;

    return (
      <li className={dayClass(selected)} onClick={this.openDetails.bind(this)}>
        <span className="date">{day}</span>
      </li>
    )
  }
  openDetails() {
    Actions.openDetails(this.props.day);
  }
}

Day.propTypes = {
  day: PropTypes.mom,
  selected: React.PropTypes.bool
};

export default Day;

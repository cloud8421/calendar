import React from 'react';
import moment from 'moment';
import PropTypes from '../prop-types';
import Actions from '../actions';

let dayClass = (selected, count) => {
  let classes = ['day']
  if (selected) classes.push('today');
  if (count > 0) classes.push('with-events');
  return classes.join(' ');
}

class Day extends React.Component {
  render() {
    let day = moment(this.props.day).format('D');
    let selected = this.props.selected;
    let events = this.props.events;
    let eventsCount;

    return (
      <li className={dayClass(selected, events.length)} onClick={this.openDetails.bind(this)}>
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

import React from 'react';
import moment from 'moment';
import PropTypes from '../prop-types';
import State from '../state';

let dayClass = (selected) => {
  return selected ? 'day selected' : 'day'
}

let eventsCursor = State.select('events');

let getEvents = (day) => {
  return eventsCursor.get().filter((ev) => {
    return moment(ev.startsAt).isSame(day, 'day');
  });
}

class Day extends React.Component {
  render() {
    let eventsCount;
    let day = moment(this.props.day).format('D');
    let selected = this.props.selected;
    let dayEvents = getEvents(this.props.day);
    if (dayEvents.length > 0) {
      eventsCount = <span className="events-count">{dayEvents.length}</span>
    }

    return (
      <div className={dayClass(selected)}>
        <span className="date">{day}</span>
        {eventsCount}
      </div>
    )
  }
}

Day.propTypes = {
  day: PropTypes.date,
  selected: React.PropTypes.bool
};

export default Day;

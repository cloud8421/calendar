import React from 'react';
import moment from 'moment';
import PropTypes from '../../prop-types';

const TIME_FORMAT = 'LT'

let formatTime = (d) => {
  return moment(d).format(TIME_FORMAT);
}


class Event extends React.Component {
  render() {
    let evt = this.props.event;

    return (
      <li className="day-detail">
        <span className="when">
          <time dateTime={evt.startsAt}>{formatTime(evt.startsAt)}</time>
          <span> - </span>
          <time dateTime={evt.startsAt}>{formatTime(evt.endsAt)}</time>
        </span>
        <span className="description">{evt.name}</span>
      </li>
    )
  }
}

Event.propTypes = {
  event: PropTypes.evt
}

export default Event;

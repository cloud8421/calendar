import React from 'react';
import moment from 'moment';
import PropTypes from '../../prop-types';
import Actions from '../../actions';

const TIME_FORMAT = 'LT'

let formatTime = (d) => {
  if (d) {
    return moment(d).format(TIME_FORMAT);
  } else {
    return 'Not present';
  }
}


class Event extends React.Component {
  render() {
    let evt = this.props.event;

    return (
      <li className="day-detail">
        <span className="when">
          <time dateTime={evt.startsAt}>{formatTime(evt.startsAt)}</time>
          <span> - </span>
          <time dateTime={evt.endsAt}>{formatTime(evt.endsAt)}</time>
        </span>
        <span className="description">{evt.name}</span>
        <a className="ui action" onClick={this.deleteEvent.bind(this)}>✕</a>
      </li>
    )
  }
  deleteEvent() {
    Actions.deleteEvent(this.props.event);
  }
}

Event.propTypes = {
  event: PropTypes.evt
}

export default Event;

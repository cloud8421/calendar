import React from 'react';
import PropTypes from '../../prop-types';

import Event from './event';

class EventList extends React.Component {
  render() {
    let events = this.props.events;

    if (events.length > 0) {
      return (
        <ul>{events.map((evt) => <Event event={evt} key={evt.id} />)}</ul>
      )
    } else {
      return (
        <p>No events yet.</p>
      )
    }
  }
}

EventList.propTypes = {
  events: React.PropTypes.arrayOf(PropTypes.evt)
};

export default EventList;

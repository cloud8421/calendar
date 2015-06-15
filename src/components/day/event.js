import React from 'react';
import moment from 'moment';
import PropTypes from '../../prop-types';

let formatDate = (d) => {
  // return
}

class Event extends React.Component {
  render() {
    let evt = this.props.event;

    return (
      <li>
        <span className="description">{evt.name}</span>
        <span className="when">
          <time>{evt.startsAt}</time> - <time>{evt.endsAt}</time>
        </span>
      </li>
    )
  }
}

Event.propTypes = {
  event: PropTypes.evt
}

export default Event;

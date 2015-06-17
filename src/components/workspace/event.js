import React from 'react';
import moment from 'moment';
import PropTypes from '../../prop-types';

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
      <section className="event-preview">
        <h2>{evt.name}</h2>
        <dl>
          <dt>Starts</dt>
          <dd>
            <time dateTime={evt.startsAt}>{formatTime(evt.startsAt)}</time>
          </dd>
          <dt>Ends</dt>
          <dd>
            <time dateTime={evt.endsAt}>{formatTime(evt.endsAt)}</time>
          </dd>
        </dl>
      </section>
    )
  }
}

Event.propTypes = {
  event: PropTypes.evt
}

export default Event;

import React from 'react';
import moment from 'moment';
import PropTypes from '../../prop-types';
import Datetime from './datetime';

class Event extends React.Component {
  render() {
    let evt = this.props.event;

    return (
      <section className="event-preview">
        <h2>{evt.name}</h2>
        <dl>
          <dt>Starts</dt>
          <dd>
            <Datetime date={evt.startsAt} />
          </dd>
          <dt>Ends</dt>
          <dd>
            <Datetime date={evt.endsAt} />
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

import React from 'react';
import moment from 'moment';
import PropTypes from '../../prop-types';

import EventList from './event-list';

const DATE_FORMAT = 'dddd, MMMM Do YYYY'

class Details extends React.Component {
  render() {
    return (
      <section className="day-details">
        <h3>{this.props.day.format(DATE_FORMAT)}</h3>
        <EventList events={this.props.events} />
      </section>
    )
  }
}

Details.propTypes = {
  day: PropTypes.mom,
  events: React.PropTypes.arrayOf(PropTypes.evt)
};

export default Details;

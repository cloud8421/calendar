import React from 'react';
import PropTypes from '../prop-types';
import Day from './day';
import {allInDay} from '../entities/event';

class Week extends React.Component {
  render() {
    let days = this.props.week.map((dayObj, idx) => {
      let events = allInDay(this.props.events, dayObj.day);
      return <Day day={dayObj.day}
                  selected={dayObj.selected}
                  key={idx}
                  events={events} />
    });

    return <ul className="days">{days}</ul>
  }
}

Week.propTypes = {
  week: React.PropTypes.arrayOf(
            React.PropTypes.shape({
              day: PropTypes.mom,
              selected: React.PropTypes.boolean
            }))
};

export default Week;

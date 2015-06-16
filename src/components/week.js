import React from 'react';
import PropTypes from '../prop-types';
import Day from './day';

let eventsForDay = (day, events) => {
  let year = day.year();
  let month = day.month();
  let date = day.date();
  let yearMonthKey = `${year}-${month}`;

  if (events[yearMonthKey] && events[yearMonthKey][date]) {
    return events[yearMonthKey][date];
  } else {
    return [];
  }
}

class Week extends React.Component {
  render() {
    let days = this.props.week.map((dayObj, idx) => {
      let events = eventsForDay(dayObj.day, this.props.events);
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

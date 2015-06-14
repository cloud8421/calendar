import React from 'react';
import PropTypes from '../prop-types';
import Day from './day';

class Week extends React.Component {
  render() {
    let days = this.props.week.map((dayObj, idx) => {
      return <Day day={dayObj.day}
                  selected={dayObj.selected}
                  key={idx} />
    });

    return (
      <div className="week">
        {days}
      </div>
    )
  }
}

Week.propTypes = {
  week: React.PropTypes.arrayOf(
            React.PropTypes.shape({
              day: PropTypes.date,
              selected: React.PropTypes.boolean
            }))
};

export default Week;

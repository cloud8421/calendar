import React from 'react';
import Day from './day';

class Week extends React.Component {
  render() {
    let days = this.props.week.map((day, idx) => {
      return <Day day={day} key={idx} />
    });

    return (
      <div className="week">
        {days}
      </div>
    )
  }
}

Week.propTypes = { week: React.PropTypes.arrayOf(React.PropTypes.number) };

export default Week;

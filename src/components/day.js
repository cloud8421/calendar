import React from 'react';

class Day extends React.Component {
  render() {
    let day = this.props.day;

    return (
      <div className="day">
        <span className="date">
          {day !== 0 ? day : 'x'}
        </span>
      </div>
    )
  }
}

Day.propTypes = { day: React.PropTypes.number };

export default Day;

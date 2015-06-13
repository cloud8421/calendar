import React from 'react';
import c from 'calendar';

let Cal = new c.Calendar(1); // Monday;

let weeksFromDate = function(d) {
  return Cal.monthDays(d.getFullYear(), d.getMonth())
}

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

class Month extends React.Component {
  constructor(props) {
    super(props);
    let d = props.startDate;
    this.state = {
      weeks: weeksFromDate(d)
    }
  }
  render() {
    let weekComponents = this.state.weeks.map((week, idx) => {
      return <Week week={week} key={idx} />
    });
    return (
      <div className="month">
        {weekComponents}
      </div>
    )
  }
}

export default Month;

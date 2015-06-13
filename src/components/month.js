import React from 'react';
import moment from 'moment';
import c from 'calendar';
import Week from './week';

let Cal = new c.Calendar(1); // Monday;

let weeksFromDate = function(d) {
  return Cal.monthDays(d.getFullYear(), d.getMonth())
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
    let monthHeader = moment(this.props.startDate).format('MMMM')

    return (
      <div className="month">
        <h2>{monthHeader}</h2>
        {weekComponents}
      </div>
    )
  }
}

export default Month;

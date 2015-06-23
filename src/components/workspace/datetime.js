import React from 'react';
import moment from 'moment';
import PropTypes from '../../prop-types';

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';

let f = (d, format) => {
  if (d) {
   return moment(d).format(format)
  } else {
   return null;
  }
}

class Datetime extends React.Component {
  render() {
    let asDate = f(this.props.date, DATE_FORMAT);
    let asTime = f(this.props.date, TIME_FORMAT);

    return (
      <div className="datetime">
        <input type="date" value={asDate} readOnly={true} />
        <input type="time" value={asTime} readOnly={true} />
      </div>
    )
  }
}

Datetime.propTypes = {
  date: PropTypes.date
}

export default Datetime;

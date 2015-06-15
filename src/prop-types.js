import moment from 'moment';
import {PropTypes} from 'react';

let date = (props, propName, componentName) => {
  if (!moment.isDate(props[propName])) {
    return new Error(`Expected ${props[propName]} to be a date`);
  }
}

let mom = (props, propName, componentName) => {
  if (!moment.isMoment(props[propName])) {
    return new Error(`Expected ${props[propName]} to be a moment`);
  }
}

let evt = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  startsAt: PropTypes.date,
  endsAt: PropTypes.date
})

export default {
  date,
  mom,
  evt
}

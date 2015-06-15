import moment from 'moment';

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

export default {
  date,
  mom
}

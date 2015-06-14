import moment from 'moment';

let date = (props, propName, componentName) => {
  if (!moment.isDate(props[propName])) {
    return new Error(`expected ${props[propName]} to be a date`);
  }
}

export default {
  date
}

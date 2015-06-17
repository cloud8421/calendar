import q from 'qwest';
import moment from 'moment';

const API_URL = 'https://new-bamboo-calendar-api.herokuapp.com';

const HEADERS = {
  'Accept': 'application/vnd.calendar-v1+json'
}

let normalize = (events) => {
  return events.map((evt) => {
    evt.startsAt = moment(evt.starts_at)._d;
    evt.endsAt = moment(evt.ends_at)._d;
    return evt
  });
}

let fetchEvents = (cb) => {
  let opts = { headers: HEADERS };
  let url = `${API_URL}/events`;

  q.get(url, {}, opts)
    .then((data) => normalize(data))
    .then((norm) => cb(norm));
}

export default {
  fetchEvents
}

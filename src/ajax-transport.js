import q from 'qwest';
import moment from 'moment';

const API_URL = 'https://new-bamboo-calendar-api.herokuapp.com';

const HEADERS = {
  'Accept': 'application/vnd.calendar-v1+json'
}

let normalizeEvent = (evt) => {
  evt.startsAt = moment(evt.starts_at)._d;
  evt.endsAt = moment(evt.ends_at)._d;
  return evt
}

let normalizeEvents = (events) => {
  return events.map((evt) => normalizeEvent(evt));
}

let fetchEvents = (cb) => {
  let opts = { headers: HEADERS };
  let url = `${API_URL}/events`;

  q.get(url, {}, opts)
    .then((data) => normalizeEvents(data))
    .then((norm) => cb(norm));
}

let createEvent = (evtData, cb) => {
  let payload = {
    name: evtData.name,
    starts_at: evtData.startsAt.toISOString(),
    ends_at: evtData.endsAt.toISOString()
  };

  let opts = { headers: HEADERS };
  let url = `${API_URL}/events`;
  q.post(url, payload, opts)
    .then((data) => normalizeEvent(data))
    .then((norm) => cb(norm));
}

let deleteEvent = (evt, cb) => {
  let url = `${API_URL}/events/${evt.id}`;

  q.delete(url)
    .then((data) => cb(data));
}

export default {
  fetchEvents,
  createEvent,
  deleteEvent
}

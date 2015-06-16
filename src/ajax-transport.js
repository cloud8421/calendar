const API_URL = 'http://localhost:9292';

const HEADERS = {
  'Accept': 'application/vnd.calendar-v1+json'
}

let normalize = (events) => {
  return events.map((evt) => {
    evt.startsAt = new Date(evt.starts_at);
    evt.endsAt = new Date(evt.ends_at);
    return evt
  });
}

let fetchEvents = (cb) => {
  let opts = { method: 'GET',
               headers: HEADERS,
               mode: 'cors',
               cache: 'default' };
  let request = new Request(`${API_URL}/events`, opts);

  fetch(request, opts)
    .then((resp) => resp.json())
    .then((data) => normalize(data))
    .then((norm) => cb(norm))
}

export default {
  fetchEvents
}

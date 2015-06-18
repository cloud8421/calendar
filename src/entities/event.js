import chrono from 'chrono-node';

const SAMPLE_DESCRIPTION = 'Coffee with friends friday from 10am to 11am';

let build = () => {
  return {
    name: null,
    startsAt: null,
    endsAt: null
  }
}

let fromVerbalDescription = (desc) => {
  let parsed = chrono.parse(desc);
  let newEvent = build();
  if (parsed.length > 0) {
    let data = parsed[0];
    if (data.start) newEvent.startsAt = data.start.date();
    if (data.end) newEvent.endsAt = data.end.date();
    newEvent.name = desc.split(data.text)[0].trim();
  }
  return newEvent;
}

let isValid = (event) => {
  return event.name
    && event.startsAt
    && event.endsAt
}

let groupByDay = (events) => {
  let initial = {}

  events.forEach((evt) => {
    let start = evt.startsAt;
    let year = start.getFullYear();
    let month = start.getMonth();
    let day = start.getDate();

    let yearMonthKey = `${year}-${month}`;

    if (!initial[yearMonthKey]) {
      initial[yearMonthKey] = {};
    }

    if (!initial[yearMonthKey][day]) {
      initial[yearMonthKey][day] = [evt];
    } else {
      initial[yearMonthKey][day].push(evt);
    }
  });

  return initial;
}

let allInDay = (events, day) => {
  if (!day) return [];
  let year = day.year();
  let month = day.month();
  let date = day.date();
  let yearMonthKey = `${year}-${month}`;

  if (events[yearMonthKey] && events[yearMonthKey][date]) {
    return events[yearMonthKey][date];
  } else {
    return [];
  }
}

export default {
  build,
  isValid,
  fromVerbalDescription,
  groupByDay,
  allInDay,
  sampleDescription: SAMPLE_DESCRIPTION
}

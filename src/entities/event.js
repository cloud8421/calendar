import chrono from 'chrono-node';

let build = () => {
  return {
    name: 'e.g. Book dentist for friday at 9.00am',
    startAt: null,
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
    newEvent.name = desc;
  }
  return newEvent;
}

export default {
  build,
  fromVerbalDescription
}

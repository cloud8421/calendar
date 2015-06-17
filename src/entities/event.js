import chrono from 'chrono-node';

let build = () => {
  return {
    name: null,
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
    newEvent.name = desc.split(data.text)[0].trim();
  }
  return newEvent;
}

export default {
  build,
  fromVerbalDescription
}

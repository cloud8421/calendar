let events = [
  {
    id: 1,
    name: 'Dentist',
    startsAt: new Date(2015,5,1,10,30),
    endsAt:   new Date(2015,5,1,11,30)
  },
  {
    id: 2,
    name: 'Important meeting',
    startsAt: new Date(2015,5,8,10,30),
    endsAt:   new Date(2015,5,8,11,30)
  },
  {
    id: 3,
    name: 'Someone\'s birthday',
    startsAt: new Date(2015,5,10,10,30),
    endsAt:   new Date(2015,5,10,11,30)
  },
  {
    id: 4,
    name: 'Pub Night',
    startsAt: new Date(2015,5,10,17,30),
    endsAt:   new Date(2015,5,10,18,30)
  },
  {
    id: 5,
    name: 'Coffee with friends',
    startsAt: new Date(2015,6,10,9,30),
    endsAt:   new Date(2015,6,10,10,30)
  }
]

let fetch = (cb) => {
  cb(events);
}

export default {
  fetch
}

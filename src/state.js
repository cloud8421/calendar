import moment from 'moment';
import Baobab from 'baobab';
import AppDispatcher from './dispatcher';

let currentDate = moment();

let State = new Baobab({
  startDate: null,
  currentDate: currentDate,
  currentDetails: null,
  events: [
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
    },
  ]
},
{
  autoCommit: false
})

let incOneMonth = (current) => {
  return current.add(1, 'month')
}

let decOneMonth = (current) => {
  return current.subtract(1, 'month')
}

let clustered = {}

let clusterEvents = (events) => {
  clustered = {}
  events.forEach((evt) => {
    let start = evt.startsAt
    let year = start.getFullYear();
    let month = start.getMonth();
    let day = start.getDate();

    if (!clustered[year]) {
      clustered[year][month][day]
    })

    if (clustered[year] && clustered[year][month] && clustered[year][month][day]) {
      clustered[year][month][day].push(evt);
    }


    // clustered[start.getFullYear()] ? clustered[start.getFullYear()] : clustered[start.getFullYear()] = {}
    // clustered[start.getFullYear] ||= {};
  })
  // let beginning = 1;
  // let end = startDate.endOf('month').date();
  console.log(clustered);
}

State.on('update', () => {
  clusterEvents(State.get('events'));
})

let startDateCursor = State.select('startDate');

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case 'forward-one-month':
      startDateCursor.apply(incOneMonth);
      State.set('currentDetails', null);
      break;
    case 'back-one-month':
      startDateCursor.apply(decOneMonth);
      State.set('currentDetails', null);
      break;
    case 'set-current-date':
      State.set('startDate', payload.value);
      State.set('currentDetails', null);
      break;
    case 'open-details':
      State.set('currentDetails', payload.value);
      break;
    default:
      return true
  }
  State.commit();
});

export default State;

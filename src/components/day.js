import React from 'react';
import moment from 'moment';
import PropTypes from '../prop-types';

import U from '../utils';
import Actions from '../actions';
import State from '../state';
import Details from './day/details';

let dayClass = (selected) => {
  return selected ? 'day selected' : 'day'
}

let eventsCursor;
let openDetailsCursor;

let getEvents = (day) => {
  return eventsCursor.get().filter((ev) => {
    return moment(ev.startsAt).isSame(day, 'day');
  });
}

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetails: false
    }
  }
  render() {
    let eventsCount;
    let day = moment(this.props.day).format('D');
    let selected = this.props.selected;
    let dayEvents = getEvents(this.props.day);
    if (dayEvents.length > 0) {
      eventsCount = <span className="events-count">{dayEvents.length}</span>
    }

    return (
      <div className={dayClass(selected)} onClick={this.openDetails.bind(this)}>
        <span className="date">{day}</span>
        {eventsCount}
        {this.state.open ? <Details events={dayEvents} day={this.props.day} /> : ''}
      </div>
    )
  }
  componentWillMount() {
    eventsCursor = State.select('events');
    openDetailsCursor = State.select('currentDetails');
  }
  componentWillUnmount() {
    eventsCursor.release();
    openDetailsCursor.release();
  }
  componentDidMount() {
    this.setState({
      open: openDetailsCursor.get()
    });
    openDetailsCursor.on('update', (evt) => {
      if (evt.data.data) {
        this.setState({
          open: evt.data.data.isSame(this.props.day)
        })
      } else {
        this.setState({open: false});
      }
    });
  }
  openDetails() {
    Actions.openDetails(this.props.day);
  }
}

Day.propTypes = {
  day: PropTypes.mom,
  selected: React.PropTypes.bool,
  openDetails: React.PropTypes.bool
};

export default Day;

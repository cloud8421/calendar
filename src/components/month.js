import React from 'react';
import moment from 'moment';

import {weeksFromDate} from '../utils';
import {allInDay} from '../entities/event';

import MonthSwitcher from './month/switcher';
import MonthHeaders from './month/headers';
import Day from './day';
import Details from './day/details';
import AddNewEvent from './add-new-event';

class Month extends React.Component {
  render() {
    let weeks = weeksFromDate(this.props.startDate,
                              this.props.currentDate,
                              this.props.details);
    let rows = weeks.map((week, idx) => {
      let days = week.map((dayObj, idx) => {
        let events = allInDay(this.props.events, dayObj.day);
        return <Day day={dayObj.day}
                    today={dayObj.today}
                    selected={dayObj.selected}
                    key={idx}
                    events={events} />
      });
      return (
        <ul className="days">{days}</ul>
      )
    });

    let detailsComponent;
    let detailsDay = this.props.details;

    if (detailsDay) {
      let eventsForDetails = allInDay(this.props.events, detailsDay);
      detailsComponent = <Details day={detailsDay} events={eventsForDetails} />
    }

    return (
      <section className="calendar">
        <MonthSwitcher startDate={this.props.startDate} />
        <section className="month">
          <MonthHeaders />
          {rows}
        </section>
        {detailsComponent}
        <AddNewEvent />
      </section>
    )
  }
}

export default Month;

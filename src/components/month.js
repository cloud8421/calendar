import React from 'react';
import moment from 'moment';

import Actions from '../actions';
import Week from './week';
import {weeksFromDate} from '../utils';
import {allInDay} from '../entities/event';

import MonthSwitcher from './month/switcher';
import MonthHeaders from './month/headers';
import Details from './day/details';
import AddNewEvent from './add-new-event';

class Month extends React.Component {
  render() {
    let weeks = weeksFromDate(this.props.startDate, this.props.currentDate);
    let weekComponents = weeks.map((week, idx) => {
      return <Week week={week} key={idx} events={this.props.events} />
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
          {weekComponents}
        </section>
        {detailsComponent}
        <AddNewEvent />
      </section>
    )
  }
}

export default Month;

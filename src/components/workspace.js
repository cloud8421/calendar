import React from 'react';
import moment from 'moment';
import chrono from 'chrono-node';

import EventModel from '../entities/event';
import Event from './workspace/event';

const TIME_FORMAT = 'LT'

let f = (date) => moment(date).format(TIME_FORMAT);

const Workspace = React.createClass({
  getInitialState: () => {
    let newEvent = EventModel.build();

    return {
      text: newEvent.name,
      model: newEvent
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.text !== this.state.text;
  },
  render: function() {
    let model = this.state.model;
    let preview;

    if (model.name) {
      preview = <Event event={model} />
    }

    return (
      <section className="workspace">
        <form className="event-form">
          <label htmlFor="name">What do you need to do?</label>
          <input id="name"
                 type="text"
                 value={this.state.text}
                 onChange={this.handleChange} />
          {preview}
        </form>
      </section>
    )
  },
  handleChange: function(changeEvt) {
    let newEvent = EventModel.fromVerbalDescription(changeEvt.target.value);
    this.setState({
      text: changeEvt.target.value,
      model: newEvent
    });
  }
});

export default Workspace;

import React from 'react';
import moment from 'moment';
import chrono from 'chrono-node';

import EventModel from '../entities/event';
import Event from './workspace/event';
import Toolbar from './workspace/toolbar';

const TIME_FORMAT = 'LT'

let f = (date) => moment(date).format(TIME_FORMAT);

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    let newEvent = EventModel.fromVerbalDescription(EventModel.sampleDescription);

    this.state = {
      text: EventModel.sampleDescription,
      model: newEvent
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.text !== this.state.text;
  }
  render() {
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
                 onChange={this.handleChange.bind(this)} />
          {preview}
          <Toolbar event={model} />
        </form>
      </section>
    )
  }
  handleChange(changeEvt) {
    let newEvent = EventModel.fromVerbalDescription(changeEvt.target.value);
    this.setState({
      text: changeEvt.target.value,
      model: newEvent
    });
  }
}

export default Workspace;

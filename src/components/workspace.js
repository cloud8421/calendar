import React from 'react';
import moment from 'moment';
import Event from '../entities/event';
import chrono from 'chrono-node';

const TIME_FORMAT = 'LT'

let f = (date) => moment(date).format(TIME_FORMAT);

const Workspace = React.createClass({
  getInitialState: () => {
    return {
      text: 'i.e. Book dentist for friday at 9.00am',
      model: Event.build()
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.text !== this.state.text;
  },
  render: function() {
    let model = this.state.model
    return (
      <section className="workspace">
        <form className="event-form">
          <label htmlFor="name">What do you need to do?</label>
          <input id="name"
                 type="text"
                 value={this.state.text}
                 onChange={this.handleChange} />
          <p className="preview">
            <ul>
              <li>{model.name}</li>
              <li>{model.startsAt ? f(model.startsAt) : ''}</li>
              <li>{model.endsAt ? f(model.endsAt) : ''}</li>
            </ul>
          </p>
        </form>
      </section>
    )
  },
  handleChange: function(changeEvt) {
    let newEvent = Event.fromVerbalDescription(changeEvt.target.value);
    this.setState({
      text: changeEvt.target.value,
      model: newEvent
    });
  }
});

export default Workspace;

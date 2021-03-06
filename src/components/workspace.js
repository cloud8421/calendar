import React from 'react';
import moment from 'moment';
import chrono from 'chrono-node';

import State from '../state';
import Actions from '../actions';
import EventModel from '../entities/event';
import Event from './workspace/event';
import Toolbar from './workspace/toolbar';
import Weather from './weather';

const TIME_FORMAT = 'LT'

let workspaceOpenCursor;
let weatherCursor;

let canPreview = (model) => {
  return model.name || model.startsAt || model.endsAt;
}

class Workspace extends React.Component {
  constructor(props) {
    super(props);
    let newEvent = EventModel.fromVerbalDescription(EventModel.sampleDescription);

    this.state = {
      text: EventModel.sampleDescription,
      model: newEvent,
      open: false,
      weather: {}
    }
  }
  render() {
    let model = this.state.model;
    let open = this.state.open;
    let canSave = EventModel.isValid(this.state.model);
    let preview, form;

    if (canPreview(model)) {
      preview = <Event event={model} />
    }

    if (open) {
      form = <form className="event-form">
        <a className="ui close" onClick={Actions.closeWorkspace}>✕</a>
        <label htmlFor="name">What do you need to do?</label>
        <input id="name"
               type="text"
               value={this.state.text}
               onChange={this.handleChange.bind(this)} />
        {preview}
        <Toolbar event={model}
                 canSave={canSave}
                 onOk={this.createEvent.bind(this)}
                 onCancel={Actions.closeWorkspace} />
      </form>
    }

    return (
      <section className="workspace">
        <Weather data={this.state.weather}/>
        {form}
      </section>
    )
  }
  componentWillMount() {
    workspaceOpenCursor = State.select('workspaceOpen');
    weatherCursor = State.select('weather');
  }
  componentWillUnmount() {
    workspaceOpenCursor.release();
    weatherCursor.release();
  }
  componentDidMount() {
    this.setState({
      open: workspaceOpenCursor.get(),
      weather: weatherCursor.get()
    });
    workspaceOpenCursor.on('update', (upd) => {
      this.setState({open: upd.data.data});
    });
    weatherCursor.on('update', (upd) => {
      this.setState({weather: upd.data.data});
    });
  }
  handleChange(changeEvt) {
    let newEvent = EventModel.fromVerbalDescription(changeEvt.target.value);
    this.setState({
      text: changeEvt.target.value,
      model: newEvent
    });
  }
  createEvent() {
    Actions.createEvent(this.state.model);
  }
}

export default Workspace;

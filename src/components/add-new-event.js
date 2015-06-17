import React from 'react';

import Actions from '../actions';

class AddNewEvent extends React.Component {
  render() {
    return (
      <a className="ui add-new-event"
         onClick={Actions.openWorkspace}>+</a>
    )
  }
}

export default AddNewEvent;

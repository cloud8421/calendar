import React from 'react';
import {RouteHandler} from 'react-router';
import Workspace from './workspace';

import State from '../state.js';
import Debugger from './debugger';

class Main extends React.Component {
  render() {
    return (
      <div id="main">
        <Debugger tree={State} />
        <RouteHandler />
        <Workspace />
      </div>
    );
  }
}

export default Main;

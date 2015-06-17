import React from 'react';
import {RouteHandler} from 'react-router';
import Workspace from './workspace';

class Main extends React.Component {
  render() {
    return (
      <div id="main">
        <RouteHandler />
        <Workspace />
      </div>
    )
  }
}

export default Main;

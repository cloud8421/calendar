import React from 'react';
import {RouteHandler} from 'react-router';

class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <nav className="main-nav">
            <img className="logo" src="/images/calendar.png" alt="logo" />
            <h1 className="title">Calendar</h1>
          </nav>
        </header>
        <RouteHandler />
      </div>
    )
  }
}

export default Main;

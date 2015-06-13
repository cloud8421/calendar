import React from 'react';

let container = document.getElementById('main');

class Main extends React.Component {
  render() {
    return (
      <header>
        <nav className="main-nav">
          <img className="logo" src="/images/calendar.png" alt="logo" />
          <h1 className="title">Calendar</h1>
        </nav>
      </header>
    );
  }
}

React.render(<Main />, container);

import React from 'react';
import Month from './components/month';
import State from './state';

let container = document.getElementById('main');

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
        <section className="calendar">
          <Month startDate={State.startDate} now={State.now} />
        </section>
      </div>
    );
  }
}

React.render(<Main />, container);

import React from 'react';
import Month from './components/month';

let container = document.getElementById('main');
let now = new Date();

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
          <Month startDate={now} />
        </section>
      </div>
    );
  }
}

React.render(<Main />, container);

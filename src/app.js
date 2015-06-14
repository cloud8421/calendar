import React from 'react';
import Month from './components/month';
import State from './state';

let container = document.getElementById('main');

let startDateCursor = State.select('startDate');
let currentDateCursor = State.select('currentDate');

let getState = () => {
  return {
    startDate: startDateCursor.get(),
    currentDate: currentDateCursor.get()
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();
  }
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
          <Month startDate={this.state.startDate}
                 now={this.state.currentDate} />
        </section>
      </div>
    );
  }
  componentDidMount() {
    startDateCursor.on('update', () => {
      this.setState(getState());
    })
    currentDateCursor.on('update', () => {
      this.setState(getState());
    })
  }
}

React.render(<Main />, container);

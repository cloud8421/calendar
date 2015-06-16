import React from 'react';

class Workspace extends React.Component {
  render() {
    return (
      <section className="workspace">
        <form className="event-form">
          <label htmlFor="name">What do you need to do?</label>
          <input id="name" type="text" value="Do something awesome" />
          <label htmlFor="day">What day?</label>
          <input id="day" type="text" value="Friday" />
          <label htmlFor="from">From</label>
          <input id="from" type="text" value="9.00am" />
          <label htmlFor="to">From</label>
          <input id="to" type="text" value="10.00am" />
          <p className="preview">
            Do something awesome, Friday, from 9.00am to 10.00am.
          </p>
        </form>
      </section>
    )
  }
}

export default Workspace;

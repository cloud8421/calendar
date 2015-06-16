import React from 'react';

const Workspace = React.createClass({
  getInitialState: () => {
    return {
      text: 'i.e. Book dentist for friday at 9.00am'
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return nextState.text !== this.state.text;
  },
  render: function() {
    return (
      <section className="workspace">
        <form className="event-form">
          <label htmlFor="name">What do you need to do?</label>
          <input id="name"
                 type="text"
                 value={this.state.text}
                 onChange={this.handleChange} />
          <p className="preview">
            Do something awesome, Friday, from 9.00am to 10.00am.
          </p>
        </form>
      </section>
    )
  },
  handleChange: function(evt) {
    this.setState({text: evt.target.value});
  }
});

export default Workspace;

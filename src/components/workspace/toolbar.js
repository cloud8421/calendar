import React from 'react';

class Toolbar extends React.Component {
  render() {
    return (
      <nav className="toolbar">
        <input className="ok"
               type="button"
               value="Save"
               onClick={this.props.onOk} />
        <input className="warn"
               type="button"
               value="Cancel"
               onClick={this.props.onCancel} />
      </nav>
    )
  }
}

export default Toolbar

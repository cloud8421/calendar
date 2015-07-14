import React from 'react';
import Baobab from 'baobab';

class Revision extends React.Component {
  render() {
    let item = this.props.item;

    return (
      <li onClick={this.restoreFn.bind(this)}>
        <h4>Rev number: {this.props.number}</h4>
      </li>
    );
  }
  restoreFn() {
    this.props.restoreFn(this.props.number);
  }
}

class Revisions extends React.Component {
  render() {
    let revisionItems = this.props.items.map((item, idx) => {
      let revNumber = idx + 1;
      return <Revision
               item={item}
               number={revNumber}
               key={revNumber}
               restoreFn={this.props.restoreFn} />;
    });
    return <ul className="revisions">{revisionItems}</ul>;
  }
}

class Debugger extends React.Component {
  constructor(props) {
    super(props);
    props.tree.root.startRecording(10);

    this.state = {
      tree: props.tree,
      revisions: props.tree.root.getHistory()
    };
  }
  render() {
    return (
      <div className="debugger">
        <header>
          <h3>Debugger</h3>
          <span className="revisions-count">{this.state.revisions.length}</span>
        </header>
        <Revisions
          items={this.state.revisions}
          restoreFn={this.restoreRevision.bind(this)} />
      </div>
    );
  }
  componentDidMount() {
    this.state.tree.on('update', (e) => {
      this.setState({
        revisions: this.state.tree.root.getHistory()
      });
    });
  }
  restoreRevision(number) {
    let root = this.state.tree.root;
    let historyLength = root.getHistory().length;
    root.undo(historyLength - number);
    this.state.tree.commit();
  }
}

export default Debugger;

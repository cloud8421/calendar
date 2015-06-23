import React from 'react';
import SkyconsLib from 'skycons';

let Skycons = SkyconsLib(window);
let skycons = new Skycons({color: 'black'});

class Weather extends React.Component {
  componentDidUpdate() {
    if (this.props.data.currently) {
      let canvas = React.findDOMNode(this).querySelector('canvas');
      skycons.set(canvas, this.props.data.currently.icon);
      skycons.play();
    }
  }
  render() {
    let info;
    if (this.props.data.currently) {
      info = <canvas width='80' height='80' />
    }
    return (
      <div className='weather-container'>{info}</div>
    );
  }
}

export default Weather;

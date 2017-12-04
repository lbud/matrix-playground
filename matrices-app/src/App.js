import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Display from './Display';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      transforms: [
        {
          type: 'translate',
          x: 0,
          y: 0,
          z: -4
        },
        {
          type: 'rotate',
          x: 0,
          y: 0,
          z: 0,
          angle: 0
        },
        {
          type: 'scale',
          x: 1,
          y: 1,
          z: 1
        }
      ]
    };
    this.transformsUpdated = this.transformsUpdated.bind(this);
    this.transformsReordered = this.transformsReordered.bind(this);
  }

  transformsUpdated(elIndex, whichValue, value) {
    const newState = Object.assign({}, this.state);
    newState.transforms[elIndex][whichValue] = parseFloat(value);
    this.setState(newState);
  }

  transformsReordered(reordered) {
    this.setState({transforms: reordered});
  }

  render() {
    return (
      <div className='wrapper'>
        <Sidebar className='sidebar'
          transforms={this.state.transforms}
          onReorderTransforms={this.transformsReordered}
          onUpdateTransforms={this.transformsUpdated} />
        <Display className='display'
          transforms={this.state.transforms} />
      </div>
    );
  }
}

export default App;

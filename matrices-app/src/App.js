import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Display from './Display';
import './style.css';
import initial from './init.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      transforms: initial
    };
    this.transformsUpdated = this.transformsUpdated.bind(this);
    this.transformsReordered = this.transformsReordered.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    // const newState = Object.assign({}, this.state);
    // newState.transforms = initial;
    // this.setState(newState);
    // TODO add immutable.js
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
          onUpdateTransforms={this.transformsUpdated}
          reset={this.reset} />
        <Display className='display'
          transforms={this.state.transforms} />
      </div>
    );
  }
}

export default App;

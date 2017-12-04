import React, { Component } from 'react';
import './style.css';

class TransformForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(which, e) {
    this.props.onChange(which, e.target.value);
  }

  render() {
    return (
      <div className='transformform flex'>
        <fieldset className='flex'>
            <label>{this.props.type}</label>
            <label>x<input arbitrary='0' type='number' value={this.props.x} step='0.1' onChange={this.handleChange.bind(this, 'x')} /></label>
            <label>y<input type='number' value={this.props.y} step='0.1' onChange={this.handleChange.bind(this, 'y')} /></label>
            <label>z<input type='number' value={this.props.z} step='0.1' onChange={this.handleChange.bind(this, 'z')} /></label>
            {typeof this.props.angle !== 'undefined' &&
                (<label>°<input type='number' value={this.props.angle} step='0.1' onChange={this.handleChange.bind(this, 'angle')} /></label>)}
        </fieldset>

      </div>
    );
  }
}

export default TransformForm;

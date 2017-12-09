import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import './style.css';

class TransformForm extends Component {
  constructor(props) {
    super(props);
    this.saveState = this.saveState.bind(this);
    this.setChange = this.setChange.bind(this);
  }

  saveState(which, e) {
    this.props.onChange(which, this.state[which]);
  }

  setChange(which, e) {
    let temporary = [];
    temporary[which] = e;
    this.setState(temporary);
    console.log(this.props, this.state);
  }

  useProperty(which) {
    return this.state && this.state.hasOwnProperty(which) ? this.state[which] : this.props.transform[which];
  }

  render() {
    return (
      <div className='transformform flex'>
        <fieldset className='flex'>
            <label>{this.props.transform.type}</label>
            {this.props.transform.forms
              .map((k, i) => (
                <label key={i}>{k}
                <NumericInput
                  key={i}
                  value={this.useProperty(k)}
                  step={0.1}
                  onChange={this.props.onChange.bind(this, k)}
                  onBlur={this.saveState.bind(this, k)} />
                </label>
              ))}
        </fieldset>
      </div>
    );
  }
}

export default TransformForm;

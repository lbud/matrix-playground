import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';
import './style.css';

class TransformForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(which, e) {
    this.props.onChange(which, e);
  }

  render() {
    return (
      <div className='transformform flex'>
        <fieldset className='flex'>
            <label>{this.props.transform.type}</label>
            {['x', 'y', 'z', 'angle']
              .filter(k => typeof this.props.transform[k] !== 'undefined')
              .map((k, i) => (
                <label key={i}>{k}
                <NumericInput
                  key={i}
                  value={this.props.transform[k]}
                  step={0.1}
                  onChange={this.handleChange.bind(this, k)}
                  style={false} />
                </label>
              ))}
        </fieldset>
      </div>
    );
  }
}

export default TransformForm;

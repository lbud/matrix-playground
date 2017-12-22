import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

NumericInput.style.input.width = '40px';

class TransformForm extends Component {
  constructor(props) {
    super(props);
    this.onInput = this.onInput.bind(this);
  }

  onInput(path, value) {
    if (isNaN(value)) return;
    this.props.onChange(path, value);
  }

  render() {
    const { transform, k, removeTransform } = this.props;
    return (
      <div className='transformform flex'>
        <fieldset className='flex form'>
            <label>{transform.get('type')}</label>
            {transform.get('forms')
              .map((j, i) => (
                <label key={i}>{j}
                <NumericInput
                  key={i}
                  value={transform.get(j)}
                  step={0.1}
                  onChange={this.onInput.bind(this, [k, j])} />
                </label>
              ))}
        </fieldset>
        <div className='x'
          onClick={removeTransform.bind(this, k)}>x
        </div>
      </div>
    );
  }
}

export default TransformForm;

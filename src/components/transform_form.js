import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

class TransformForm extends Component {
  render() {
    const { transform, k, onChange } = this.props;
    return (
      <div className='transformform flex'>
        <fieldset className='flex'>
            <label>{transform.get('type')}</label>
            {transform.get('forms')
              .map((j, i) => (
                <label key={i}>{j}
                <NumericInput
                  key={i}
                  value={transform.get(j)}
                  step={0.1}
                  onChange={onChange.bind(this, [k, j])} />
                </label>
              ))}
        </fieldset>
      </div>
    );
  }
}

export default TransformForm;

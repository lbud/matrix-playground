import React, { PureComponent } from 'react';
import TransformConfig from '../data/transform_config.json';

class AddTransform extends PureComponent {
  render() {
    const {addTransform} = this.props;
    return (
      <div className='pure-menu pure-menu-horizontal'>
          <ul className='pure-menu-list'>
              <li className='pure-menu-item pure-menu-has-children pure-menu-allow-hover'>
                  <a href='#' id='menuLink1' className='pure-menu-link'>Add Transform</a>
                  <ul className='pure-menu-children'>
                    {Object.keys(TransformConfig).map((key, i) => (
                      <li key={i} className='pure-menu-item'>
                        <a href='#' className='pure-menu-link' onClick={addTransform.bind(this, key)}>{key}</a>
                      </li>
                      ))}
                  </ul>
              </li>
          </ul>
      </div>
    );
  }
}

export default AddTransform;

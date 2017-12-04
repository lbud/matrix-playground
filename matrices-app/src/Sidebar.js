import React, { Component } from 'react';
import TransformForm from './TransformForm';
import './style.css';

class Sidebar extends Component {
  render() {
    return (
      <div className=''>
        {this.props.transforms.map((t, i) => (
          <TransformForm
            key={i}
            type={t.type}
            x={t.x}
            y={t.y}
            z={t.z}
            angle={t.angle}
            onChange={this.props.onUpdateTransforms.bind(this, i)} />)
          )}
      </div>
    );
  }
}

export default Sidebar;

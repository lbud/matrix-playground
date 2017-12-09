import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable';
import TransformForm from './TransformForm';
import './style.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleStop = this.handleStop.bind(this);
  }

  handleStop(list) {
    console.log(list.map(l => l.content.props.transform))
    this.props.onReorderTransforms(list.map(l => l.content.props.transform));
  }

  render() {
    console.log(this.props.transforms)
    return (
      <div className='sidebar'>
        <DragSortableList
          items={this.props.transforms.map((t, i) => {
            console.log(t)
            return { content: (
              <TransformForm
                transform={t}
                onChange={this.props.onUpdateTransforms.bind(this, i)} />
            )};
          })}
          onSort={this.handleStop}
          type='vertical' />
        <button
          onClick={this.props.reset}>Reset</button>
      </div>
    );
  }
}

export default Sidebar;

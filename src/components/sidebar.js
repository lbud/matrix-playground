import React, { Component } from 'react';
import DragSortableList from 'react-drag-sortable';
import TransformForm from './transform_form';
import AddTransform from './add_transform';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleStop = this.handleStop.bind(this);
  }

  handleStop(list) {
    this.props.reorder(list.map(l => l.content.props.transform));
  }

  render() {
    const transforms = this.props.state.get('transforms');
    const { mutateTransform, reset, removeTransform, addTransform } = this.props;
    return (
      <div className='sidebar'>
        <DragSortableList
          items={transforms.map((t, i) => {
            return { content: (
              <TransformForm
                transform={t}
                k={i}
                onChange={mutateTransform}
                removeTransform={removeTransform}
              />
            )};
          }).toJS()}
          onSort={this.handleStop}
          type='vertical' />
        <AddTransform
          addTransform={addTransform}/>
        <button className='pure-button'
          onClick={reset}>Reset</button>
      </div>
    );
  }
}

export default Sidebar;

import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Sidebar from './components/sidebar';
import Display from './components/display';

class App extends PureComponent {
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          className="sidebar"
          {...this.props}
        />
        <Display
          className="display"
          transforms={this.props.state.get('transforms')}
        />
      </div>
    );
  }
}

App.propTypes = {
  state: ImmutablePropTypes.contains({
    transforms: ImmutablePropTypes.list,
  }).isRequired,
};

export default App;

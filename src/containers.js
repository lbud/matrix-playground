import { connect } from 'react-redux';
import App from './app';
import { addTransform, mutateTransform, reorder, reset, removeTransform } from './actions';

export default connect(
  state => ({ state }),
  dispatch => ({
    addTransform: type => dispatch(addTransform(type)),
    mutateTransform: (n, transform) => dispatch(mutateTransform(n, transform)),
    reorder: newOrder => dispatch(reorder(newOrder)),
    reset: () => dispatch(reset()),
    removeTransform: (which) => dispatch(removeTransform(which)),
  }),
)(App);

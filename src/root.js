import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import Matrices from './containers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Matrices />
  </Provider>,
  document.getElementById('app'),
);

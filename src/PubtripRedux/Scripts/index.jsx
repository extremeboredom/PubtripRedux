import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { ReduxRouter } from 'redux-router';

const store = configureStore(window.initialData);



render(
  <Provider store={store}>
      <ReduxRouter />
  </Provider>,
  document.getElementById('root')
);
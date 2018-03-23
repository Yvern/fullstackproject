import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

//import 'materialize-css/dist/css/materialize.min.css';
import 'babel-polyfill';
import 'semantic-ui-css/semantic.min.css';
import './react-datetime.css';

import App from './components/App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;

const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk, reduxLogger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

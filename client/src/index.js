import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import 'babel-polyfill';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './css/react-datetime.css';
import M from 'materialize-css';

import App from './components/App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;

/*
* Initialise materializeCSS javascript elements.
*/
//document.addEventListener('DOMContentLoaded', function(event) {
//  M.AutoInit();
//});

/*
* Create the redux store that contains the state tree for the UI, managing
* state that may be used by multiple components in the website
*/
const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk, reduxLogger)
);

/*
* Load the App component into the 'root' div in the index.html file
*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

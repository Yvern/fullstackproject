import React, { Component } from 'react';
import 'babel-polyfill';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import {
  BrowserRouter as Router,
    Route
} from 'react-router-dom'

import reducer from './modules/reducer'
import TestLayout from './layouts/TestLayout';

const loggerMiddleware = createLogger(); //Redux middleware that logs actions and state changes

//create the redux store for the application based on the structure defined by middleware
let store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
console.log(store.getState());

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
            <Router>
              <TestLayout/>
            </Router>
          </div>
        </Provider>
    );
  }
}

export default App;

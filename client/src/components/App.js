import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import TestLayout from './TestLayout';
import routes from './routes';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <TestLayout routes={routes} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);

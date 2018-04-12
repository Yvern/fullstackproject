import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import TestLayout from './TestLayout';
import routes from './routes';

class App extends Component {
  /*
  * When the App component (website) loads, fire the action to fetch details
  * about the user currently logged in if a user is logged in
  */
  componentDidMount() {
    this.props.fetchUser();
  }

  /*
  * Render App using React Router to handle what component to render for search
  * URL route.
  * Renders a Layout component that will determine the overall layout of the
  * website (header, content, footer) and associates a specific css file
  * with it.
  */
  render() {
    return (
      <div>
        <BrowserRouter>
          <TestLayout routes={routes} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);

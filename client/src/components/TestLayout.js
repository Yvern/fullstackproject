import React, { Component } from 'react';
import { Route } from 'react-router';
import './TestLayout.css';

import Header from './Header';
import Footer from './Footer';

class TestLayout extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div>
        <Header />
        {this.props.routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
        <Footer />
      </div>
    );
  }
}

export default TestLayout;

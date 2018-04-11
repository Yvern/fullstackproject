import React, { Component } from 'react';
import { Route } from 'react-router';
import './TestLayout.css';

import Header from './Header';
import Footer from './Footer';

class TestLayout extends Component {
  render() {
    console.log('props', this.props);
    return (
      <div id="test-layout">
        <Header />
        <div className="content-container">
          {this.props.routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </div>
      </div>
    );
  }
}

export default TestLayout;

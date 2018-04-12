import React, { Component } from 'react';
import { Route } from 'react-router';
import '../css/style.css';

import Nav from './Nav';
import Footer from './Footer';

/*
* TestLayout is a React Component that provides layout and styling information
* for the website. The connected css file, TestLayout.css, will adjust the
* style of web pages in TestLayout. TestLayout's styles only affect overall
* layout style (or overrides styles), while general element styles (such as
* styles for buttons, header text, icons, etc.) are determined by the
* semantic-ui.css file.
*/
class TestLayout extends Component {
  render() {
    console.log('props', this.props);
    return [
      <Nav key="nav" />,
      <div key="content">
        {this.props.routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </div>,
      <Footer key="footer" />
    ];
  }
}

export default TestLayout;

import React from 'react';
import { Link } from 'react-router-dom';

import TextContainer from './TextContainer';

/*
* A presentational component that displays a series of breadcrumbs to allow
* the user to better navigate the website.
*/
const BreadCrumbs = ({ crumbPages }) => {
  function renderCrumbs() {
    return crumbPages.map(page => {
      return (
        <Link to={page.link} key={page.name} className="breadcrumb">
          {page.name}
        </Link>
      );
    });
  }

  return (
    <TextContainer color="grey darken-4">
      <div className="col s12">{renderCrumbs()}</div>
    </TextContainer>
  );
};

export default BreadCrumbs;

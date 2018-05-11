import React from 'react';
import { Link } from 'react-router-dom';

/*
* A stateless, presentational component that contains footer information.
*/
const Footer = () => {
  return (
    <footer className="page-footer light-blue">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">About SquadSquare</h5>
            <p className="grey-text text-lighten-4">
              Squad Square was designed and developed as part of a project for
              UEA as a tool to organise sports matches. The website is still in
              development and will hopefully expand to add features.
            </p>
          </div>
          <div className="col l3 s12">
            <h5 className="white-text">Settings</h5>
            <ul>
              <li>
                <Link to="/settings" className="white-text" href="#!">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="col l3 s12">
            <h5 className="white-text">Connect</h5>
            <ul>
              <li>
                <a
                  className="white-text"
                  href="https://www.linkedin.com/in/rose-hissink/"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="white-text" href="#!">
                  Email: thesquadsquare@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          Made by Rose Hissink |{' '}
          <a
            className="blue-text text-lighten-3"
            href="https://www.linkedin.com/in/rose-hissink/"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import M from 'materialize-css';

var elem = document.querySelectorAll('.sidenav');
var instance = new M.Sidenav.init(elem, {});

class Nav extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderContent() {
    const { activeItem } = this.state;

    switch (this.props.auth) {
      case null:
      case undefined:
        return;
      case false:
        return [
          <li key="home">
            <Link to="/">Home</Link>
          </li>,
          <li key="login">
            <a href="/auth/google">Login with Google</a>
          </li>
        ];
      default:
        return [
          <li key="home">
            <Link to="/">Home</Link>
          </li>,
          <li key="dashboard">
            <Link to="/dashboard">Dashboard</Link>
          </li>,
          <li key="settings">
            <Link to="/settings">Settings</Link>
          </li>,
          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <div>
        <nav className="white" role="navigation">
          <div id="nav-colourstrip" className="teal">
            <div className="nav-wrapper container">
              <a id="logo-container" href="#" className="brand-logo">
                SquadSquare
              </a>
              <ul className="right hide-on-med-and-down">
                {this.renderContent()}
              </ul>
              <a href="#" data-target="nav-mobile" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
            </div>
          </div>
        </nav>

        <ul id="nav-mobile" className="sidenav">
          {this.renderContent()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Nav);

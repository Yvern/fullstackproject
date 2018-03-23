import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

import { Menu } from 'semantic-ui-react';

class HeaderMenu extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderContent() {
    const { activeItem } = this.state;

    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Menu.Menu position="right">
            <Menu.Item active={false}>
              <a href="/auth/google">Login with Google</a>
            </Menu.Item>
          </Menu.Menu>
        );
      default:
        return (
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            >
              <a href="/api/logout">Logout</a>
            </Menu.Item>
          </Menu.Menu>
        );
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu size="large" pointing secondary inverted>
          <Menu.Item>
            <Link to={this.props.auth ? '/dashboard' : '/'}>SquadSquare</Link>
          </Menu.Item>
          {this.renderContent()}
        </Menu>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <div className="header-content">
            <HeaderMenu auth={this.props.auth} />
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Divider, Header } from 'semantic-ui-react';

class UserSummary extends Component {
  calculatePending() {
    this.props.events.forEach(event => {});
  }

  render() {
    return (
      <div className="user-summary">
        <Container fluid>
          <Header as="h2">{this.props.user ? this.props.user.name : ''}</Header>
          <Divider />
          <p>
            Upcoming events: {this.props.events ? this.props.events.length : 0}
          </p>
          <p>
            Pending events: {this.props.events ? this.props.events.length : 0}
          </p>
          <Divider />
          <Header as="h3">Notifications</Header>
        </Container>
      </div>
    );
  }
}

export default UserSummary;

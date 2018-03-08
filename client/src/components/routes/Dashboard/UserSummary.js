import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Segment, Header } from 'semantic-ui-react';

class UserSummary extends Component {
  render() {
    return (
      <Segment.Group>
        <Header as="h2" attached="top">
          USER
        </Header>
        <Segment attached>
          <p>
            Total events organised:{' '}
            {this.props.events ? this.props.events.length : ''}
          </p>
          <p>
            Pending events: {this.props.events ? this.props.events.length : ''}
          </p>
        </Segment>
      </Segment.Group>
    );
  }
}

export default UserSummary;

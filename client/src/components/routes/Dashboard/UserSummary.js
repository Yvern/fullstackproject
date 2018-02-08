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
        <Segment attached>Info</Segment>
      </Segment.Group>
    );
  }
}

export default UserSummary;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import SquadForm from './SquadForm';
import { Message, Header, Segment, Icon } from 'semantic-ui-react';

class SquadCreate extends Component {
  render() {
    return (
      <div className="create-event-form-container">
        <Message attached style={{ height: '4em' }}>
          <Header floated="left">
            <Icon name="group" color="blue" />Create a New Squad
          </Header>
          <Icon link name="close" size="large" color="red" />
        </Message>
        <Segment attached="bottom">
          <SquadForm />
        </Segment>
      </div>
    );
  }
}

export default reduxForm({
  form: 'squadForm'
})(SquadCreate);

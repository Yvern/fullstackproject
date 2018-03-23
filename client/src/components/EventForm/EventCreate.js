import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import EventForm from './EventForm';
import EventFormConfirm from './EventFormConfirm';
import { Message, Header, Segment, Icon } from 'semantic-ui-react';

class EventCreate extends Component {
  state = { showFormConfirm: false };

  renderContent() {
    if (this.state.showFormConfirm) {
      return (
        <EventFormConfirm
          onCancel={() => this.setState({ showFormConfirm: false })}
        />
      );
    }
    return (
      <EventForm
        onEventFormSubmit={() => this.setState({ showFormConfirm: true })}
      />
    );
  }

  render() {
    return (
      <div className="create-event-form-container">
        <Message attached style={{ height: '4em' }}>
          <Header floated="left">
            <Icon name="add to calendar" color="blue" />Create a New Event
          </Header>
          <Icon link name="close" size="large" color="red" />
        </Message>
        <Segment attached="bottom">{this.renderContent()}</Segment>
      </div>
    );
  }
}

EventCreate = reduxForm({
  form: 'eventForm'
})(EventCreate);

EventCreate = connect(state => ({
  initialValues: {
    date: new Date(),
    minimum: 0,
    reminderattendance: true,
    reminderconfirmation: true
  }
}))(EventCreate);

export default EventCreate;

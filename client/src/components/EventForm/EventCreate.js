import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import EventForm from './EventForm';
import EventFormConfirm from './EventFormConfirm';

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
    return <div>{this.renderContent()}</div>;
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

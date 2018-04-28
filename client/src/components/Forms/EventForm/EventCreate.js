import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import EventFormPageOne from './EventFormPageOne';
import EventFormPageTwo from './EventFormPageTwo';
import * as actions from '../../../actions';

class EventCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  componentDidMount() {
    this.props.fetchSquadsForUser();
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  renderContent() {
    if (this.state.page === 2) {
      return (
        <EventFormPageTwo
          squads={this.props.squads}
          onCancel={this.previousPage}
        />
      );
    }
    return (
      <EventFormPageOne
        squads={this.props.squads}
        onEventFormSubmit={this.nextPage}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <h3>
          <i className="material-icons medium light-blue-text">event</i> Create
          a New Event
        </h3>
        {this.renderContent()}
      </div>
    );
  }
}

EventCreate = reduxForm({
  form: 'eventForm'
})(EventCreate);

function mapStateToProps(state) {
  return {
    squads: state.squads,
    initialValues: {
      date: new Date(),
      minimum: 0,
      reminderattendance: false,
      reminderattendancedate: new Date(),
      reminderconfirmation: false,
      reminderconfirmationdate: new Date()
    }
  };
}

EventCreate = connect(mapStateToProps, actions)(EventCreate);

export default EventCreate;

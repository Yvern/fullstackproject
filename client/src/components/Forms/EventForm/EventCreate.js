import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import EventFormPageOne from './EventFormPageOne';
import EventFormPageTwo from './EventFormPageTwo';
import { Message, Header, Segment, Icon } from 'semantic-ui-react';
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
      <div className="create-event-form-container">
        <Message attached style={{ height: '4em' }}>
          <Header floated="left">
            <Icon name="add to calendar" color="blue" />Create a New Event
          </Header>
          <div style={{ float: 'right' }}>
            <Link to="/events">
              <Icon link name="close" size="large" color="red" />
            </Link>
          </div>
        </Message>
        <Segment attached="bottom">{this.renderContent()}</Segment>
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
      reminderconfirmation: false
    }
  };
}

EventCreate = connect(mapStateToProps, actions)(EventCreate);

export default EventCreate;

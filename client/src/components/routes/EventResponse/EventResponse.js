import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import EventInfoBasic from '../EventDetails/EventInfoBasic';
import TextContainer from '../../General/TextContainer';
import ParticipantList from './ParticipantList';

/*
* A React Component that renders the information about an event that a recipient
* is responding to.
*/
class EventResponse extends Component {
  componentDidMount() {
    this.props.fetchEvent(window.location.search);
    console.log(window.location.search);
  }

  renderContent() {
    switch (this.props.event.event) {
      case null:
        return <div>Loading...</div>;
      case false:
        return <div>Sorry, we could not find your event!</div>;
      default:
        let recipientInfo = findRecipientByEmail(
          this.props.event.event,
          this.props.event.recipient
        );
        return (
          <div className="row">
            <div className="col s12 xl6">
              <InvitationMessage
                event={this.props.event.event}
                recipient={recipientInfo}
              />
              <ResponseButtons
                onResponse={this.props.registerEventResponse}
                event={this.props.event.event}
                recipient={recipientInfo}
              />
              <EventInfoBasic event={this.props.event.event} />
            </div>
            <div className="col s12 xl6">
              <ParticipantList
                recipients={this.props.event.event.recipients}
                recipientEmail={this.props.event.recipient}
              />
            </div>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <TextContainer color="grey darken-4 white-text">
          <div className="col s12">
            <h4 className="event-details-title center">
              {this.props.event.event ? this.props.event.event.title : ''}
            </h4>
          </div>
        </TextContainer>
        <TextContainer>{this.renderContent()}</TextContainer>
      </div>
    );
  }
}

const InvitationMessage = ({ event, recipient }) => {
  return (
    <div className="row grey-text text-darken-4">
      <h3>Hi {recipient.name || recipient.email}</h3>
      <p>
        You have been invited to the event{' '}
        <span className="text-heavier">{event.title}</span> by{' '}
        <b>TODO:Insert user name into message</b>. Let them know if you can make
        it by responding below:
      </p>
    </div>
  );
};

const ResponseButtons = ({ onResponse, recipient, event: { _id } }) => {
  console.log('recipient button', recipient);
  return (
    <div className="row">
      <button
        className="btn green white-text"
        positive
        onClick={() => onResponse({ _id, recipient, response: true })}
      >
        Yes
      </button>
      <button
        className="btn red white-text"
        onClick={() => onResponse({ _id, recipient, response: false })}
      >
        No
      </button>
    </div>
  );
};

function findRecipientByEmail(event, email) {
  return event.recipients.find(recipient => {
    return recipient.email === email;
  });
}

function mapStateToProps(state) {
  return {
    event: state.eventResponse
  };
}

export default connect(mapStateToProps, actions)(EventResponse);

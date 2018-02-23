import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

const EventAccessGranted = ({
  event: { eventID, title, username, recipients },
  recipient,
  onResponse
}) => {
  return (
    <div>
      <h2>Hi {recipient.email}</h2>
      <p>
        You have been invited to the event {title} by{' '}
        <b>TODO:Insert user name into message</b>. Please let us know if you can
        make it.
      </p>
      <div>
        <button
          onClick={() => onResponse({ eventID, recipient, response: true })}
        >
          Yes
        </button>
        <button
          onClick={() => onResponse({ eventID, recipient, response: false })}
        >
          No
        </button>
      </div>
    </div>
  );
};

const EventAccessDenied = ({ recipient }) => {
  return <div>Oh no, it looks like you do not have access!</div>;
};

const EventRecipientView = ({ event, registerEventResponse }) => {
  for (let i = 0; i < event.event.recipients.length; i++) {
    if (event.event.recipients[i].email === event.recipient) {
      return (
        <EventAccessGranted
          event={event.event}
          recipient={event.event.recipients[i]}
          onResponse={registerEventResponse}
        />
      );
    }
  }
  return <EventAccessDenied recipient={event.recipient} />;
};

export default connect(null, actions)(EventRecipientView);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import {
  Header,
  Segment,
  Button,
  Table,
  Divider,
  Icon
} from 'semantic-ui-react';

const EventAccessGranted = ({
  event: { _id, title, username, recipients },
  recipient,
  onResponse
}) => {
  function renderRecipientList() {
    let listItems = recipients.map(recip => {
      let response = <Icon name="help" color="grey" />;
      let responseText = 'Not responded';
      if (recip.responded) {
        response = recip.attending ? (
          <Icon name="checkmark" color="green" />
        ) : (
          <Icon name="cancel" color="red" />
        );
        responseText = recip.attending ? 'Attending' : 'Cancelled';
      }

      return (
        <Table.Row>
          <Table.Cell floated="left">{recip.email}</Table.Cell>
          <Table.Cell floated="right">
            {response}
            {responseText}
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Participant</Table.HeaderCell>
            <Table.HeaderCell>Response</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{listItems}</Table.Body>
      </Table>
    );
  }

  return (
    <div>
      <div className="event-invitation">
        <Header as="h2">Hi {recipient.email}</Header>
        You have been invited to the event '{title}' by{' '}
        <b>TODO:Insert user name into message</b>. Please let them know if you
        can make it.
        {renderRecipientList()}
        {recipient.responded ? (
          <p>
            Thank you for your response! You can still change your mind if you
            need to:{' '}
          </p>
        ) : (
          ''
        )}
        <Button
          positive
          onClick={() => onResponse({ _id, recipient, response: true })}
        >
          Yes
        </Button>
        <Button
          negative
          onClick={() => onResponse({ _id, recipient, response: false })}
        >
          No
        </Button>
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

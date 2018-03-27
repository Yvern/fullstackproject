import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import moment from 'moment';
import {
  Header,
  Segment,
  Button,
  Table,
  Grid,
  Divider,
  Icon
} from 'semantic-ui-react';

const EventEditView = ({ event, onSave, onCancel }) => {
  function countResponses() {
    var count = 0;
    event.recipients.forEach(recip => {
      if (recip.attending) {
        count++;
      }
    });
    return count;
  }

  function renderRecipientList() {
    let numOfConfirmations = countResponses();
    let listItems = event.recipients.map(recip => {
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

        <Table.Footer>
          <Table.Row
            positive={numOfConfirmations >= event.minimumParticipants}
            negative={numOfConfirmations < event.minimumParticipants}
          >
            <Table.Cell>
              <Header as="h4">Total attending:</Header>
            </Table.Cell>
            <Table.Cell>
              <Header as="h4">
                {numOfConfirmations}{' '}
                {event.minimumParticipants > 0
                  ? '/' + event.minimumParticipants
                  : ''}
              </Header>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }

  function renderDetails() {
    let formattedDate = moment(event.eventDate).format(
      'ddd, D MMM YYYY, h:mm a'
    );
    let location = event.location ? event.location : 'No location given';
    let notifications = (
      <Table basic="very" compact>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={5}>
              <Header as="h4">Type</Header>
            </Table.Cell>
            <Table.Cell width={7}>
              <Header as="h4">Send date</Header>
            </Table.Cell>
            <Table.Cell width={4}>
              <Header as="h4">Sent</Header>
            </Table.Cell>
          </Table.Row>
          <Table.Row columns={3}>
            <Table.Cell width={5}>Reminder</Table.Cell>
            <Table.Cell width={7}>
              {moment(event.attendanceReminder.sendDate).format(
                'DD/MM/YYYY hh:mm'
              )}
            </Table.Cell>
            <Table.Cell width={4}>
              {event.attendanceReminder.sent ? (
                <Icon name="checkmark" color="green" />
              ) : (
                <Icon name="cancel" color="red" />
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={5}>Confirmation</Table.Cell>
            <Table.Cell width={7}>
              {moment(event.attendanceReminder.sendDate).format(
                'DD/MM/YYYY hh:mm'
              )}
            </Table.Cell>
            <Table.Cell width={4}>
              {event.attendanceReminder.sent ? (
                <Icon name="checkmark" color="green" />
              ) : (
                <Icon name="cancel" color="red" />
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    let values = [
      {
        key: 'date',
        icon: 'calendar outline',
        label: 'Date',
        value: formattedDate
      },
      {
        key: 'minimum',
        icon: 'group',
        label: 'Minimum participants',
        value: event.minimumParticipants
      },
      {
        key: 'location',
        icon: 'marker',
        label: 'Location',
        value: location
      },
      {
        key: 'notifications',
        icon: 'alarm',
        label: 'Notifications',
        value: notifications
      }
    ];
    let tableItems = values.map((e, i) => (
      <Table.Row key={i}>
        <Table.Cell>
          <Header as="h4">
            <Icon name={e.icon} />
            {e.label}
          </Header>
        </Table.Cell>
        <Table.Cell>{e.value}</Table.Cell>
      </Table.Row>
    ));

    return (
      <Table basic="very" divided="vertically">
        <Table.Body>{tableItems}</Table.Body>
      </Table>
    );
  }

  return (
    <div className="event-invitation">
      <Header as="h3">Editing</Header>
      {renderDetails()}
      {renderRecipientList()}
    </div>
  );
};

export default EventEditView;

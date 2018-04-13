import React from 'react';
import { Table, Icon, Header } from 'semantic-ui-react';

const EventParticipants = ({ event }) => {
  function countResponses() {
    var count = 0;
    event.recipients.forEach(recip => {
      if (recip.attending) {
        count++;
      }
    });
    return count;
  }

  let numOfConfirmations = countResponses();
  let listItems = event.recipients.map(recip => {
    let invited = recip.invited ? (
      <Icon name="checkmark" color="green" />
    ) : (
      <Icon name="x" color="red" />
    );
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
        <Table.Cell floated="left">
          <Header as="h6">
            <Header.Content>
              {recip.name || 'Guest'}
              <Header.Subheader>{recip.email}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{invited}</Table.Cell>
        <Table.Cell floated="right">
          {response}
          {responseText}
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <div className="participant-table-wrapper">
      <table className="table-compact">
        <thead className="grey lighten-4">
          <tr>
            <th>Participant</th>
            <th>Invited</th>
            <th>Response</th>
          </tr>
        </thead>

        <Table.Body>
          {listItems}
          <Table.Row>
            <Table.Cell />
            <Table.Cell />
            <Table.Cell />
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <Table.Row
            positive={numOfConfirmations >= event.minimumParticipants}
            negative={numOfConfirmations < event.minimumParticipants}
          >
            <Table.Cell>
              <Header as="h6">Total attending:</Header>
            </Table.Cell>
            <Table.Cell />
            <Table.Cell>
              <Header as="h6">
                {numOfConfirmations}{' '}
                {event.minimumParticipants > 0
                  ? '/' + event.minimumParticipants
                  : ''}
              </Header>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </table>
    </div>
  );
};

export default EventParticipants;

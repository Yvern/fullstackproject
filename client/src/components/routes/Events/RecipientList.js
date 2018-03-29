import React from 'react';
import { Table, Icon, Header } from 'semantic-ui-react';

const RecipientList = ({ event }) => {
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
          <Header as="h4">
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
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Participant</Table.HeaderCell>
          <Table.HeaderCell>Invited</Table.HeaderCell>
          <Table.HeaderCell>Response</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

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
            <Header as="h4">Total attending:</Header>
          </Table.Cell>
          <Table.Cell />
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
};

export default RecipientList;

import React from 'react';

import {
  Container,
  Segment,
  Card,
  Header,
  Button,
  Icon,
  Grid
} from 'semantic-ui-react';

//temporary values used only for TESTING
const TEST_SQUAD_VALUES = [
  {
    _id: 1234566,
    name: 'Team TEA',
    managerIDs: ['1234abc', '5678def'],
    upcoming: 2,
    total: 4,
    background: null,
    badge: null
  },
  {
    _id: 1234567,
    name: 'A Team',
    managerIDs: ['1234abc', '5678def'],
    upcoming: 1,
    total: 5,
    background: null,
    badge: null
  },
  {
    _id: 1234568,
    name: 'TEST Team',
    managerIDs: ['1234abc', '5678def'],
    upcoming: 0,
    total: 1,
    background: null,
    badge: null
  }
];

const renderSquads = squads => {
  return (
    <Card.Group itemsPerRow={4}>
      {squads.map(squad => (
        <div className="squad-segment" key={squad._id}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{squad.name}</Card.Header>
              <p>Upcoming events: {squad.upcoming}</p>
              <p>Organised events: {squad.total}</p>
            </Card.Content>
          </Card>
        </div>
      ))}
      <CreateNewTeam />
    </Card.Group>
  );
};

const CreateNewTeam = () => (
  <div className="squad-segment create-squad-segment">
    <div>
      <Button id="create-new-squad-button" fluid>
        New Squad{' '}
        <span style={{ marginLeft: '5px', marginRight: '0' }}>
          <Icon name="add circle" color="blue" />
        </span>
      </Button>
    </div>
  </div>
);

const TeamSummary = () => (
  <div className="squad-feed">
    <Container fluid>
      <div className="feed-header">
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h2">
              <Icon name="group" color="blue" />My Squads
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button color="blue">
              Create New Squad{' '}
              <span style={{ marginLeft: '5px', marginRight: '0' }}>
                <Icon name="add circle" />
              </span>
            </Button>
          </Grid.Column>
        </Grid>
      </div>
      <div className="feed-content">{renderSquads(TEST_SQUAD_VALUES)}</div>
    </Container>
  </div>
);

export default TeamSummary;

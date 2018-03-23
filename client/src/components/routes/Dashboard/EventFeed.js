import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Header, Card, Button, Icon, Grid } from 'semantic-ui-react';

const renderEventCards = events => {
  return events
    ? events.map(event => <EventCard key={event._id} event={event} />)
    : [];
};

const calculateConfirmations = event => {
  let confirmations = 0;
  event
    ? event.recipients.forEach(
        recip => (recip.attending ? confirmations++ : null)
      )
    : null;
  return confirmations;
};

const EventCard = ({ event }) => {
  let queryURL = 'events/details/?event=' + event._id;
  return (
    <div className="event-card">
      <Link to={queryURL}>
        <Card fluid>
          <Card.Content style={{ textAlign: 'left' }}>
            <Button circular floated="right" size="small" icon="write" />
            <Card.Header>{event.title}</Card.Header>
            <Card.Meta>
              {event.squad}
              {console.log(event)}
            </Card.Meta>
            <Card.Description>
              <p>
                Minimum Participants:{' '}
                <strong>{event.minimumParticipants}</strong>
              </p>
              <p>
                Confirmations: <strong>{calculateConfirmations(event)}</strong>
              </p>
            </Card.Description>
          </Card.Content>
        </Card>
      </Link>
    </div>
  );
};

const EventFeed = ({ events }) => (
  <div className="event-feed">
    <Container fluid>
      <div className="feed-header">
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h2">
              {console.log(events)}
              <Icon name="calendar outline" color="blue" />My Events
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Link to="/events/new">
              <Button color="blue">
                Create New Event{' '}
                <span style={{ marginLeft: '5px', marginRight: '0' }}>
                  <Icon name="add circle" />
                </span>
              </Button>
            </Link>
          </Grid.Column>
        </Grid>
      </div>
      {renderEventCards(events)}
    </Container>
  </div>
);

export default EventFeed;

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'semantic-ui-react';

const EventCard = () => (
  <Link to="events/details">
    <Card fluid>
      <Card.Content style={{ textAlign: 'left' }}>
        <Button circular floated="right" size="small" icon="write" />
        <Card.Header>Tea Party And Such</Card.Header>
        <Card.Meta>Team TEA</Card.Meta>
        <Card.Description>
          Confirmations: <strong>8</strong>
          Cancellations: <strong>3</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Confirm
          </Button>
          <Button basic color="red">
            Cancel
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Link>
);

export default EventCard;

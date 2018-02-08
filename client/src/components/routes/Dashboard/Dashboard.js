import React from 'react';

import { Dimmer, Button } from 'semantic-ui-react';

import EventFeed from './EventFeed';
import UserSummary from './UserSummary';
import TeamSummary from './TeamSummary';
import NewEventForm from './NewEventForm';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNewEvent: true
    };
  }

  handleNewEventOpen() {
    this.setState({
      activeNewEvent: true
    });
  }

  handleNewEventClose() {
    this.setState({
      activeNewEvent: false
    });
  }

  render() {
    return (
      <div className="content-container">
        <Dimmer.Dimmable>
          <div className="dashboard">
            <div className="dashboard-left">
              <UserSummary />
            </div>
            <div className="dashboard-middle">
              <Button
                id="create-event-button"
                primary
                fluid
                size="huge"
                onClick={() => this.handleNewEventOpen()}
              >
                Create new event!
              </Button>
              <EventFeed />
            </div>
            <div className="dashboard-right">
              <TeamSummary />
            </div>
          </div>

          <Dimmer
            inverted
            active={this.state.activeNewEvent}
            onClickOutside={() => this.handleNewEventClose()}
          >
            <NewEventForm
              handleCreateNewEvent={this.props.onCreateNewEvent}
              handleClose={this.handleNewEventClose.bind(this)}
            />
          </Dimmer>
        </Dimmer.Dimmable>
      </div>
    );
  }
}

export default Dashboard;

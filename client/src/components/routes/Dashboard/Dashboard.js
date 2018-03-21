import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';

import { Dimmer, Button } from 'semantic-ui-react';

import EventFeed from './EventFeed';
import UserSummary from './UserSummary';
import TeamSummary from './TeamSummary';
import NewEventForm from './NewEventForm';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNewEvent: false
    };
  }

  componentDidMount() {
    this.props.fetchEventsForUser();
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
            <div className="dashboard-main">
              <div>
                <TeamSummary teams={[]} />
                <EventFeed events={this.props.events} />
              </div>
            </div>
            <div className="dashboard-left">
              <UserSummary user={this.props.auth} events={this.props.events} />
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
    events: state.events,
    squads: state.squads
  };
}

export default connect(mapStateToProps, actions)(Dashboard);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';

import { Dimmer, Button } from 'semantic-ui-react';

import EventFeed from './EventFeed';
import UserSummary from './UserSummary';
import TeamSummary from './TeamSummary';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNewEvent: false
    };
  }

  componentDidMount() {
    this.props.fetchEventsForUser();
    this.props.fetchSquadsForUser();
  }

  render() {
    return (
      <div className="content-container">
        <div className="dashboard">
          <div className="dashboard-main">
            <div>
              <TeamSummary squads={this.props.squads} />
              <EventFeed events={this.props.events} />
            </div>
          </div>
          <div className="dashboard-left">
            <UserSummary user={this.props.auth} events={this.props.events} />
          </div>
        </div>
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

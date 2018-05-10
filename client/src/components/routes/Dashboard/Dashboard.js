import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import M from 'materialize-css';

import TextContainer from '../../General/TextContainer';
import SquadFeed from './SquadFeed';
import EventFeed from './EventFeed';
import UserFeed from './UserFeed';

/*
* A React component that manages the display of the Dashboard page, including
* User information, Event information and Squad information
*/
class Dashboard extends Component {
  componentDidMount() {
    //initialise materializeCSS javascript functionality
    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs, {});

    var pushpin = document.querySelectorAll('.target');
    M.Pushpin.init(pushpin, {});

    //start fetching Events and Squads from the database
    this.props.fetchEventsForUser();
    this.props.fetchSquadsForUser();
  }

  render() {
    return (
      <div>
        <TextContainer color="grey darken-4">
          <UserFeed user={this.props.auth} events={this.props.events} />
        </TextContainer>
        <div className="nav-content grey darken-4 center">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <a href="#squadfeed">Go to Squads</a>
            </li>
            <li className="tab">
              <a href="#eventfeed">Go to Events</a>
            </li>
          </ul>
        </div>
        <TextContainer>
          <div className="row">
            <SquadFeed squads={this.props.squads} />
          </div>
          <div className="row">
            <EventFeed events={this.props.events} />
          </div>
        </TextContainer>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import M from 'materialize-css';

import SquadFeed from './SquadFeed';
import EventFeed from './EventFeed';
import UserFeed from './UserFeed';

/*
* A React component that manages the display of the Dashboard page, including
* User information, Event information and Squad information
*/
class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //initialise materializeCSS javascript functionality
    var elem = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(elem, {});

    //start fetching Events and Squads from the database
    this.props.fetchEventsForUser();
    this.props.fetchSquadsForUser();
  }

  render() {
    return (
      <div>
        <div className="nav-content grey darken-4 center">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <a href="#test1">Go to Events</a>
            </li>
            <li className="tab">
              <a href="#test2">Go to Squads</a>
            </li>
          </ul>
        </div>
        <TextContainer color="grey darken-4">
          <UserFeed user={this.props.auth} />
        </TextContainer>
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

/**
 * Container to display text on the Landing page, allows for children to be
 * passed to display the child elements within the content container
 */
const TextContainer = props => {
  let colour = props.color ? props.color : 'white';
  return (
    <div className={colour}>
      <div className="container">
        <div className="section">
          <div className="row">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

/**
 * Contains images to display in between content sections with optional
 * text to display on the images
 */
const ImageContainer = props => {
  return (
    <div className="parallax-container valign-wrapper">
      <div className="section no-pad-bot">
        <div className="container">
          <div className="row center">
            <h5 className="header col s12 light">{props.children}</h5>
          </div>
        </div>
      </div>
      <div className="parallax grey darken-4">
        <img src={props.imgSrc} alt="Unsplashed background img 2" />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    events: state.events,
    squads: state.squads
  };
}

export default connect(mapStateToProps, actions)(Dashboard);

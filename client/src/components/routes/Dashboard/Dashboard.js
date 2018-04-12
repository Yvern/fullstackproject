import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

/*
* A React component that manages the display of the Dashboard page, including
* User information, Event information and Squad information
*/
class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
        <TextContainer>
          <div className="row">
            <div className="col s12 m6">
              <div className="card z-depth-0">
                <div className="card-content">
                  <h5>{this.props.auth ? this.props.auth.name : ''}</h5>
                  <p>{this.props.auth ? this.props.auth.email : ''}</p>
                </div>
                <div className="card-action">An action</div>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card z-depth-0">
                <div className="card-content">
                  <h5>{this.props.auth ? this.props.auth.name : ''}</h5>
                  <p>{this.props.auth ? this.props.auth.email : ''}</p>
                </div>
                <div className="card-action">An action</div>
              </div>
            </div>
          </div>
          <div className="row">
            <EventFeed events={this.props.events} />
          </div>
        </TextContainer>
      </div>
    );
  }
}

/*
* A stateless functional component to render a given list of events
*/
const EventFeed = ({ events }) => {
  function renderEvents() {
    return events.map(event => {
      return <EventCard event={event} />;
    });
  }

  return (
    <div>
      <h2>Events</h2>
      {renderEvents()}
    </div>
  );
};

const EventCard = ({ event }) => {
  return (
    <div className="card sticky-action small">
      <div className="card-content">
        <p>{event.title}</p>
      </div>
      <div className="card-action">
        <a href="#">Link</a>
      </div>
      <div className="card-reveal" />
    </div>
  );
};

/**
 * Container to display text on the Landing page, allows for children to be
 * passed to display the child elements within the content container
 */
const TextContainer = props => {
  return (
    <div className="container">
      <div className="section">
        <div className="row">{props.children}</div>
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

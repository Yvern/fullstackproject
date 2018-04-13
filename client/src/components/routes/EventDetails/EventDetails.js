import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
import M from 'materialize-css';

import BreadCrumbs from '../../General/BreadCrumbs';
import TextContainer from '../../General/TextContainer';
import EventParticipants from './EventParticipants';

class EventDetails extends Component {
  state = { editing: false };

  componentDidMount() {
    var floating = document.querySelector('.fixed-action-btn');
    var instance = new M.FloatingActionButton(floating, {});

    this.props.fetchEvent(window.location.search);
  }

  componentWillUnmount() {
    this.props.clearEvent();
  }

  onEditSave() {
    this.setState({ editing: false });
    console.log('EDITED');
  }

  renderContent() {
    switch (this.props.event.event) {
      case null:
        return <div>Loading</div>;
      case false:
        return (
          <div>
            Unfortunately, we could not find your event. Please try again.
          </div>
        );
      default:
        return [
          <div key="info" className="col s12 m6">
            <EventInfo event={this.props.event.event} />
          </div>,
          <div key="participants" className="col s12 m6">
            <EventParticipants event={this.props.event.event} />
          </div>
        ];
    }
  }

  render() {
    let crumbPages = [
      { name: 'Dashboard', link: '/dashboard#eventfeed' },
      { name: 'Event Details', link: '#!' }
    ];

    return (
      <div>
        <BreadCrumbs crumbPages={crumbPages} />
        <TextContainer color="grey darken-4 white-text">
          <div className="col m3">
            <Link
              to="/dashboard#eventfeed"
              className="btn waves-effect waves-light light-blue"
            >
              <i className="material-icons left">arrow_back</i> Back
            </Link>
          </div>
          <div className="col m6">
            <h4 className="event-details-title center">
              {this.props.event.event ? this.props.event.event.title : ''}
            </h4>
          </div>
          <div className="col m3">
            <div className="fixed-action-btn">
              <a className="btn-floating btn-large cyan pulse">
                <i className="material-icons">edit</i>
              </a>
            </div>
          </div>
        </TextContainer>
        <TextContainer>{this.renderContent()}</TextContainer>
      </div>
    );
  }
}

const EventInfo = ({ event }) => {
  console.log('event', event);
  return [
    <table>
      <tbody>
        <tr>
          <th className="grey-text text-darken-3">
            <i className="material-icons">insert_invitation</i> Date
          </th>
          <td>Date here</td>
        </tr>
        <tr>
          <th className="grey-text text-darken-3">
            <i className="material-icons">group</i> Minimum
          </th>
          <td>0</td>
        </tr>
        <tr>
          <th className="grey-text text-darken-3">
            <i className="material-icons">location_on</i> Location
          </th>
          <td>Location here</td>
        </tr>
      </tbody>
    </table>,
    <div>
      <h6 className="grey-text text-darken-3">
        <i className="material-icons">notifications</i>Notifications
      </h6>
    </div>
  ];
};

function mapStateToProps(state) {
  return {
    event: state.eventResponse
  };
}

export default connect(mapStateToProps, actions)(EventDetails);

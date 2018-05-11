import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
import moment from 'moment';

import BreadCrumbs from '../../General/BreadCrumbs';
import TextContainer from '../../General/TextContainer';
import EventParticipants from './EventParticipants';
import EventInfoBasic from './EventInfoBasic';
import EventInfoNotifications from './EventInfoNotifications';
import { EventCalendar } from '../Dashboard/EventFeed';

/*
* A React Component that displays details about an event, including the
* title, EventInfoBasic, EventInfoNotifications and EventParticipants.
*/
class EventDetails extends Component {
  state = { editing: false };

  componentDidMount() {
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
          <div key="info" className="col s12 xl6">
            <EventInfo event={this.props.event.event} />
          </div>,
          <div key="participants" className="col s12 xl6">
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
            {this.props.event.event ? (
              <EventCalendar date={moment(this.props.event.event.eventDate)} />
            ) : (
              ''
            )}
          </div>
        </TextContainer>
        <TextContainer>{this.renderContent()}</TextContainer>
      </div>
    );
  }
}

const EventInfo = ({ event }) => {
  return (
    <div className="row event-info-table-wrapper">
      <div className="col s12 m6 xl12">
        <EventInfoBasic event={event} />
      </div>
      <div className="col s12 m6 xl12">
        <EventInfoNotifications event={event} />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    event: state.eventResponse
  };
}

export default connect(mapStateToProps, actions)(EventDetails);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventOverview from './EventOverview';
import * as actions from '../../../actions';
import { Segment, Header, Loader, Dimmer } from 'semantic-ui-react';

class EventDetails extends Component {
  componentDidMount() {
    this.props.fetchEvent(window.location.search);
    console.log(window.location.search);
  }

  componentWillUnmount() {
    this.props.clearEvent();
  }

  renderContent() {
    switch (this.props.event.event) {
      case null:
        return (
          <div style={{ height: 100 }}>
            <Dimmer active inverted>
              <Loader>Loading...</Loader>
            </Dimmer>
          </div>
        );
      case false:
        return <div>Sorry, we could not find your event!</div>;
      default:
        return (
          <div>
            <EventOverview event={this.props.event} />
          </div>
        );
    }
  }

  renderHeader() {
    let eventTitle = 'Loading Event...';
    let eventCreator = '';
    let eventSquad = '';
    if (this.props.event.event) {
      eventTitle = this.props.event.event.title;
      eventCreator = 'by ' + this.props.event.event._user;
      eventSquad = ' | ' + this.props.event.event._squad;
    }
    return (
      <Header as="h1" textAlign="center">
        {eventTitle}
        <Header.Subheader>
          {eventCreator} {eventSquad}
        </Header.Subheader>
      </Header>
    );
  }

  render() {
    return (
      <div className="event-detail-container">
        <Segment secondary attached="top">
          {this.renderHeader()}
        </Segment>
        <Segment attached="bottom">
          <div>{this.renderContent()}</div>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.eventResponse
  };
}

export default connect(mapStateToProps, actions)(EventDetails);

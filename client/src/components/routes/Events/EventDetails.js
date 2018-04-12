import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions';
import {
  Segment,
  Header,
  Loader,
  Dimmer,
  Grid,
  Button,
  Icon
} from 'semantic-ui-react';
import EventOverview from './EventOverview';
import EventEditView from './EventEditView';

class EventDetails extends Component {
  state = { editing: false };

  componentDidMount() {
    this.props.fetchEvent(window.location.search);
    console.log(window.location.search);
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
            {this.state.editing ? (
              <EventEditView
                event={this.props.event.event}
                onSave={this.onEditSave}
                onCancel={() => this.setState({ editing: true })}
              />
            ) : (
              <EventOverview event={this.props.event.event} />
            )}
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
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={3}>
            <Link to="/dashboard">
              <Button color="blue" icon labelPosition="left">
                <Icon name="left arrow" />Back
              </Button>
            </Link>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h1" textAlign="center">
              {eventTitle}
              <Header.Subheader>
                {eventCreator} {eventSquad}
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            <Button
              color="blue"
              circular
              floated="right"
              size="large"
              icon="write"
              onClick={() => this.setState({ editing: true })}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

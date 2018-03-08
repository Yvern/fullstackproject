import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventRecipientView from './EventRecipientView';
import * as actions from '../../../actions';

class EventDetail extends Component {
  componentDidMount() {
    this.props.fetchEvent(window.location.search);
    console.log(window.location.search);
  }

  renderContent() {
    switch (this.props.event.event) {
      case null:
        return <div>Loading...</div>;
      case false:
        return <div>Sorry, we could not find your event!</div>;
      default:
        return (
          <div>
            <EventRecipientView event={this.props.event} />
          </div>
        );
    }
  }

  render() {
    return <div>TEST{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    event: state.eventResponse
  };
}

export default connect(mapStateToProps, actions)(EventDetail);

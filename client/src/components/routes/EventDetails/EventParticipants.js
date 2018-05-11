import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import AddParticipant from './AddParticipant';

/*
* A React Component that renders all participants to an event to a list.
* The list shows participant names, emails, invitation status and response
* status. It also has an 'Add Participant' option.
*/
class EventParticipants extends Component {
  constructor(props) {
    super(props);
    this.state = { showAddParticipant: false, sendingInvites: false };
    this.showAddParticipant = this.showAddParticipant.bind(this);
    this.hideAddParticipant = this.hideAddParticipant.bind(this);
    this.sendInvites = this.sendInvites.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event.recipients !== this.props.event.recipients) {
      this.setState({ sendingInvites: false });
    }
  }

  showAddParticipant() {
    this.setState({ showAddParticipant: true });
  }

  hideAddParticipant() {
    this.setState({ showAddParticipant: false });
  }

  sendInvites() {
    this.setState({ sendingInvites: true });
    this.props.sendMail(this.props.event);
  }

  countResponses() {
    var count = 0;
    this.props.event.recipients.forEach(recip => {
      if (recip.attending) {
        count++;
      }
    });
    return count;
  }

  onSubmit(values) {
    console.log('add recipient: ', values);
    this.props.addEventRecipient(this.props.event, values);
    this.setState({ showAddParticipant: false });
  }

  render() {
    let numOfConfirmations = this.countResponses();
    let listItems = this.props.event.recipients.map(recip => {
      let invited = recip.invited ? (
        <i className="material-icons green-text">check</i>
      ) : (
        <i className="material-icons red-text">clear</i>
      );
      let response = (
        <i className="material-icons grey-text inline-icon">help_outline</i>
      );
      let responseText = 'Not responded';
      if (recip.responded) {
        response = recip.attending ? (
          <i className="material-icons green-text inline-icon">check</i>
        ) : (
          <i className="material-icons red-text inline-icon">clear</i>
        );
        responseText = recip.attending ? 'Attending' : 'Cancelled';
      }

      return (
        <tr key={recip._id}>
          <td>
            <h6>{recip.name || 'Guest'}</h6>
            {recip.email}
          </td>
          <td>{invited}</td>
          <td>
            {response}
            {responseText}
          </td>
        </tr>
      );
    });

    return (
      <div className="participant-table-wrapper">
        <table className="row table-compact z-depth-1">
          <thead className="grey lighten-4">
            <tr>
              <th>
                <h6>Participant</h6>
              </th>
              <th>
                <h6>Invited</h6>
              </th>
              <th>
                <h6>Response</h6>
              </th>
            </tr>
          </thead>

          <tbody>{listItems}</tbody>

          <tfoot>
            <tr>
              <th>
                <h6>Total attending:</h6>
              </th>
              <th />
              <th>
                <h6>
                  {numOfConfirmations}{' '}
                  {this.props.event.minimumParticipants > 0
                    ? '/' + this.props.event.minimumParticipants
                    : ''}
                </h6>
              </th>
            </tr>
          </tfoot>
        </table>
        <div className="row participant-add-fields z-depth-1 fluid">
          {this.state.showAddParticipant ? (
            <AddParticipant
              event={this.props.event}
              onCancel={this.hideAddParticipant}
              onSubmit={this.onSubmit}
            />
          ) : (
            ''
          )}
        </div>
        <div className="row participant-buttons">
          <button
            onClick={
              this.state.showAddParticipant
                ? this.hideAddParticipant
                : this.showAddParticipant
            }
            className="btn light-blue white-text waves-effect light-waves left"
          >
            Add Someone <i className="material-icons right white-text">add</i>
          </button>
          <button
            onClick={this.sendInvites}
            className="btn green white-text waves-effect light-waves right"
            disabled={this.state.sendingInvites}
          >
            Send Invites <i className="material-icons right white-text">send</i>
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.eventResponse.event
  };
}

export default connect(mapStateToProps, actions)(EventParticipants);

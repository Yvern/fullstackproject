import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import AddParticipant from '../EventDetails/AddParticipant';

/*
* A React Component that displays a list of members in a Squad and information
* about each member.
*/
class SquadMembers extends Component {
  constructor(props) {
    super(props);
    this.state = { showAddParticipant: false };
    this.showAddParticipant = this.showAddParticipant.bind(this);
    this.hideAddParticipant = this.hideAddParticipant.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  showAddParticipant() {
    this.setState({ showAddParticipant: true });
  }

  hideAddParticipant() {
    this.setState({ showAddParticipant: false });
  }

  onSubmit(values) {
    console.log('add recipient: ', values);
    this.props.addSquadMember(this.props.squad, values);
    this.setState({ showAddParticipant: false });
  }

  render() {
    let listItems = this.props.squad.members.map(member => {
      let response = (
        <i className="material-icons grey-text inline-icon">clear</i>
      );
      let responseText = 'Not confirmed';
      if (member.confirmed) {
        response = (
          <i className="material-icons green-text inline-icon">check</i>
        );
        responseText = 'Confirmed member';
      }

      return (
        <tr>
          <td>
            <h6>{member.name || 'Guest'}</h6>
            {member.email}
          </td>
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
                <h6>Member</h6>
              </th>
              <th>
                <h6>Confirmed membership</h6>
              </th>
            </tr>
          </thead>

          <tbody>{listItems}</tbody>
        </table>
        <div className="row participant-add-fields z-depth-1 fluid">
          {this.state.showAddParticipant ? (
            <AddParticipant
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
            onClick={() => console.log('mail')}
            className="btn green white-text waves-effect light-waves right"
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
    squad: state.squadData.squad
  };
}

export default connect(mapStateToProps, actions)(SquadMembers);

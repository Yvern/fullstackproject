import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import moment from 'moment';
import {
  Header,
  Segment,
  Button,
  Table,
  Grid,
  Divider,
  Icon
} from 'semantic-ui-react';
import RecipientList from './RecipientList';
import AddParticipant from './AddParticipant';

class EventOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { showAddParticipant: false };
    this.showAddParticipant = this.showAddParticipant.bind(this);
    this.hideAddParticipant = this.hideAddParticipant.bind(this);
  }

  showAddParticipant() {
    this.setState({ showAddParticipant: true });
  }

  hideAddParticipant() {
    this.setState({ showAddParticipant: false });
  }

  renderDetails() {
    let formattedDate = moment(this.props.event.eventDate).format(
      'ddd, D MMM YYYY, h:mm a'
    );
    let location = this.props.event.location || 'No location given';
    let notifications = (
      <Table basic="very" compact>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={5}>
              <Header as="h4">Type</Header>
            </Table.Cell>
            <Table.Cell width={7}>
              <Header as="h4">Send date</Header>
            </Table.Cell>
            <Table.Cell width={4}>
              <Header as="h4">Sent</Header>
            </Table.Cell>
          </Table.Row>
          <Table.Row columns={3}>
            <Table.Cell width={5}>Reminder</Table.Cell>
            <Table.Cell width={7}>
              {moment(this.props.event.attendanceReminder.sendDate).format(
                'DD/MM/YYYY hh:mm'
              )}
            </Table.Cell>
            <Table.Cell width={4}>
              {this.props.event.attendanceReminder.sent ? (
                <Icon name="checkmark" color="green" />
              ) : (
                <Icon name="cancel" color="red" />
              )}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={5}>Confirmation</Table.Cell>
            <Table.Cell width={7}>
              {moment(this.props.event.attendanceReminder.sendDate).format(
                'DD/MM/YYYY hh:mm'
              )}
            </Table.Cell>
            <Table.Cell width={4}>
              {this.props.event.attendanceReminder.sent ? (
                <Icon name="checkmark" color="green" />
              ) : (
                <Icon name="cancel" color="red" />
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );

    let values = [
      {
        key: 'date',
        icon: 'calendar outline',
        label: 'Date',
        value: formattedDate
      },
      {
        key: 'minimum',
        icon: 'group',
        label: 'Minimum participants',
        value: this.props.event.minimumParticipants
      },
      {
        key: 'location',
        icon: 'marker',
        label: 'Location',
        value: location
      },
      {
        key: 'notifications',
        icon: 'alarm',
        label: 'Notifications',
        value: notifications
      }
    ];
    let tableItems = values.map((e, i) => (
      <Table.Row key={i}>
        <Table.Cell>
          <Header as="h4">
            <Icon name={e.icon} />
            {e.label}
          </Header>
        </Table.Cell>
        <Table.Cell>{e.value}</Table.Cell>
      </Table.Row>
    ));

    return (
      <Table basic="very" divided="vertically">
        <Table.Body>{tableItems}</Table.Body>
      </Table>
    );
  }

  render() {
    return (
      <div className="event-invitation">
        {this.renderDetails()}
        <RecipientList event={this.props.event} />
        {this.state.showAddParticipant ? (
          <AddParticipant
            event={this.props.event}
            onCancel={this.hideAddParticipant}
          />
        ) : (
          ''
        )}
        <Button color="blue" onClick={this.showAddParticipant}>
          Add Participant <Icon name="add circle" />
        </Button>
        <Button
          positive
          icon
          labelPosition="right"
          floated="right"
          onClick={() => this.props.sendMail(this.props.event)}
        >
          Send Invites <Icon name="send outline" />
        </Button>
      </div>
    );
  }
}

export default connect(null, actions)(EventOverview);

import React from 'react';

import {
  Segment,
  Header,
  Form,
  Input,
  TextArea,
  Button,
  Icon
} from 'semantic-ui-react';

class NewEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitEvent: {},
      event: {
        name: '',
        team: {
          name: '',
          id: ''
        },
        startTime: '',
        startDate: '',
        endTime: '',
        endDate: '',
        location: {
          name: '',
          lat: 50,
          lng: 49
        },
        description: ''
      }
    };
  }

  /**
   * State changing functions to handle changes in the New Event Form
   */

  handleEventChange = (e, { name, value }) =>
    this.setState({
      event: {
        ...this.state.event,
        [name]: value
      }
    });

  handleEventSubmit = () => {
    const event = this.state.event;
    this.setState({ submitEvent: event });

    this.props.handleCreateNewEvent(event);
  };

  render() {
    console.log(this.state);
    return (
      <div className="new-event-form">
        <Segment>
          <Header as="h2">
            Enter New Event Details
            <span style={{ float: 'right' }}>
              <Icon
                name="cancel"
                color="red"
                link
                onClick={() => this.props.handleClose()}
              />
            </span>
          </Header>
          <Form onSubmit={this.handleEventSubmit}>
            <Form.Field
              control={Input}
              required
              label="Event name"
              value={this.state.event.name}
              name="name"
              onChange={this.handleEventChange}
            />
            <Form.Field
              control={Input}
              label="Team"
              name="team"
              onChange={this.handleEventChange}
            />
            <Form.Group widths={2}>
              <Form.Field
                control={Input}
                required
                label="Start time"
                value={this.state.event.startTime}
                name="startTime"
                onChange={this.handleEventChange}
              />
              <Form.Field
                control={Input}
                required
                label="Start date"
                value={this.state.event.startDate}
                name="startDate"
                onChange={this.handleEventChange}
              />
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Field
                control={Input}
                label="End time"
                value={this.state.event.endTime}
                name="endTime"
                onChange={this.handleEventChange}
              />
              <Form.Field
                control={Input}
                label="End date"
                value={this.state.event.endDate}
                name="endDate"
                onChange={this.handleEventChange}
              />
            </Form.Group>
            <Form.Field
              control={Input}
              label="Location"
              value={this.state.event.location}
              name="location"
              onChange={this.handleEventChange}
            />
            <Form.Field
              control={TextArea}
              label="Description"
              value={this.state.event.description}
              name="description"
              onChange={this.handleEventChange}
            />
            <Button type="submit">Create New Event</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default NewEventForm;

import React, { Component } from 'react';
import { Segment, Form, Icon } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import validateEmails from '../../../utils/validateEmail';
import * as actions from '../../../actions';
import FormTextField from '../../Forms/FormTextField';

class AddParticipant extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    console.log('add recipient: ', values);
    this.props.addEventRecipient(this.props.event, values);
  }

  render() {
    return (
      <Segment>
        <Form style={{ margin: 0, padding: 0 }}>
          <Form.Group
            widths="equal"
            style={{ marginBottom: '-1.5em', marginTop: '-1em', padding: 0 }}
          >
            <Field
              name="name"
              label="Name"
              type="text"
              component={FormTextField}
            />
            <Field
              required
              name="email"
              label="Email"
              type="text"
              component={FormTextField}
            />
            <Form.Group floated="right">
              <Form.Button
                onClick={this.props.handleSubmit(this.onSubmit)}
                icon
                type="submit"
                color="green"
                floated="left"
                style={{ marginTop: '1.8em' }}
              >
                <Icon name="add" />
              </Form.Button>
              <Form.Button
                onClick={this.props.onCancel}
                icon
                color="red"
                floated="right"
                style={{ marginTop: '1.8em' }}
              >
                <Icon name="cancel" />
              </Form.Button>
            </Form.Group>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.email || '');

  if (!values.email) {
    errors.email = 'Please provide an email address.';
  }

  return errors;
}

AddParticipant = reduxForm({
  validate,
  form: 'participantForm'
})(AddParticipant);

export default connect(null, actions)(AddParticipant);

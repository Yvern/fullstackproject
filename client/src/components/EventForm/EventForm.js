import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import EventTextField from './EventTextField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Label,
  Message,
  Segment,
  Header,
  Icon,
  Divider
} from 'semantic-ui-react';

const ToggleOption = ({ label }) => <Checkbox label={label} />;

class EventForm extends Component {
  renderFields() {
    return formFields.map(({ name, label, type }) => {
      if (type === 'toggle') {
        return (
          <Field
            key={name}
            name={name}
            label={label}
            type="toggle"
            component={ToggleOption}
          />
        );
      }

      if (type === 'email') {
        return (
          <Field
            key={name}
            name={name}
            label={label}
            type="text"
            component={EventTextField}
          />
        );
      }
      return (
        <Field
          key={name}
          name={name}
          label={label}
          type={type}
          component={EventTextField}
        />
      );
    });
  }

  render() {
    return (
      <div className="create-event-form-container">
        <Message attached style={{ height: '4em' }}>
          <Header floated="left">
            <Icon name="add to calendar" color="blue" />Create a New Event
          </Header>
          <Icon link name="close" size="large" color="red" />
        </Message>
        <Segment attached="bottom">
          <Form
            onSubmit={this.props.handleSubmit(this.props.onEventFormSubmit)}
          >
            {this.renderFields()}
            <Divider />
            <Link to="/events">
              <Button>Cancel</Button>
            </Link>
            <Button
              floated="right"
              color="blue"
              type="submit"
              icon
              labelPosition="right"
            >
              Next<Icon name="right arrow" />
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name, required, noValueError }) => {
    console.log(required);
    if (!values[name] && required) {
      errors[name] = noValueError ? noValueError : 'Please provide a value.';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'eventForm',
  destroyOnUnmount: false
})(EventForm);

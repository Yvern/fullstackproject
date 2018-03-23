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
import Datetime from '../DateTimePicker';

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

      if (type === 'date') {
        return (
          <Field key={name} name={name} label={label} component={Datetime} />
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
      <div>
        <Form onSubmit={this.props.handleSubmit(this.props.onEventFormSubmit)}>
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
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name, required, noValueError }) => {
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

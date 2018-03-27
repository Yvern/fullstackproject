import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import FormTextField from '../FormTextField';
import FormDropdown from '../FormDropdown';
import { Link } from 'react-router-dom';
import validateEmails from '../../../utils/validateEmail';
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
  Divider,
  Dropdown
} from 'semantic-ui-react';
import Datetime from '../../DateTimePicker';

class EventForm extends Component {
  renderFields() {
    return formFields.map(({ name, label, type, page }) => {
      if (page === 1) {
        if (type === 'squad') {
          let options = this.props.squads.map(squad => ({
            text: squad.name,
            value: squad._id
          }));
          return (
            <Field
              key={name}
              name={name}
              label={label}
              options={options}
              placeholder="Select Team"
              component={FormDropdown}
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
              component={FormTextField}
            />
          );
        }
        return (
          <Field
            key={name}
            name={name}
            label={label}
            type={type}
            component={FormTextField}
          />
        );
      }
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

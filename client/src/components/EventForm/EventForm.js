import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import EventTextField from './EventTextField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';

class EventForm extends Component {
  renderFields() {
    return formFields.map(({ name, label, type }) => {
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
        <form onSubmit={this.props.handleSubmit(this.props.onEventFormSubmit)}>
          {this.renderFields()}
          <Link to="/events">Cancel</Link>
          <button type="submit">Next</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name, noValueError }) => {
    if (!values[name]) {
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

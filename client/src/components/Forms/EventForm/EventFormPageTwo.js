import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/index';
import { reduxForm, Field } from 'redux-form';
import validateEmails from '../../../utils/validateEmail';
import formFields from './formFields';
import M from 'materialize-css';

import Datetime from '../../DateTimePicker';
import FormTextField from '../FormTextField';
import FormCheckBox from '../FormCheckBox';

const FormToggleNotifications = props => {
  return (
    <div className="row">
      <div className="col s12 m6">
        <Field
          key={props.name}
          name={props.name}
          label={props.label}
          type="toggle"
          component={FormCheckBox}
        />
      </div>
      <div className="col s12 m6">
        <Field
          key={props.name + 'date'}
          name={props.name + 'date'}
          disabled={!props.value}
          component={Datetime}
        />
      </div>
    </div>
  );
};

/*
* Second page of the Event form. Contains fields to enter the minimumParticipants,
* toggle notifications and set their dates, and give a list of recipients.
*/
class EventFormPageTwo extends Component {
  componentDidMount() {
    M.updateTextFields();
  }

  renderFields() {
    return formFields.map(({ name, label, type, page }) => {
      if (page === 2) {
        if (type === 'toggle') {
          return (
            <FormToggleNotifications
              name={name}
              label={label}
              value={this.props.formValues[name]}
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
      return null;
    });
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(() =>
            this.props.submitEvent(this.props.formValues, this.props.history)
          )}
        >
          {this.renderFields()}
          <button
            className="btn yellow darken-3 white-text"
            onClick={this.props.onCancel}
          >
            <i className="material-icons left">arrow_back</i>Back
          </button>
          <button type="submit" className="btn green right white-text">
            <i className="material-icons right">check</i>
            Create Event
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  //ensure reminder dates are between the current date and the event date
  if (
    values.reminderattendance &&
    (values.reminderattendancedate < new Date() ||
      values.reminderattendancedate > values.date)
  ) {
    errors.reminderattendancedate =
      'It would be wise to set a reminder for a date between now and the event...';
  }

  if (
    values.reminderconfirmation &&
    (values.reminderconfirmationdate < new Date() ||
      values.reminderattendancedate > values.date)
  ) {
    errors.reminderconfirmationdate = 'Please provide a date in the future.';
  }

  formFields.forEach(({ name, required, noValueError }) => {
    if (!values[name] && required) {
      errors[name] = noValueError ? noValueError : 'Please provide a value.';
    }
  });

  return errors;
}

EventFormPageTwo = reduxForm({
  validate,
  form: 'eventForm',
  destroyOnUnmount: false
})(EventFormPageTwo);

function mapStateToProps(state) {
  return {
    formValues: state.form.eventForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(EventFormPageTwo));

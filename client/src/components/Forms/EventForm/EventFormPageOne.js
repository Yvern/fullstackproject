import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import FormTextField from '../FormTextField';
import FormDropdown from '../FormDropdown';
import { Link } from 'react-router-dom';
import validateEmails from '../../../utils/validateEmail';
import formFields from './formFields';
import Datetime from '../../DateTimePicker';
import moment from 'moment';
import M from 'materialize-css';

import { connect } from 'react-redux';
import { change } from 'redux-form';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.onEventFormSubmit = this.onEventFormSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSquadChange = this.onSquadChange.bind(this);
  }

  componentDidMount() {
    M.updateTextFields();
  }

  onEventFormSubmit() {
    this.props.onEventFormSubmit();
  }

  onDateChange(e, date) {
    let currentDate = new Date();
    let reminderDate = moment(date).subtract(3, 'days');
    reminderDate = reminderDate > currentDate ? reminderDate : date;
    let confirmationDate = moment(date).subtract(1, 'days');
    confirmationDate = confirmationDate > currentDate ? confirmationDate : date;

    this.props.change('date', date);
    this.props.change('reminderattendancedate', reminderDate);
    this.props.change('reminderconfirmationdate', confirmationDate);
  }

  onSquadChange(e, squad) {
    let recipientList = this.squadMembersToRecipients(
      this.loadSquadMembers(squad)
    );
    this.props.change('recipients', recipientList);
  }

  loadSquadMembers(squadID) {
    //if squad has been set
    console.log('this.props.formValues', this.props.formValues);
    if (squadID) {
      let squad = this.props.squads.find(squad => squadID === squad._id);
      console.log('squad: ', squad.members);
      return squad.members;
    }

    return [];
  }

  squadMembersToRecipients(members) {
    let emails = '';
    console.log('members', members);
    members.forEach((member, i) => {
      console.log(i, member);
      if (i > 0) {
        emails = emails.concat(',');
      }
      emails = emails.concat(member.email);
    });
    return emails;
  }

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
              onChange={this.onSquadChange}
              component={FormDropdown}
            />
          );
        }

        if (type === 'date') {
          return (
            <Field
              key={name}
              name={name}
              label={label}
              onChange={this.onDateChange}
              component={Datetime}
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
        <form onSubmit={this.props.handleSubmit(this.onEventFormSubmit)}>
          {this.renderFields()}
          <Link to="/dashboard#eventfeed" className="btn red">
            Cancel
          </Link>
          <button type="submit" className="btn blue white-text right">
            <i className="material-icons right">arrow_forward</i>Next
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');
  if (values.date < new Date()) {
    errors.date = 'Please provide a date in the future.';
  }

  formFields.forEach(({ name, required, noValueError }) => {
    if (!values[name] && required) {
      errors[name] = noValueError ? noValueError : 'Please provide a value.';
    }
  });

  return errors;
}

EventForm = reduxForm({
  validate,
  form: 'eventForm',
  destroyOnUnmount: false
})(EventForm);

function mapStateToProps(state) {
  return {
    formValues: state.form.eventForm.values,
    formFields: state.form.eventForm.fields
  };
}

export default connect(mapStateToProps, change)(EventForm);

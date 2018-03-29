import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions/index';
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

const ToggleOption = ({ input, label }) => (
  <Checkbox {...input} label={label} />
);

class EventFormPageTwo extends Component {
  renderFields() {
    return formFields.map(({ name, label, type, page }) => {
      if (page === 2) {
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
        <Form
          onSubmit={this.props.handleSubmit(() =>
            this.props.submitEvent(this.props.formValues, this.props.history)
          )}
        >
          {this.renderFields()}
          <Divider />
          <Button icon labelPosition="left" onClick={this.props.onCancel}>
            <Icon name="left arrow" />Back
          </Button>
          <Button
            floated="right"
            icon
            labelPosition="right"
            type="submit"
            className="green btn-flat right white-text"
          >
            Create Event
            <Icon name="checkmark" />
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

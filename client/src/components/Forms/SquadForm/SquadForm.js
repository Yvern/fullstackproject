import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormTextField from '../FormTextField';
import formFields from './formFields';
import * as actions from '../../../actions/index';
import validateEmails from '../../../utils/validateEmail';

class SquadForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitSquad = this.handleSubmitSquad.bind(this);
  }

  handleSubmitSquad(values) {
    console.log(values, this.props);
    this.props.submitSquad(values, this.props.history);
  }

  renderFields() {
    return formFields.map(({ name, label, type }) => {
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
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmitSquad)}>
        {this.renderFields()}
        <Link to="/dashboard#squadfeed" className="btn red">
          Cancel
        </Link>
        <button type="submit" className="btn green white-text right">
          <i className="material-icons right">check</i>Create Squad
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.members = validateEmails(values.members || '');

  formFields.forEach(({ name, required, noValueError }) => {
    if (!values[name] && required) {
      errors[name] = noValueError ? noValueError : 'Please provide a value.';
    }
  });

  return errors;
}

SquadForm = reduxForm({
  validate,
  form: 'squadForm'
})(SquadForm);

export default connect(null, actions)(withRouter(SquadForm));

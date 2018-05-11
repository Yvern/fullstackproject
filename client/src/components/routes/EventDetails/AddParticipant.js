import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import validateEmails from '../../../utils/validateEmail';
import * as actions from '../../../actions';
import FormTextField from '../../Forms/FormTextField';

/*
* A React Component that allows the user to add a participant to the list of
* participants for an Event.
*/
class AddParticipant extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.props.onSubmit;
  }

  render() {
    return (
      <div className="add-participant-wrapper">
        <form>
          <div>
            <button className="btn-flat" onClick={this.props.onCancel}>
              <i className="material-icons">clear</i>
            </button>
          </div>
          <div>
            <div className="col m6 s12 compact">
              <Field
                required
                name="email"
                label="Email"
                type="email"
                component={FormTextField}
              />
            </div>
            <div className="col m4 s12 compact">
              <Field
                name="name"
                label="Name"
                type="text"
                component={FormTextField}
              />
            </div>
            <div className="col m2 s12">
              <button
                className="btn green"
                onClick={this.props.handleSubmit(this.onSubmit)}
                type="submit"
                disabled={this.props.pristine || this.props.submitting}
              >
                <i className="material-icons">add</i>
              </button>
            </div>
          </div>
        </form>
      </div>
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

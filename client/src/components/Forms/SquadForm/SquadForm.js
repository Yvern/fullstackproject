import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormTextField from '../FormTextField';
import formFields from './formFields';
import * as actions from '../../../actions/index';
import validateEmails from '../../../utils/validateEmail';
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
    console.log('squad form state:', this.state);
    console.log('squad form props:', this.props);
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit(this.handleSubmitSquad)}>
          {this.renderFields()}
          <Divider />
          <Link to="/events">
            <Button>Cancel</Button>
          </Link>
          <Button
            floated="right"
            icon
            labelPosition="right"
            type="submit"
            className="green btn-flat right white-text"
          >
            Create Squad
            <Icon name="checkmark" />
          </Button>
        </Form>
      </div>
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

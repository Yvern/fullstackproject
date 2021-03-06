import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SquadForm from './SquadForm';

/*
* React Component that displays the SquadForm.
* This component's state is managed using Redux-form.
*/
class SquadCreate extends Component {
  render() {
    return (
      <div className="container">
        <h3>
          <i className="material-icons medium light-blue-text">group</i> Create
          a New Squad
        </h3>
        <SquadForm />
      </div>
    );
  }
}

export default reduxForm({
  form: 'squadForm'
})(SquadCreate);

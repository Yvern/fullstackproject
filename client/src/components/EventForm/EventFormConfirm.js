import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const EventFormConfirm = ({ formValues, onCancel, submitEvent, history }) => {
  const renderFields = formFields.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries:</h5>
      {renderFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        type="submit"
        className="green btn-flat right white-text"
        onClick={() => submitEvent(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.eventForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(EventFormConfirm));

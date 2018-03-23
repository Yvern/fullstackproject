import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import { List, Divider, Icon, Button } from 'semantic-ui-react';

const EventFormConfirm = ({ formValues, onCancel, submitEvent, history }) => {
  const renderFields = formFields.map(({ name, label }) => {
    if (name === 'date') {
      return (
        <List.Item key={name}>
          <List.Header>{name}</List.Header>
          <List.Description>{formValues[name].toString()}</List.Description>
        </List.Item>
      );
    }

    return (
      <List.Item key={name}>
        <List.Content>
          <List.Header>{label}</List.Header>
          <List.Description>
            {name === 'date'
              ? console.log(formValues['date'])
              : formValues[name]}
          </List.Description>
        </List.Content>
      </List.Item>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries:</h5>
      <List>
        {console.log(formValues)}
        {renderFields}
      </List>
      <Divider />
      <Button icon labelPosition="left" onClick={onCancel}>
        <Icon name="left arrow" />Back
      </Button>
      <Button
        floated="right"
        icon
        labelPosition="right"
        type="submit"
        className="green btn-flat right white-text"
        onClick={() => submitEvent(formValues, history)}
      >
        Create Event
        <Icon name="checkmark" />
      </Button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.eventForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(EventFormConfirm));

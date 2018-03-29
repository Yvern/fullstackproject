import React, { Component } from 'react';
import Datetime from 'react-datetime';
import { Form, Input } from 'semantic-ui-react';

const DatePicker = ({ input, label, meta: { error, touched } }) => {
  function renderInput(props, openCalendar, closeCalendar) {
    function clear() {
      props.onChange({ target: { value: '' } });
    }
    return (
      <div>
        <Form.Field label={label} control={Input} {...props} />
        <div className="form-error-text" style={{ marginBottom: '20px' }}>
          {touched && error}
        </div>
      </div>
    );
  }
  return <Datetime {...input} renderInput={renderInput} />;
};

export default DatePicker;

import React, { Component } from 'react';
import Datetime from 'react-datetime';
import { Form, Input } from 'semantic-ui-react';

const DatePicker = ({ input, meta, label }) => {
  function renderInput(props, openCalendar, closeCalendar) {
    function clear() {
      props.onChange({ target: { value: '' } });
    }
    return (
      <div>
        <Form.Field label={label} control={Input} {...props} />
      </div>
    );
  }
  return <Datetime {...input} renderInput={renderInput} />;
};

export default DatePicker;

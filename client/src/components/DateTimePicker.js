import React, { Component } from 'react';
import Datetime from 'react-datetime';
import { Form, Input } from 'semantic-ui-react';

const DatePicker = ({
  input,
  label,
  meta: { error, touched },
  disabled = false
}) => {
  function renderInput(props, openCalendar, closeCalendar) {
    function clear() {
      props.onChange({ target: { value: '' } });
    }
    return (
      <div className="input-field">
        <input
          disabled={disabled}
          {...input}
          {...props}
          type="text"
          id={input.name}
          className={touched ? (error ? 'invalid' : 'valid') : 'validate'}
        />
        <label htmlFor={input.name}>{label}</label>
        <span
          className="helper-text"
          data-error={error}
          data-success="Looks good!"
        />
      </div>
    );
  }
  return <Datetime {...input} renderInput={renderInput} />;
};

export default DatePicker;

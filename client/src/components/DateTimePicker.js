import React from 'react';
import Datetime from 'react-datetime';

/*
* A visual date picker component that allows for more intuitive date picking
*/
const DatePicker = ({
  input,
  label,
  meta: { error, touched },
  disabled = false
}) => {
  function renderInput(props, openCalendar, closeCalendar) {
    /*
    function clear() {
      props.onChange({ target: { value: '' } });
    }
    */
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

import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  console.log('input', input);
  return (
    <div className="input-field compact">
      <input {...input} type="text" id={input.name} className="validate" />
      <label htmlFor={input.name}>{label}</label>
      <span className="helper-text" data-error="wrong" data-success="right">
        {touched && error}
      </span>
    </div>
  );
};

import React from 'react';
import M from 'materialize-css';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div className="input-field compact">
      <input
        {...input}
        type="text"
        id={input.name}
        className={touched ? (error ? 'invalid' : 'valid') : 'validate'}
      />
      <label htmlFor={input.name}>{label}</label>
      <span
        className="helper-text"
        data-error={error}
        data-success="Looks good!"
      >
        {touched && error}
      </span>
    </div>
  );
};

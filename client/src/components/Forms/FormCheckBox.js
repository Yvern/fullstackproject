import React from 'react';

/*
* A React Component that displays a checkbox the user can check, including
* additional error/data messages related.
*/
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <p>
      <label>
        <input
          {...input}
          type="checkbox"
          id={input.name}
          className="filled-in"
          checked={input.value}
        />
        <span>{label}</span>
      </label>
    </p>
  );
};

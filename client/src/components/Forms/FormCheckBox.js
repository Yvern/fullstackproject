import React from 'react';

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

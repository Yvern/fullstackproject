import React from 'react';

import { Form, Field, Dropdown, Message, Text, Icon } from 'semantic-ui-react';

export default ({
  input,
  label,
  options,
  placeholder,
  meta: { error, touched }
}) => {
  return (
    <div>
      <Form.Select
        name="squad"
        value={input.value}
        onChange={(e, { value }) => input.onChange(value)}
        label={label}
        icon={
          input.value ? (
            <Icon
              link
              onClick={() => input.onChange(null)}
              name="x"
              color="red"
            />
          ) : (
            'dropdown'
          )
        }
        options={options}
        placeholder={placeholder}
        error={touched && error}
        fluid={true}
        selection={true}
      />
      <div className="form-error-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

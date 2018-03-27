import React from 'react';

import { Form, Field, Input, Message, Text } from 'semantic-ui-react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <Form.Field
        label={label}
        control={Input}
        {...input}
        error={touched && error}
      />
      <div className="form-error-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

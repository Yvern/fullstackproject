import React from 'react';

/**
 * Container to display text on the Landing page, allows for children to be
 * passed to display the child elements within the content container
 */
const TextContainer = props => {
  let colour = props.color ? props.color : 'white';
  return (
    <div className={colour}>
      <div className="container">
        <div className="section">
          <div className="row">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default TextContainer;

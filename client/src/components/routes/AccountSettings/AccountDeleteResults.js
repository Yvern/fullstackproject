import React from 'react';
import { connect } from 'react-redux';

const AccountDeleteResults = props => {
  if (props.auth) {
    return (
      <div className="container">
        <p>
          Something went wrong when trying to delete your account, please try
          again!
        </p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>Successfully removed your account!</p>
      </div>
    );
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(AccountDeleteResults);

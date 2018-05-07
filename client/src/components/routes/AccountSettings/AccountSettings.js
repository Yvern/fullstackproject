import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../actions';

const AccountSettings = props => {
  return (
    <div className="container">
      <p>
        The Account Settings features are still in development. If you wish to
        delete your account, please click the button below.
      </p>
      <p>
        <button
          onClick={() => props.deleteUser(props.auth, props.history)}
          className="btn red white-text waves-effect light-waves"
        >
          Delete Account
          <i className="material-icons white-text right">delete</i>
        </button>
      </p>
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(withRouter(AccountSettings));

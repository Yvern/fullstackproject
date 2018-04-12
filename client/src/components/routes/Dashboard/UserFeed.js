import React from 'react';

const UserFeed = props => {
  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card z-depth-0">
          <div className="card-content">
            <h5>{props.user ? props.user.name : ''}</h5>
            <p>{props.user ? props.user.email : ''}</p>
          </div>
          <div className="card-action">An action</div>
        </div>
      </div>
      <div className="col s12 m6">
        <div className="card z-depth-0">
          <div className="card-content">
            <h5>{props.user ? props.user.name : ''}</h5>
            <p>{props.user ? props.user.email : ''}</p>
          </div>
          <div className="card-action">An action</div>
        </div>
      </div>
    </div>
  );
};

export default UserFeed;

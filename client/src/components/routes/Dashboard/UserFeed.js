import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const UserFeed = props => {
  function calculateUpcomingEvents() {
    var pendingEvents = 0;

    props.events.forEach(event => {
      console.log('event', event);
      if (moment(event.eventDate) > moment()) {
        pendingEvents++;
      }
    });

    return pendingEvents;
  }

  function renderNotifications() {
    let notifications = [{ text: 'notif1' }];

    let notificationsDisplay = notifications.map((notification, i) => {
      return (
        <li className="collection-item" key={i}>
          {notification.text}
        </li>
      );
    });

    if (notificationsDisplay.length < 1) {
      return <li className="collection-item">No notifications to show!</li>;
    }

    return notificationsDisplay;
  }

  return (
    <div className="row user-feed-content">
      <div className="col s12 m6">
        <div className="card z-depth-0 user-feed-info-content">
          <div className="card-content">
            <h5>{props.user ? props.user.name : ''}</h5>
            <p>{props.user ? props.user.email : ''}</p>
            <p>{calculateUpcomingEvents()} Upcoming Events</p>
          </div>
          <div className="card-action grey lighten-4">
            <Link to={'/settings'} className="blue-text">
              Go to Settings<i className="material-icons right">
                arrow_forward
              </i>
            </Link>
          </div>
        </div>
      </div>
      <div className="col s12 m6">
        <ul className="collection with-header user-feed-notifications-content">
          <li className="collection-header">
            <h5>
              <i className="material-icons">notifications</i>Notifications
            </h5>
          </li>
          <div className="user-feed-notifications-wrapper">
            <div className="user-feed-notifications">
              {renderNotifications()}
              <li className="collection-item blue-text grey lighten-4 center-align">
                <p className="compact">Load older notifications</p>
                <i className="material-icons blue-text">expand_more</i>
              </li>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UserFeed;

import React, { Component } from 'react';
import moment from 'moment';
import M from 'materialize-css';

class EventInfoNotifications extends Component {
  componentDidMount() {
    var elem = document.querySelector('.collapsible');
    M.Collapsible.init(elem, {});
  }

  renderNotifications() {
    let notifications = [
      { ...this.props.event.attendanceReminder, type: 'REMINDER' },
      { ...this.props.event.confirmationReminder, type: 'CONFIRMATION' }
    ];
    console.log('reminders: ', notifications);

    function notificationStatusIcon(notification) {
      if (moment(notification.sendDate) < moment()) {
        return notification.sent
          ? { icon: 'check_circle', color: 'green-text' }
          : { icon: 'cancel', color: 'red-text' };
      } else {
        return { icon: '', color: 'grey-text' };
      }
    }

    function renderNotificationHeader(notification) {
      return [
        <div className="col s5" key="type">
          {notification.type === 'REMINDER' ? 'Reminder' : 'Confirmation'}
        </div>,
        <div className="col s5" key="date">
          <Calendar date={moment(notification.sendDate)} />
        </div>,
        <div className="col s2" key="sent-icon">
          <div className="icon-subset">
            <i className="material-icons blue-text text-darken-2 right">mail</i>
            <div className="sub-icon">
              <i
                className={
                  'material-icons ' + notificationStatusIcon(notification).color
                }
              >
                {notificationStatusIcon(notification).icon}
              </i>
            </div>
          </div>
        </div>
      ];
    }

    function renderNotificationBody(notification) {
      return (
        <div className="row compact">
          <div className="col s12 m6">
            {notification.sent ? <h6>Sent at: </h6> : <h6>Sending at: </h6>}{' '}
            {moment(notification.sendDate).format('DD/MM/YYYY hA')}
          </div>
          <div className="col s12 m6">
            <div className="right">
              <button className="btn-flat semi-compact">
                <i className="material-icons">edit</i>
              </button>
              <button className="btn-flat semi-compact">
                <i className="material-icons">send</i>
              </button>
              <button className="btn-flat semi-compact">
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (notifications.length > 0) {
      return notifications.map(notification => {
        if (notification.subscribed) {
          return (
            <li className="compact">
              <div className="collapsible-header">
                {renderNotificationHeader(notification)}
              </div>
              <div className="collapsible-body semi-compact-top">
                {renderNotificationBody(notification)}
              </div>
            </li>
          );
        } else {
          return null;
        }
      });
    } else {
      return <div className="grey-text">No notifications set up!</div>;
    }
  }

  render() {
    return (
      <div className="event-info-notification-settings">
        <h6 className="grey-text text-darken-3">
          <i className="material-icons">notifications</i>Notification Settings
        </h6>
        <ul className="collapsible">{this.renderNotifications()}</ul>
      </div>
    );
  }
}

const Calendar = ({ date }) => {
  return (
    <div className="grey-text text-darken-4">
      <h6>{date.format('DD MMM')}</h6>
    </div>
  );
};

export default EventInfoNotifications;

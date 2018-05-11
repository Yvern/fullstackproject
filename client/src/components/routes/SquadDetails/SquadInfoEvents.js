import React, { Component } from 'react';
import moment from 'moment';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { AttendanceInformation } from '../Dashboard/EventFeed';

/*
* A React Component that displays a list of events that belong to this specific
* squad.
*/
class SquadInfoEvents extends Component {
  componentDidMount() {
    var elem = document.querySelector('.collapsible');
    M.Collapsible.init(elem, {});
  }

  renderEvents() {
    let events = this.props.events;

    function emailStatusIcon(event) {
      if (event.recipients.length > 0) {
        return event.recipients[0].invited
          ? { icon: 'check_circle', color: 'green-text' }
          : { icon: 'cancel', color: 'red-text' };
      } else {
        return { icon: '', color: 'grey-text' };
      }
    }

    function renderEventHeader(event) {
      return [
        <div className="col s5" key="type">
          {event.title}
        </div>,
        <div className="col s5" key="date">
          <Calendar date={moment(event.eventDate)} />
        </div>,
        <div className="col s2" key="sent-icon">
          <div className="icon-subset">
            <i className="material-icons blue-text text-darken-2 right">mail</i>
            <div className="sub-icon">
              <i className={'material-icons ' + emailStatusIcon(event).color}>
                {emailStatusIcon(event).icon}
              </i>
            </div>
          </div>
        </div>
      ];
    }

    function renderEventBody(event) {
      let queryURL = '/events/details/?event=' + event._id;
      return (
        <div className="row compact" key="players">
          <div className="col s12 m5">Attendance:</div>
          <div className="col s12 m7">
            <AttendanceInformation event={event} />
          </div>
          <div className="col s12">
            <div style={{ borderTop: '1px solid lightgrey' }} />
            <Link to={queryURL} className="blue-text">
              Go to Details<i className="material-icons right">arrow_forward</i>
            </Link>
          </div>
        </div>
      );
    }

    return events.map(event => {
      return (
        <li className="compact">
          <div className="collapsible-header">{renderEventHeader(event)}</div>
          <div className="collapsible-body semi-compact-top">
            {renderEventBody(event)}
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="event-info-notification-settings">
        <h6 className="grey-text text-darken-3">
          <i className="material-icons">event</i>Upcoming Events
        </h6>
        <ul className="collapsible">{this.renderEvents()}</ul>
      </div>
    );
  }
}

/*
* A simple Calendar that displays the Event's date
*/
const Calendar = ({ date }) => {
  return (
    <div className="grey-text text-darken-4">
      <h6>{date.format('DD MMM')}</h6>
    </div>
  );
};

export default SquadInfoEvents;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import M from 'materialize-css';

/*
* A stateless functional component to render a given list of events
*/
const EventFeed = ({ events }) => {
  function renderEvents() {
    return events.map(event => {
      return <EventCard event={event} key={event._id} />;
    });
  }

  return (
    <div id="eventfeed">
      <h3 className="grey-text text-darken-4">
        Events<Link
          to="/events/new"
          className="btn right light-blue waves-effect waves-light"
        >
          New Event<i className="material-icons right">add</i>
        </Link>
      </h3>
      {renderEvents()}
    </div>
  );
};

/*
* React Component that handles the display of each individual event to the
* dashboard. It should receive an event object as props.
*/
class EventCard extends Component {
  componentDidMount() {
    //Initialise materializeCSS javascript functionality for tooltips
    var tooltips = document.querySelectorAll('.tooltipped');
    var instance = M.Tooltip.init(tooltips, { enterDelay: 500 });
  }

  render() {
    let date = moment(this.props.event.eventDate);
    let queryURL = '/events/details/?event=' + this.props.event._id;

    return (
      <div className="col s12 l6 xl4">
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col s9">
                <span className="card-title">{this.props.event.title}</span>
              </div>
              <div className="col s3">
                <EventCalendar date={date} />
              </div>
            </div>
            <div className="row">
              <AttendanceInformation event={this.props.event} />
            </div>
          </div>
          <div className="card-action grey lighten-4">
            <Link to={queryURL} className="blue-text">
              Go to Details<i className="material-icons right">arrow_forward</i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

/*
* Stateless functional component that handles the display of the date for the
* event.
*/
export const EventCalendar = ({ date }) => {
  return (
    <div className="right">
      <div className="event-card-calendar-wrapper">
        <div className="event-card-calendar-title">
          <p>{date.format('MMM')}</p>
        </div>
        <div className="event-card-calendar-text">
          <h4>{date.format('DD')}</h4>
        </div>
      </div>
    </div>
  );
};

/*
* Stateless functional component that handles the display of information
* about attendance to the event.
*/
export const AttendanceInformation = ({ event }) => {
  let confirmations = calculateConfirmations(event);
  let totalInvited = event.recipients.length;
  let minimumParticipants = event.minimumParticipants;
  let hasEnoughParticipants = confirmations >= minimumParticipants;
  let attendanceBadgeStyle = hasEnoughParticipants
    ? 'event-card-badge green white-text tooltipped'
    : 'event-card-badge grey-text tooltipped';
  let tooltip =
    confirmations +
    ' out of ' +
    event.minimumParticipants +
    ' have said they will be there!';

  return (
    <div>
      <i className="material-icons left">group</i>
      <div
        className={attendanceBadgeStyle}
        data-position="bottom"
        data-delay="500"
        data-tooltip={tooltip}
      >
        <i className="material-icons tiny">check_box</i>
        {' ' + confirmations + '/' + minimumParticipants}
      </div>
    </div>
  );
};

/********* Relevant functions *********/
/**
 * Function to calculate the total number of confirmations for an event
 * Parameters: event (object)
 * Returns: confirmations (numerical)
 */
const calculateConfirmations = event => {
  let confirmations = 0;
  event
    ? event.recipients.forEach(
        recip => (recip.attending ? confirmations++ : null)
      )
    : null;
  return confirmations;
};

export default EventFeed;

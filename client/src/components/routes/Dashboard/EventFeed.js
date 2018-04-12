import React from 'react';
import moment from 'moment';

/*
* A stateless functional component to render a given list of events
*/
const EventFeed = ({ events }) => {
  function renderEvents() {
    return events.map(event => {
      return <EventCard event={event} />;
    });
  }

  return (
    <div>
      <h3 className="grey-text text-darken-4">
        Events<button className="btn right light-blue waves-effect waves-light">
          New Event<i className="material-icons right">add</i>
        </button>
      </h3>
      {renderEvents()}
    </div>
  );
};

const EventCard = ({ event }) => {
  let date = moment(event.eventDate);

  return (
    <div className="col s12 l6">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <div className="col s8">
              <p>{event.title}</p>
            </div>
            <div className="col s4">
              <EventCalendar date={date} />
            </div>
          </div>
          <div className="card-action">
            <a href="#">
              Go to Details<i className="material-icons right">arrow_forward</i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCalendar = ({ date }) => {
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

export default EventFeed;

import React from 'react';

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
  return (
    <div className="card sticky-action small">
      <div className="card-content">
        <p>{event.title}</p>
      </div>
      <div className="card-action">
        <a href="#">Link</a>
      </div>
      <div className="card-reveal" />
    </div>
  );
};

export default EventFeed;

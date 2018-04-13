import React from 'react';
import { Link } from 'react-router-dom';

/*
* A stateless functional component that renders a list of squads onto the page
*/
const SquadFeed = ({ squads }) => {
  //Renders individual Squads for each Squad in the list
  function renderSquads() {
    return squads.map(squad => {
      return <SquadCard squad={squad} key={squad._id} />;
    });
  }

  return (
    <div id="squadfeed">
      <h3 className="grey-text text-darken-4">
        Squads<Link
          to="/squads/new"
          className="btn right light-blue waves-effect waves-light"
        >
          New Squad<i className="material-icons right">add</i>
        </Link>
      </h3>
      {renderSquads()}
    </div>
  );
};

/*
* Stateless functional component that renders a single squad.
*/
const SquadCard = ({ squad, events }) => {
  //calculate the number of upcoming events based on current system date
  let pendingEvents = [];
  if (events) {
    pendingEvents = events.filter(event => {
      return event.eventDate > new Date();
    });
  }
  return (
    <div className="col s12 m4 xl3">
      <div className="card sticky-action small">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            className="activator"
            alt="squad-picture"
            src={
              window.location.origin + '/images/football-sepia-small-rect.jpg'
            }
          />
        </div>
        <div className="card-content">
          <span className="card-title center activator grey-text text-darken-4">
            {squad.name}
          </span>
          {pendingEvents.length > 0 ? (
            <span
              className="new badge orange darken-2"
              data-badge-caption="events"
            >
              {pendingEvents.length}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="card-action grey lighten-4">
          <a href="#" className="blue-text">
            Go to Details<i className="material-icons right">arrow_forward</i>
          </a>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {squad.name}
            <i className="material-icons right">close</i>
          </span>
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SquadFeed;

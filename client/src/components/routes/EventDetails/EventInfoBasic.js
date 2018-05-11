import React from 'react';
import moment from 'moment';

/*
* A presentational component that displays basic information about an Event.
* This includes Date, Minimum Participants and Location.
*/
const EventInfoBasic = ({ event }) => {
  let formattedDate = moment(event.eventDate).format('ddd, D MMM YYYY, h:mm a');
  let location = event.location || 'No location given';
  return (
    <table>
      <tbody>
        <tr>
          <th className="grey-text text-darken-3">
            <h6>
              <i className="material-icons">insert_invitation</i> Date
            </h6>
          </th>
          <td>{formattedDate}</td>
        </tr>
        <tr>
          <th className="grey-text text-darken-3">
            <h6>
              <i className="material-icons">group</i> Minimum
            </h6>
          </th>
          <td>{event.minimumParticipants}</td>
        </tr>
        <tr>
          <th className="grey-text text-darken-3">
            <h6>
              <i className="material-icons">place</i> Location
            </h6>
          </th>
          <td>{location}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default EventInfoBasic;

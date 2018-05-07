import React from 'react';

const SquadInfoBasic = props => {
  return (
    <table>
      <tbody>
        <tr>
          <th className="grey-text text-darken-3">
            <h6>
              <i className="material-icons">group</i> Administrators
            </h6>
          </th>
          <td>{props.user ? props.user.name : ''}</td>
        </tr>
        <tr>
          <th className="grey-text text-darken-3">
            <h6>
              <i className="material-icons">event</i> Recurring Event Reminders
            </h6>
          </th>
          <td>Some event reminders</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SquadInfoBasic;

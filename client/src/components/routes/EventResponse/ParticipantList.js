import React from 'react';

const ParticipantList = ({ recipients, recipientEmail }) => {
  function renderList() {
    return recipients.map(recip => {
      let response = <i className="material-icons grey-text">help_outline</i>;
      let responseText = 'Not responded';
      if (recip.responded) {
        response = recip.attending ? (
          <i className="material-icons green-text">check</i>
        ) : (
          <i className="material-icons red-text">clear</i>
        );
        responseText = recip.attending ? 'Attending' : 'Cancelled';
      }
      let respondingRecipDecoration = '';
      if (recip.email === recipientEmail) {
        respondingRecipDecoration = 'light-blue lighten-5';
      }

      return (
        <tr className={respondingRecipDecoration}>
          <td>
            <h6>{recip.name || 'Guest'}</h6>
            <span className="grey-text text-darken-2">{recip.email}</span>
          </td>
          <td>
            {response} {responseText}
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="participant-table-wrapper">
      <table className="row table-compact z-depth-1">
        <thead className="grey lighten-4">
          <tr>
            <th>
              <h6>Participant</h6>
            </th>
            <th>
              <h6>Response</h6>
            </th>
          </tr>
        </thead>
        <tbody>{renderList()}</tbody>
      </table>
    </div>
  );
};

export default ParticipantList;

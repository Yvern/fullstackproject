const keys = require('../../config/keys');

/**
 * An email template generated based on the invite object given.
 * This email template is meant to send a reminder to the organiser.
 */
module.exports = invite => {
  return `
  <html>
  <body style=	"font-family: Helvetica, Arial, sans-serif;
      background-color: #ededed">
    <div style= "
      margin: 3em;
      padding: 2em;
      background-color: white;
      border: 1px solid lightgrey;
      border-radius: 4px;">
      <div>
      <a style="text-decoration: none" href="https://squadsquare-test.herokuapp.com/">
      <h2 style="color: dodgerblue;">SquadSquare</h2>
      </a>
      </div>

      <p>Hi ${
        invite.senderName
      }, we're just here to update you on the event you've hosted! </p>
    <p>So far, ${invite.confirmations} out of ${
    invite.invitations
  } people have said they will be going to your event at ${invite.date}. ${
    invite.text
  } </p>
      <p>View the details about your event:</p>
      <div>
        <a href="${keys.redirectDomain}events/details/?event=${
    invite.eventID
  }"/>
  <button style=	"background-color: dodgerblue;
          color: white;
          border: none;
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          padding: 0.5em 1em;
          border-radius: 3px;">
          View Event
  </button>
  </a>
      </div>
    </div>
  </body>
</html>
  `;
};

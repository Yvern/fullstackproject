const keys = require('../../config/keys');

/**
 * An email template generated based on the invite object given.
 * This email template is meant to send confirmations to invitees.
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

      <p>You let ${invite.senderName} know you can make it to their event ${
    invite.title
  }! </p>
    <p>${invite.text}</p>
      <p>View the details about the event:</p>
      <div>
        <a href="${keys.redirectDomain}events/response/?event=${
    invite.eventID
  }&recipient=${invite.email}"/>
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
    <div style="margin: 3em;
          padding: 2em;
          padding-top: 0;
          color: grey">
      <p>Create your own sports event at Squad Square:</p>
      <a href="https://squadsquare-test.herokuapp.com/">
      <button style=	"background-color: dimgrey;
              color: white;
              border: none;
              text-align: center;
              text-decoration: none;
              font-size: 16px;
              padding: 0.5em 1em;
              border-radius: 3px;">
              Go to Squad Square
              </button>
      </a>
    </div>
  </body>
</html>
  `;
};

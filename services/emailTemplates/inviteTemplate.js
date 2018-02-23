const keys = require('../../config/keys');

module.exports = invite => {
  return `
    <html>
      <body>
        <div style="text-align: center">
          <h3>I'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p>${invite.body}</p>
          <p>TESTING: "${keys.redirectDomain}/events/response/?event=${
    invite.eventID
  }&recipient=${invite.email}"</p>
          <div>
            <a href="${keys.redirectDomain}/events/recipients/response/?event=${
    invite.eventID
  }&recipient=${invite.email}"/>Go to the event!</a>
          </div>
        </div>
      </body>
    </html>
  `;
};

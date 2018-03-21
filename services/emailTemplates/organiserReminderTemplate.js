const keys = require('../../config/keys');

module.exports = invite => {
  return `
    <html>
      <body>
        <div style="text-align: center">
          <h3>Your event has X confirmations! We have sent out reminders.</h3>
          </div>
        </div>
      </body>
    </html>
  `;
};

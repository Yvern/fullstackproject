const keys = require('../../config/keys');

module.exports = invite => {
  return `
    <html>
      <body>
        <div style="text-align: center">
          <h3>Your event has enough confirmations!</h3>
          </div>
        </div>
      </body>
    </html>
  `;
};

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Event = mongoose.model('Event');

module.exports = app => {
  app.post('/api/events', requireLogin, (req, res) => {
    const { title, emailSubject, body, recipients } = req.body;

    const event = new Event({
      title,
      body,
      emailSubject,
      recipients: recipients.map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateCreated: Date.now()
    });
  });
};

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');
const uuidv4 = require('uuid/v4');
const mailSend = require('../services/mailSender');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

const Event = mongoose.model('Event');

module.exports = app => {
  //send email for event
  app.post('/api/mail/event/invite', requireLogin, async (req, res) => {
    console.log(req.body._id);
    try {
      let event = await Event.findById(req.body._id);
      //only invite recipients who haven't been invited before
      let filteredRecipients = [];
      filteredRecipients = event.recipients.filter(recip => {
        return !recip.invited;
      });

      let eventCopy = JSON.parse(JSON.stringify(event));

      eventCopy.recipients = filteredRecipients;

      console.log('reminderRecipients:', filteredRecipients);
      await mailSend(eventCopy, inviteTemplate);

      event.recipients.forEach(recip => (recip.invited = true));
      let savedEvent = await event.save();
      console.log(savedEvent);
      res.send(savedEvent);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

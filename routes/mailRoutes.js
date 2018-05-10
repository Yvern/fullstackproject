const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');
const mailSend = require('../services/mailSender');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

const Event = mongoose.model('Event');

/**
 * Exports all possible routes relating to emailing and connects them to the
 * Express app.
 */
module.exports = app => {
  /**
   * Api call to send invites to all users that have not previously been
   * invited already.
   */
  app.post('/api/mail/event/invite', requireLogin, async (req, res) => {
    try {
      let event = await Event.findById(req.body._id);
      //only invite recipients who haven't been invited before
      let filteredRecipients = [];
      filteredRecipients = event.recipients.filter(recip => {
        return !recip.invited;
      });

      //copy event object to safely filter recipients and email
      let eventCopy = JSON.parse(JSON.stringify(event));
      eventCopy.recipients = filteredRecipients;

      //send emails
      await mailSend(eventCopy, inviteTemplate, req.user);

      //set each recipient's 'invited' status to true
      event.recipients.forEach(recip => (recip.invited = true));
      let savedEvent = await event.save();

      //send back the saved event
      res.send(savedEvent);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

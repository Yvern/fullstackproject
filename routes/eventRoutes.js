const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');
const uuidv4 = require('uuid/v4');
const mailSend = require('../services/mailSender');

const Event = mongoose.model('Event');

const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

module.exports = app => {
  app.get('/api/events/recipient', (req, res) => {
    res.send('Thanks for replying!');
  });

  //Api call when recipients tries to access the event from the link in the email
  app.get('/api/events/event', async (req, res) => {
    let event = await Event.findById(req.query.event);
    res.send({ event: event, recipient: req.query.recipient });
    //res.redirect('/events/event');
  });

  app.post('/api/events/webhooks', (req, res) => {
    res.send({});
  });

  /*
   * Api call when recipients respond in browser
   */
  app.post('/api/events/respond', async (req, res) => {
    const { _id, recipient, response } = req.body;

    //find event in database
    let event = await Event.findById(_id);
    //ensure the most recent version of the recipient is loaded from database
    let loadRecipient = event.recipients.id(recipient._id);
    loadRecipient.responded = true;
    loadRecipient.attending = response;

    //find position of recipient to change response for and edit recipient
    for (let i = 0; i < event.recipients.length; i++) {
      if (event.recipients[i]._id === loadRecipient._id) {
        event.recipients[i] = loadRecipient;
      }
    }

    const savedEvent = await event.save();
    res.send(savedEvent);
  });

  app.get('/api/events', async (req, res) => {
    //console.log(req.user);
    if (req.user) {
      let events = await Event.find({ _user: req.user._id });
      console.log(events);
      res.send(events);
    } else {
      res.send(false);
    }
  });

  /*
   * Api call to create a new event
   */
  app.post('/api/events', requireLogin, async (req, res) => {
    const {
      title,
      squad,
      date,
      minimum,
      reminderattendance,
      reminderconfirmation,
      recipients
    } = req.body;

    console.log('REQUEST BODY: ', req.body);
    try {
      const newEvent = new Event({
        title,
        _squad: squad,
        subject: 'I want to invite you to an event!',
        body: 'Please let me know if you can make it:',
        date,
        recipients: recipients
          .split(',')
          .map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateCreated: Date.now(),
        eventDate: date,
        minimumParticipants: minimum,
        attendanceReminder: {
          subscribed: reminderattendance,
          sendDate: new Date('March 7, 2018 17:30:00')
        },
        confirmationReminder: {
          subscribed: reminderconfirmation,
          sendDate: new Date('March 7, 2018 17:30:00')
        }
      });

      let savedEvent = await newEvent.save();

      //await sgMail.send(emails);
      await mailSend(savedEvent, inviteTemplate);

      //update user account credits
      //req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

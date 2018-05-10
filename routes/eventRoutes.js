const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');
const mailSend = require('../services/mailSender');

const Event = mongoose.model('Event');

const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

/**
 * Exports all possible routes relating to events and connects them to the
 * Express app.
 */
module.exports = app => {
  /**
   * Api call when recipients try to respond via the link in the email
   */
  app.get('/api/events/event', async (req, res) => {
    try {
      let event = await Event.findById(req.query.event);
      res.send({ event: event, recipient: req.query.recipient });
    } catch (err) {
      console.log(
        'An error occured while a recipient tried to access an event.' + err
      );
      res.send({ event: false, recipient: false });
    }
  });

  /*
   * Api call when recipients respond in browser
   * Registers their response (yes or no) and saves it
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

  /**
   * Gets all events for the currently logged in user
   */
  app.get('/api/events', requireLogin, async (req, res) => {
    //console.log(req.user);
    if (req.user) {
      let events = await Event.find({ _user: req.user._id });
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
      reminderattendancedate,
      reminderconfirmation,
      reminderconfirmationdate,
      recipients
    } = req.body;

    try {
      //create event object from information given
      let eventInfo = {
        title,
        subject:
          "You've been invited to " + title + ' by ' + req.user.name + '!',
        body: 'Please let them know if you can make it:',
        date,
        _user: req.user.id,
        dateCreated: Date.now(),
        eventDate: date,
        minimumParticipants: minimum,
        attendanceReminder: {
          subscribed: reminderattendance,
          sendDate: reminderattendancedate
        },
        confirmationReminder: {
          subscribed: reminderconfirmation,
          sendDate: reminderconfirmationdate
        }
      };

      //if a squad is given, set squad ID
      if (squad) {
        eventInfo._squad = squad;
      }

      //if recipients are provided, add recipients
      if (recipients) {
        eventInfo.recipients = recipients
          .split(',')
          .map(email => ({ email: email.trim() }));
      }

      //Create the event according to the Mongoose Model
      const newEvent = new Event(eventInfo);

      //save the newly created event to the database
      let savedEvent = await newEvent.save();

      //send the saved event in the response
      res.send(savedEvent);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  /**
   * Api call to add a new recipient to an event.
   */
  app.post('/api/events/addrecipient', requireLogin, async (req, res) => {
    try {
      let event = await Event.findById(req.body.event._id);
      let recipient = {
        email: req.body.recipient.email.trim(),
        name: req.body.recipient.name
      };

      //add new recipient to list
      event.recipients.push(recipient);

      //save the edited event
      let savedEvent = await event.save();

      res.send(savedEvent);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

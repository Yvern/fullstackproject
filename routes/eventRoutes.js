const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const RecipientMailer = require('../services/RecipientMailer');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');
const uuidv4 = require('uuid/v4');
const mailSend = require('../services/newMailer');

const Event = mongoose.model('Event');

const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

module.exports = app => {
  app.get('/api/events/recipient', (req, res) => {
    res.send('Thanks for replying!');
  });

  //Api call when recipients tries to access the event from the link in the email
  app.get('/api/events/response', async (req, res) => {
    let event = await Event.findOne({ eventID: req.query.event });
    console.log(event);
    res.send({ event: event, recipient: req.query.recipient });
    //res.redirect('/events/event');
  });

  app.post('/api/events/webhooks', (req, res) => {
    console.log(req.body);
    res.send({});
  });

  app.post('/api/events/respond', async (req, res) => {
    const { eventID, recipient, response } = req.body;

    //find event in database
    let event = await Event.findOne({ eventID: eventID });
    let loadRecipient = event.recipients.id(recipient._id);
    loadRecipient.responded = true;
    loadRecipient.attending = response;

    for (let i = 0; i < event.recipients.length; i++) {
      if (event.recipients[i]._id === loadRecipient._id) {
        event.recipients[i] = loadRecipient;
      }
    }

    const savedEvent = await event.save();
    console.log(savedEvent);
    res.send(savedEvent);
  });

  app.post('/api/events', requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    //TODO remove debugging step
    emails = [
      {
        to: 'rosehissink@gmail.com',
        from: 'no-reply@squadsquare.com',
        subject: 'IMPORTANT TEST',
        text: 'Some text here',
        html: '<p>Some other text in html</p>'
      }
    ];
    //TODO end of debugging steps

    try {
      //create a valid unique id for the event
      const eventID = await findValidID();
      console.log(eventID);
      //if a valid id is found, save the event to database
      if (eventID) {
        const newEvent = new Event({
          eventID,
          title,
          subject,
          body,
          recipients: recipients
            .split(',')
            .map(email => ({ email: email.trim() })),
          _user: req.user.id,
          dateCreated: Date.now()
        });

        await newEvent.save();

        //await sgMail.send(emails);
        await mailSend(newEvent, inviteTemplate);

        //update user account credits
        //req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
      } else {
        //throw an error if no valid ID could be created
        console.log('Valid ID creation error for new Event.');
        throw 'Something went wrong when trying to create the event. Please try again.';
      }
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

async function findValidID() {
  //try to generate a unique ID for maxIterations, otherwise return null
  const maxIterations = 5;
  for (i = 0; i < maxIterations; i++) {
    id = uuidv4();
    let event = await Event.findOne({ eventID: id });
    if (!event) {
      return id;
    }
  }
  //if generation was unsuccessful, return null
  return null;
}

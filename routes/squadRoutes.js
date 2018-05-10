const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');
const mailSend = require('../services/mailSender');

const Squad = mongoose.model('Squad');
const User = mongoose.model('User');
const Event = mongoose.model('Event');

const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
sgMail.setApiKey(keys.sendGridKey);

/**
 * Exports all possible routes relating to squads and connects them to the
 * Express app.
 */
module.exports = app => {
  /**
   * Api call to create a new Squad from given details
   */
  app.post('/api/squads', requireLogin, async (req, res) => {
    const { name, members } = req.body;

    try {
      //create new squad object
      const newSquad = new Squad({
        name: name,
        _user: req.user.id,
        members: []
      });

      //save squad to database
      let savedSquad = await newSquad.save();

      //send back newly saved squad
      res.send(savedSquad);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  /**
   * Get all squads for a logged in user
   */
  app.get('/api/squads', async (req, res) => {
    //console.log(req.user);
    if (req.user) {
      let squads = await Squad.find({ _user: req.user._id });
      res.send(squads);
    } else {
      res.send(false);
    }
  });

  /**
   * Api call to get details about a specific squad and its related user and events
   */
  app.get('/api/squads/squad/', async (req, res) => {
    let squad = await Squad.findById(req.query.squad);
    let user = await User.findById(squad._user);
    let events = await Event.find({ _squad: squad._id });
    res.send({ squad, user, events });
  });

  /**
   * Api call to add a new member to an existing Squad
   */
  app.post('/api/squads/addmember', requireLogin, async (req, res) => {
    try {
      //find squad from database
      let squad = await Squad.findById(req.body.squad._id);
      //create member object
      let member = {
        email: req.body.member.email.trim(),
        name: req.body.member.name
      };

      //add new member to list
      squad.members.push(member);

      //save squad and return squad and event details
      let savedSquad = await squad.save();
      let user = await User.findById(savedSquad._user);
      let events = await Event.find({ _squad: savedSquad._id });
      res.send({ squad: savedSquad, user, events });
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

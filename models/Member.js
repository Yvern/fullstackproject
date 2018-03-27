const mongoose = require('mongoose');
const { Schema } = mongoose;

//Member schema, optionally links to a user
const memberSchema = new Schema({
  email: String,
  name: String,
  _user: String,
  responded: { type: Boolean, default: false },
  attending: { type: Boolean, default: false },
  gamesPlayed: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  gamesLost: { type: Number, default: 0 }
});

module.exports = memberSchema;

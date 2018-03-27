const mongoose = require('mongoose');
const { Schema } = mongoose;
const MemberSchema = require('./Member');
const ReminderSchema = require('./Reminder');

/**
 * Squad Schema
 */
const squadSchema = new Schema({
  name: String,
  members: [MemberSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: Date,
  regularEvents: [ReminderSchema],
  gamesOrganised: { type: Number, default: 0 }
});

mongoose.model('Squad', squadSchema);

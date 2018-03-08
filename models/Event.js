const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');
const ReminderSchema = require('./Reminder');

/**
 * Event Schema
 * @TODO: Change location field to contain an object with lat and lng
 * @TODO: Change squad to Schema.Types.ObjectId, ref: 'Squad'
 */
const eventSchema = new Schema({
  title: String,
  _squad: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: Date,
  eventDate: Date,
  location: String,
  minimumParticipants: { type: Number, default: 0 },
  maximumParticpants: { type: Number, default: 100 },
  attendanceReminder: ReminderSchema,
  confirmationReminder: ReminderSchema
});

mongoose.model('Event', eventSchema);

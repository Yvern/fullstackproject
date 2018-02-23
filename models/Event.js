const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const eventSchema = new Schema({
  eventID: String,
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: Date
});

mongoose.model('Event', eventSchema);

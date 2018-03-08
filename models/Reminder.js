const mongoose = require('mongoose');
const { Schema } = mongoose;

const reminderSchema = new Schema({
  subscribed: { type: Boolean, default: true },
  sendDate: Date,
  sent: { type: Boolean, default: false }
});

module.exports = reminderSchema;

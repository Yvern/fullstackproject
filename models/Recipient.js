const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  invited: { type: Boolean, default: false },
  responded: { type: Boolean, default: false },
  attending: { type: Boolean, default: false }
});

module.exports = recipientSchema;

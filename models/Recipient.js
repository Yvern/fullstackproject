const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  id: String,
  email: String,
  responded: { type: Boolean, default: false },
  attending: { type: Boolean, default: false }
});

module.exports = recipientSchema;

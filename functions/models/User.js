const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: moment.utc(),
  },

  lastSession: {
    type: Date,
    default: moment.utc(),
  },

  agreedTo: {
    type: Array,
    default: []
  }
});

module.exports = User = mongoose.model('user', UserSchema);
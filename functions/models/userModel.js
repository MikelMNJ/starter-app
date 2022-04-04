const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
  },
);

module.exports = User = mongoose.model('user', UserSchema);
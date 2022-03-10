const mongoose = require('mongoose');

require('dotenv').config();
const { REACT_APP_MONGO_URI: db } = process.env;

const options = {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, options);
    console.log('MongoDB connected.');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  };
};

module.exports = connectDB;
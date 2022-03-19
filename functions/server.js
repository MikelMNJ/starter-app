const connectDB = require('./connectDB/db');
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

const { REACT_APP_API_V1: v1 } = process.env;

app.set('trust proxy', 1);

// Connect database
connectDB();

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Define routes
app.use(`${v1}sample`, require('./routes/sampleRoutes'));
app.use(`${v1}auth`, require('./routes/authRoutes'));

module.exports.handler = serverless(app);
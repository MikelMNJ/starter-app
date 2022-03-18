const connectDB = require('./connectDB/db');
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();
const basePath = '/.netlify/functions/server';

app.set('trust proxy', 1);

// Connect database
connectDB();

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Define routes
app.use(`${basePath}/sample`, require('./routes/sampleRoutes'));
app.use(`${basePath}/auth`, require('./routes/auth'));

module.exports.handler = serverless(app);
const connectDB = require('./connectDB/db');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const basePath = '/.netlify/functions/server';

// Connect database
connectDB();

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes
app.use(`${basePath}/sample`, require('./routes/sampleRoutes'));
app.use(`${basePath}/auth`, require('./routes/auth'));

module.exports.handler = serverless(app);
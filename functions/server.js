const connectDB = require('./connectDB/db');
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const basePath = '/.netlify/functions/server';

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use(`${basePath}/test`, require('./routes/test'));
// app.use(`${basePath}/auth`, require('./routes/auth'));

module.exports.handler = serverless(app);
const express = require('express');
const path = require('path');
require('dotenv').config();

// use session - put in first before any router can use sesson
const session = require('express-session');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// call session middleware
app.use(session({
    secret: 'secretkey',
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
        maxAge: 1000*60*30 // half an hour
    }
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const authRouter = require('/');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;

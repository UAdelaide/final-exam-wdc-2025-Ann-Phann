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
const authRouter = require('./routes/authRoutes');
const myDogRouter = require('./routes/myDogRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRouter);
app.use('/dog', myDogRouter);

// Route protection middleware
function requireLogin(role) {
  return (req, res, next) => {
    if (!req.session.user) return res.redirect('/');
    if (role && req.session.user.role !== role) return res.status(403).send('Forbidden');
    next();
  };
}

// Protect owner dashboard
app.get('/owner-dashboard.html', requireLogin('owner'), (req, res) => {
  res.sendFile(path.join(__dirname, '../public/owner-dashboard.html'));
});

// Protect walker dashboard
app.get('/walker-dashboard.html', requireLogin('walker'), (req, res) => {
  res.sendFile(path.join(__dirname, '../public/walker-dashboard.html'));
});



// Export the app instead of listening here
module.exports = app;

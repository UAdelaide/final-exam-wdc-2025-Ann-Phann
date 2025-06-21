const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // input validation
    if (!username || !password) {
        return res.status(400).json({error: 'Username and Password are required.'});
    }

    try {
        // query the database to find the user
        const [users] = await db.query(`
            SELECT user_id, username, role FROM Users WHERE username = ? AND password_hash = ?
        `, [username, password]
        );

        if (users.length === 0) {
            return res.status(400).json({error: 'Invalid Username or Password.'});
        }

        // if exist
        const user = users[0];
        req.session.user = {
            id: user.user_id,
            username: user.username,
            role: user.role
        };
        res.status(200).json({
            message: 'Login successfully',
            loggedIn: true,
            user: req.session.user
        });

    } catch (error) {
        console.error('error during login: ', error);
        return res.status(400).json({error: 'cannot login'});
    }
});

router.get('/checkLogin', (req, res) => {
    console.log('Session:', req.session);
    // if login --> return its session data
    if (req.session.user) {
        res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        // if not login
        res.status(200).json({ loggedIn: false });
    }

});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    // clear the session cookie
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out' });
  });
});
module.exports = router;


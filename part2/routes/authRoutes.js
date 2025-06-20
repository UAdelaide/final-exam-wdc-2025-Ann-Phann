const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/login', async (req, res) => {
    const {username, password} = req.body;

    // input validation
    if (!username || !password) {
        return res.status(400).json({error: 'Username and Password are required.'})
    }

    try {
        // query the database to find the user
        const [users] = db.query()

    } catch (error) {

    }
});
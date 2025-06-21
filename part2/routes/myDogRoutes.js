const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/myDog', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    const ownerId = req.session.user.id;


    const [dogList] = db.query(`
        SELECT dog_id, name FROM Dogs WHERE owner_id = ?
    `, [ownerId]);
});
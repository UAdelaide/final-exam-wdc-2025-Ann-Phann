const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/myDog', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    const ownerId = req.session.user.id;

    try {
        const [dogs] = await db.query('SELECT dog_id, name FROM Dogs WHERE owner_id = ?', [ownerId]);
        res.status(200).json(dogs);
    } catch (err) {
        console.error('Error fetching dogs:', err);
        res.status(500).json({ error: 'Failed to retrieve dog list' });
    }
    });

module.exports = router;

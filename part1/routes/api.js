const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/api/dogs', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT
                d.name AS dog_name,
                d.size,
                u.username AS owner_username
            FROM
                Dogs d
            JOIN
                Users u ON d.owner_id = u.user_id;
        `);
        sendSingleLineJson(res, rows);
    } catch (error) {
        console.error('Error fetching dogs:', error);
        res.status(500).json({ error: 'Failed to retrieve dogs.' });
    }
});
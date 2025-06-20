const express = require('express');
const db = require('../db');
const router = express.Router();

// 1. /api/dogs
router.get('/api/dogs', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                d.name AS dog_name,
                d.size,
                u.username AS owner_username
            FROM
                Dogs d
            INNER JOIN
                Users u ON d.owner_id = u.user_id;
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching dogs:', error);
        res.status(500).json({ error: 'Failed to retrieve dogs.' });
    }
});

router.get('/api/walkrequests/open', async(req,res) => {
    try {
        const [rows] = await db.query(`
            SELECT wr.request_id, d.name AS dog_name,
                    wr.requested_time, wr.duration_minutes,
                    wr.location, u.username
        `);
    } catch (error) {
        console.error('Error in fetching walkrequest open: ', error);
        res.status(500).json({error: 'Falied to fetch walk request open.'});
    }
});

/**
[
  {
    "request_id": 1,
    "dog_name": "Max",
    "requested_time": "2025-06-10T08:00:00.000Z",
    "duration_minutes": 30,
    "location": "Parklands",
    "owner_username": "alice123"
  }
]
 */

module.exports = router;

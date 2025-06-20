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
            FROM WalkRequests wr
            INNER JOIN Dogs d ON wr.dog_id = d.dog_id
            INNER JOIN Users u ON d.owner_id = u.user_id
            WHERE wr.status = 'open'
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error in fetching walkrequest open: ', error);
        res.status(500).json({error: 'Falied to fetch walk request open.'});
    }
});
// Route 3: /api/walkers/summary
router.get('/api/walkers/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT
            u.username AS walker_username,
            COALESCE(tr.total_ratings, 0) AS total_ratings,
            ROUND(COALESCE(tr.average_rating, NULL), 1) AS average_rating,
            COALESCE(cw.completed_walks, 0) AS completed_walks
        FROM
            Users u
        LEFT JOIN (
            SELECT
                wa.walker_id,
                COUNT(DISTINCT wr.request_id) AS completed_walks
            FROM
                WalkApplications wa
            JOIN
                WalkRequests wr ON wa.request_id = wr.request_id
            WHERE
                wr.status = 'completed' AND wa.status = 'accepted'
            GROUP BY
                wa.walker_id
        ) AS cw ON u.user_id = cw.walker_id
        LEFT JOIN (
            SELECT
                wrates.walker_id,
                COUNT(wrates.rating_id) AS total_ratings,
                AVG(wrates.rating) AS average_rating
            FROM
                WalkRatings wrates
            GROUP BY
                wrates.walker_id
        ) AS tr ON u.user_id = tr.walker_id
        WHERE
            u.role = 'walker'
        ORDER BY
            u.username;
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching walker summary:', err);
    res.status(500).json({ error: 'Failed to retrieve walker summary.' });
  }
});


/**
[
  {
    "walker_username": "bobwalker",
    "total_ratings": 2,
    "average_rating": 4.5,
    "completed_walks": 2
  },
  {
    "walker_username": "newwalker",
    "total_ratings": 0,
    "average_rating": null,
    "completed_walks": 0
  }
]
 */

module.exports = router;

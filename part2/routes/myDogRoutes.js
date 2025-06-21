const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/myDog', async (req, res) => {
    const [dogList] = db.query(`
        SELECT dog_id, name FROM Dogs 
    `)
});
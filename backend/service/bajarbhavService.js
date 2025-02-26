const express = require('express');
const db = require("../db");

const app = express();
const lodash = require('lodash');

// 3. Read a single user by ID
app.get('/getTable/:marketType/:slug', (req, res) => {
  const { marketType, slug } = req.params;

  const sql = `
    SELECT * FROM ${marketType} 
    WHERE slug = ? 
    ORDER BY date DESC 
    LIMIT 1
  `;

  db.query(sql, [slug], (err, result) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data.');
    }
    if (result.length === 0) {
      return res.status(404).send('No data found.');
    }
    res.status(200).json(result[0]);
  });
});


module.exports = app;
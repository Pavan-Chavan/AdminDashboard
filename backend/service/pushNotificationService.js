const express = require('express');
require('dotenv').config();
const db = require("../db");
const { isEmpty } = require('lodash');
const app = express();

app.post('/subscribe', async (req, res) => {
	const { subscription, user_id = null } = req.body;

	const query = 'INSERT INTO subscriptions (endpoint, endpoint_key, user_id) VALUES (?, ?, ?)';
	const values = [
		subscription.endpoint,
		JSON.stringify(subscription.keys),
		user_id, // User ID
	];

	db.query(query, values, (err, results) => {
		if (err) {
			if (err.code === 'ER_DUP_ENTRY') {
				return res.status(200).json({ message: 'आधीच सदस्यता घेतली आहे' });
			} else {
				console.error('Subscription error:', err);
				return res.status(500).json({ error: 'सदस्यता अयशस्वी! कृपया पुन्हा प्रयत्न करा.' });
			}
		}
		res.status(201).json({ message: 'सदस्यता जतन केली गेली आहे' });
	});
});


module.exports = app;
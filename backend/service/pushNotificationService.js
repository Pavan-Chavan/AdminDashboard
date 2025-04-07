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

app.post('/unsubscribe', (req, res) => {
	const { endpoint } = req.body;
	const query = 'DELETE FROM subscriptions WHERE endpoint = ?';
	db.query(query, [endpoint], (err, results) => {
		if (err) {
			console.error('Unsubscription error:', err);
			return res.status(500).json({ error: 'Unsubscription failed! Please try again.' });
		}
		res.status(200).json({ message: 'Unsubscribed successfully' });
	});
});

app.get('/notifications', async (req, res) => {
	const { page = 1, limit = 10 } = req.query;

	const offset = (page - 1) * limit;

	const countQuery = 'SELECT COUNT(*) AS totalRecords FROM notifications';
	const dataQuery = 'SELECT * FROM notifications ORDER BY created_at DESC LIMIT ? OFFSET ?';

	try {
		// Get total records
		const totalRecordsResult = await new Promise((resolve, reject) => {
			db.query(countQuery, (err, results) => {
				if (err) return reject(err);
				resolve(results[0].totalRecords);
			});
		});

		// Get paginated data
		const results = await new Promise((resolve, reject) => {
			db.query(dataQuery, [parseInt(limit), parseInt(offset)], (err, results) => {
				if (err) return reject(err);
				resolve(results);
			});
		});

		const totalPages = Math.ceil(totalRecordsResult / limit);

		res.status(200).json({
			success: true,
			results,
			pagination: {
				currentPage: parseInt(page),
				limit: parseInt(limit),
				totalPages,
				totalRecords: totalRecordsResult,
			},
		});
	} catch (error) {
		console.error('Error fetching notifications:', error);
		res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
	}
});

module.exports = app;
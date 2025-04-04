// Assuming this file is something like pushNotification.js
const db = require("../db");
const webPush = require('web-push');
const { isEmpty } = require('lodash');
const { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;

// Configure VAPID keys (must be called before sending notifications)
webPush.setVapidDetails(
  'mailto:jiokheti.com', // Replace with your contact email
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

const pushNotification = async (data, ws) => {
  try {
		const { title, description } = data;

		// Fetch subscriptions using db.query method
		db.query('SELECT * FROM subscriptions', async (err, results) => {
			if (err) {
			console.error('Error fetching subscriptions:', err);
			ws.send(JSON.stringify({
				status: 'error',
				message: 'Error fetching subscriptions'
			}));
			return;
			}

			const subscriptions = results;

			if (isEmpty(subscriptions)) {
			ws.send(JSON.stringify({
				status: 'error',
				message: 'No subscriptions found'
			}));
			return;
			}

			const payload = JSON.stringify({ title, description });
			let totalSent = 0;
			let totalFailed = 0;
			const totalSubscriptions = subscriptions.length;

			// Initial progress update
			ws.send(JSON.stringify({
			status: 'progress',
			TotalSubscriptions: totalSubscriptions,
			TotalSent: totalSent,
			TotalFailed: totalFailed,
			TotalPending: totalSubscriptions,
			TotalSuccess: totalSent,
			message: 'Starting to send notifications...'
			}));

			// Send notifications to all subscriptions
			const sendPromises = subscriptions.map(async (sub) => {
			try {
				await webPush.sendNotification(
				{
					endpoint: sub.endpoint,
					keys: JSON.parse(sub.endpoint_key),
				},
				payload
				);
				totalSent++;
			} catch (err) {
				totalFailed++;
				console.error('Failed to send to', sub.endpoint, err);
			}

			// Send progress update after each attempt
			ws.send(JSON.stringify({
				status: 'progress',
				TotalSubscriptions: totalSubscriptions,
				TotalSent: totalSent,
				TotalFailed: totalFailed,
				TotalPending: totalSubscriptions - (totalSent + totalFailed),
				TotalSuccess: totalSent,
				message: 'Sending notifications in progress...'
			}));
			});

			await Promise.all(sendPromises);

			// Final success update
			ws.send(JSON.stringify({
			status: 'success',
			TotalSubscriptions: totalSubscriptions,
			TotalSent: totalSent,
			TotalFailed: totalFailed,
			TotalPending: 0,
			TotalSuccess: totalSent,
			message: 'Notifications sent successfully'
			}));
		});
  } catch (error) {
    console.error('Unexpected error during push notification:', error);
    ws.send(JSON.stringify({
      status: 'error',
      message: `Unexpected error during pushing notification: ${error.message}`
    }));
  }
};

module.exports = pushNotification;
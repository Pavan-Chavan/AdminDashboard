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
		const {
			title,
			description,
			badge = "https://jiokheti.com/favicon.ico",
			vibrate = [200, 100, 200],
			requireInteraction = true,
			tag = "general",
			renotify = false,
			image = "",
			url = "https://jiokheti.com",
			icon = "https://jiokheti.com/favicon.ico",
		} = data;
		// Fetch subscriptions using db.query method
		// Insert notification data into the notifications table
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

			const payload = JSON.stringify({
				title,
				description,
				badge,
				vibrate,
				requireInteraction,
				tag,
				renotify,
				image,
				url,
				icon,
			});

			let totalSent = 0;
			let totalFailed = 0;
			const totalSubscriptions = subscriptions.length;
			let notificationId = null;
			db.query(
				`INSERT INTO notifications (
					title, 
					description, 
					badge, 
					vibrate, 
					requireInteraction, 
					tag, 
					renotify, 
					image, 
					url, 
					icon
				) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					title,
					description,
					badge,
					JSON.stringify(vibrate),
					requireInteraction,
					tag,
					renotify,
					image,
					url,
					icon
				],
				(err, result) => {
					if (err) {
						console.error('Error inserting notification into database:', err);
						ws.send(JSON.stringify({
							status: 'error',
							message: 'Error inserting notification into database'
						}));
						throw err;
					}
					notificationId = result.insertId;
					console.log('Notification inserted into database with ID:', result.insertId);
				}
			);

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
				
				db.query(
					`UPDATE notifications 
					 SET 
						TotalSubscriptions = ?, 
						TotalSent = ?, 
						TotalFailed = ?, 
						TotalPending = ?, 
						TotalSuccess = ? 
					 WHERE id = ?`,
					[
						totalSubscriptions,
						totalSent,
						totalFailed,
						totalSubscriptions - (totalSent + totalFailed), // TotalPending
						totalSent, // TotalSuccess
						notificationId
					],
					(err, result) => {
						if (err) {
							console.error('Error updating notification in database:', err);
							ws.send(JSON.stringify({
								status: 'error',
								message: 'Error updating notification in database'
							}));
							throw err;
						}
					}
				);

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
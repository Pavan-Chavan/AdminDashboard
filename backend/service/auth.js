const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db'); // Assuming db is a MySQL connection with callback-based query method
const app = express();

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'test';

// Signup endpoint
app.post('/signup', async (req, res) => {
    try {
        const { name, number, state, district, taluka, address, photo, password } = req.body;

        // Validate required fields
        if (!name || !number || !password) {
            return res.status(400).json({ error: 'Name, number, and password are required' });
        }

        // Check if number already exists
        db.query('SELECT * FROM users WHERE number = ?', [number], async (err, existingUser) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Signup failed. Please try again.' });
            }

            if (existingUser.length > 0) {
                return res.status(400).json({ error: 'यह नंबर पहले से मौजूद है' });
            }

            // Hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert user into database
            db.query(
                'INSERT INTO users (name, number, state, district, taluka, address, photo, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [name, number, state || null, district || null, taluka || null, address || null, photo || null, hashedPassword],
                (err, result) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ error: 'Signup failed. Please try again.' });
                    }

                    // Generate JWT
                    const token = jwt.sign({ id: result.insertId, number }, JWT_SECRET, { expiresIn: '1h' });

                    try {
                      const decoded = jwt.verify(token, JWT_SECRET);
                      console.log('Decoded:', decoded);
                    } catch (error) {
                      console.error('Verification failed:', error);
                    }
                    res.status(201).json({ token });
                }
            );
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Signup failed. Please try again.' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { number, password } = req.body;

        // Validate input
        if (!number || !password) {
            return res.status(400).json({ error: 'नंबर और पासवर्ड आवश्यक हैं' });
        }

        // Find user
        db.query('SELECT * FROM users WHERE number = ?', [number], async (err, users) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'लॉगिन विफल रहा। कृपया पुनः प्रयास करें।' });
            }

            if (users.length === 0) {
                return res.status(401).json({ error: 'अमान्य नंबर या पासवर्ड' });
            }

            const user = users[0];

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'अमान्य नंबर या पासवर्ड' });
            }

            // Generate JWT
            const token = jwt.sign({ userId: user.id, number: user.number }, JWT_SECRET);

            res.json({ token });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'लॉगिन विफल रहा। कृपया पुनः प्रयास करें।' });
    }
});

module.exports = app;
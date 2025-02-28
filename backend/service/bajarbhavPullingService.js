const express = require('express');
require('dotenv').config();
const db = require("../db");
const marketTypesDetails = require('../constant/marketTypesData');
const app = express();

app.get('/get-sections', (req, res) => {
	res.status(200).json(marketTypesDetails);
});

app.post('/insert-market-data', async (req, res) => {
    const { tableName, table_data, code, last_update, slug } = req.body;
    
    try {

		const today = new Date();
		const formattedDate = today.toISOString().split('T')[0];
        
        // Check if record exists
        const checkQuery = `SELECT * FROM ${tableName} WHERE code = ? AND DATE(date) = ?`;
        db.query(checkQuery, [code, formattedDate], (err, results) => {
            if (err) {
                console.error('Error checking record:', err);
                return res.status(500).json({ 
                    status: 'error', 
                    message: 'Error while checking record' 
                });
            }

            if (results.length === 0) {
                // Insert new record
                const insertQuery = `INSERT INTO ${tableName} (table_data, date, code, last_update, slug) VALUES (?, ?, ?, ?, ?)`;
                db.query(insertQuery, [table_data, formattedDate, code, today, slug], (err, result) => {
                    if (err) {
                        console.error('Insert error:', err);
                        return res.status(500).json({ 
                            status: 'error', 
                            message: 'Error while inserting data' 
                        });
                    }
                    res.json({ 
                        status: 'insert', 
                        message: 'Data inserted successfully',
                        insertId: result.insertId 
                    });
                });
            } else {
                // Update existing record
                const updateQuery = `UPDATE ${tableName} SET table_data = ?, last_update = ? WHERE code = ? AND DATE(date) = ?`;
                db.query(updateQuery, [table_data, today, code, formattedDate], (err, result) => {
                    if (err) {
                        console.error('Update error:', err);
                        return res.status(500).json({ 
                            status: 'error', 
                            message: 'Error while updating data' 
                        });
                    }
                    res.json({ 
                        status: 'update', 
                        message: 'Data updated successfully' 
                    });
                });
            }
        });
    } catch (error) {
        console.error('Endpoint error:', error);
        res.status(500).json({ 
            status: 'error', 
            message: 'Server error during data processing' 
        });
    }
});

module.exports = app;
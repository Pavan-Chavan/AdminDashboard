const express = require('express');
require('dotenv').config();
const db = require("../db");
const { isEmpty } = require('lodash');
const { whatsappGroups } = require('../constant/whatsAppGroupDistrictWise');
const app = express();

const validDistricts = [
    'अहिल्यानगर', 'अकोला', 'अमरावती', 'छ. संभाजीनगर', 'बीड', 'भंडारा', 'बुलढाणा', 'चंद्रपूर', 
    'धुळे', 'गडचिरोली', 'गोंदिया', 'हिंगोली', 'जळगाव', 'जालना', 'कोल्हापूर', 'लातूर', 
    'मुंबई शहर', 'मुंबई उपनगर', 'नागपूर', 'नांदेड', 'नंदुरबार', 'नाशिक', 'धाराशिव', 
    'पालघर', 'परभणी', 'पुणे', 'रायगड', 'रत्नागिरी', 'सांगली', 'सातारा', 'सिंधुदुर्ग', 
    'सोलापूर', 'ठाणे', 'वर्धा', 'वाशिम', 'यवतमाळ'
];

app.post('/whatsapp-user-register', (req, res) => {
    const { name, district, mobile } = req.body;
  
    // Validate input
    if (!name || !district || !mobile) {
      return res.status(400).json({
        status: 'error',
        message: 'कृपया सर्व आवश्यक माहिती प्रदान करा (नाव, जिल्हा, मोबाइल नंबर)'
      });
    }
  
    if (!validDistricts.includes(district)) {
      return res.status(400).json({
        status: 'error',
        message: 'अवैध जिल्हा नाव. कृपया वैध महाराष्ट्रातील जिल्हा निवडा'
      });
    }
  
    // Check if mobile number exists
    const selectSql = 'SELECT group_link FROM whatsapp_users_data WHERE mobile = ?';
    db.query(selectSql, [mobile], (err, results) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'डेटाबेस त्रुटी: ' + err.message
        });
      }
  
      if (results.length > 0) {
        // User already exists
        return res.json({
          status: 'existing',
          message: 'आपण आधीच व्हॉट्सॲप ग्रुपमध्ये जोडले आहात',
          groupLink: results[0].group_link
        });
      }
  
      // New user, insert into database
      const groupLink = whatsappGroups[district];
      const insertSql = 'INSERT INTO whatsapp_users_data (name, district, mobile, group_link) VALUES (?, ?, ?, ?)';
      db.query(insertSql, [name, district, mobile, groupLink], (err, result) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: 'डेटाबेस त्रुटी: ' + err.message
          });
        }
  
        res.json({
          status: 'success',
          message: 'आपले स्वागत आहे! आपण यशस्वीरित्या व्हॉट्सॲप ग्रुपमध्ये जोडले गेले आहात',
          groupLink
        });
      });
    });
  });

  app.get('/user-info/:userId', (req, res) => {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'कृपया वैध उपयोगकर्ता आईडी प्रदान करें'
      });
    }

    // Fetch user information from the database
    const selectSql = 'SELECT * FROM users WHERE id = ?';
    db.query(selectSql, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'डेटाबेस त्रुटि: ' + err.message
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'उपयोगकर्ता नहीं मिला'
        });
      }

      res.json({
        status: 'success',
        data: results[0]
      });
    });
  });

  app.put('/update-user-info/:userId', (req, res) => {
    const { userId } = req.params;
    const { name, state, district, taluka, number, address, photo } = req.body;

    // Validate input
    if (!userId || !name || !state || !district || !taluka || !number || !address) {
      return res.status(400).json({
        status: 'error',
        message: 'कृपया सर्व आवश्यक माहिती प्रदान करा (नाव, राज्य, जिल्हा, तालुका, नंबर, पत्ता, फोटो)'
      });
    }

    // Update user information in the database
    const updateSql = `
      UPDATE users 
      SET name = ?, state = ?, district = ?, taluka = ?, number = ?, address = ?, photo = ? 
      WHERE id = ?
    `;
    db.query(updateSql, [name, state, district, taluka, number, address, photo, userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'डेटाबेस त्रुटी: ' + err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'उपयोगकर्ता सापडला नाही'
        });
      }

      res.json({
        status: 'success',
        message: 'उपयोगकर्ता माहिती यशस्वीरित्या अद्यतनित केली गेली आहे'
      });
    });
  });

  app.get('/users', (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Fetch users with pagination and search
    const selectSql = `
      SELECT * FROM users 
      WHERE name LIKE ? 
      LIMIT ? OFFSET ?
    `;
    db.query(selectSql, [`%${search}%`, parseInt(limit), parseInt(offset)], (err, results) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'डेटाबेस त्रुटी: ' + err.message
        });
      }

      // Count total users for pagination metadata with search
      const countSql = `
        SELECT COUNT(*) AS total 
        FROM users 
        WHERE name LIKE ?
      `;
      db.query(countSql, [`%${search}%`], (err, countResults) => {
        if (err) {
          return res.status(500).json({
            status: 'error',
            message: 'डेटाबेस त्रुटी: ' + err.message
          });
        }

        const total = countResults[0].total;
        const totalPages = Math.ceil(total / limit);

        res.json({
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalRecords: total,
            limit: parseInt(limit)
          },
          results
        });
      });
    });
  });

  app.delete('/delete-user/:userId', (req, res) => {
    const { userId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'कृपया वैध उपयोगकर्ता आईडी प्रदान करा'
      });
    }

    // Delete user from the database
    const deleteSql = 'DELETE FROM users WHERE id = ?';
    db.query(deleteSql, [userId], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'डेटाबेस त्रुटी: ' + err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'उपयोगकर्ता सापडला नाही'
        });
      }

      res.json({
        status: 'success',
        message: 'उपयोगकर्ता यशस्वीरित्या हटविला गेला आहे'
      });
    });
  });
  module.exports = app;
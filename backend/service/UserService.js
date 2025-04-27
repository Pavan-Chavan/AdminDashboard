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

module.exports = app;
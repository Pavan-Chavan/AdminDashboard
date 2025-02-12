
const express = require('express');
require('dotenv').config();
const db = require("../db");
const bcrypt = require('bcrypt');
const app = express();
const crypto = require("crypto");
const sendEmail = require('../Utils/SendEmail');

let otpStore = {};

app.post('/login', (req, res) => {
    const { email, password, role } = req.body;
  
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    // Check if the user exists
    
    const query = 'SELECT * FROM user WHERE email = ? AND role = ?';
    db.query(query, [email,role], async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const user = results[0];
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials pass' });
      }

      res.status(200).json({ message: 'Login successful', userDate : user });
    });
  });
  
  app.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    const otp = crypto.randomInt(100000, 999999); 
    otpStore[email] = otp;

    setTimeout(() => {
        delete otpStore[email];
        console.log(`OTP for ${email} has expired.`);
    }, 5 * 60 * 1000);

    const mailOptions = {
      from: 'info@wedeazzy.com', // sender address
      to: email, // list of receivers
      subject: `OTP from Wedeazzy !!`,
      text: `Hello Lovely Couple,
        
Here is your OTP: ${otp}.

This will only be valid for 5 minutes.

Warm regards,
Wedeazzy Team`, 
    };

    try {
        await sendEmail(mailOptions);
        res.status(200).send({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error sending email", error });
    }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    if (otpStore[email] && otpStore[email].toString() === otp) {
        delete otpStore[email]; // Clear OTP after verification
        res.status(200).send({ message: "OTP verified successfully" });
    } else {
        res.status(400).send({ message: "Invalid or expired OTP" });
    }
});

  module.exports = app;
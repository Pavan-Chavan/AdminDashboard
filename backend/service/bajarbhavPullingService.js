const express = require('express');
require('dotenv').config();
const db = require("../db");
const marketTypesDetails = require('../constant/marketTypesData');
const app = express();

app.get('/get-sections', (req, res) => {
	res.status(200).json(marketTypesDetails);
});

module.exports = app;
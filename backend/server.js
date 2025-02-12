const express = require('express');
const db = require('./db');
require('dotenv').config();
const app = express();
const cors = require('cors');

const corsOptions = {
  origin: process.env.IS_PROD ? process.env.FRONTENT_DOMAIN : process.env.FRONTENT_DOMAIN_LOCAL,  //'https://wedeazzy.com', // Replace with your frontend domain
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
};

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

const authService = require('./service/auth.js');
const categoriesService = require('./service/categoriesService.js');

// routes
app.use('/api/auth', authService);
app.use('/api/categories', categoriesService);

// Start the server
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

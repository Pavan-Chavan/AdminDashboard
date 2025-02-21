const express = require('express');
const db = require('./db');
require('dotenv').config();
const app = express();
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const checkIfOriginAllow = require('./Utils/utils');

const corsOptions = {
  origin: checkIfOriginAllow,
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
const subCategoriesService = require('./service/subCategoriesService.js');
const tagService = require('./service/tagService.js');
const bajarbhavPullingService = require('./service/bajarbhavPullingService');
const blogPostService = require('./service/blogPostService');

// routes
app.use('/api/auth', authService);
app.use('/api/categories', categoriesService);
app.use('/api/sub-categories', subCategoriesService);
app.use('/api/tags', tagService);
app.use('/api', bajarbhavPullingService);
app.use('/api/blogpost', blogPostService);

const server = http.createServer(app);

// Create the WebSocket server and attach it to the same HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.secretKeys === process.env.WEBSCOKET_secretKeys) {
        const marketTypes = data.payload.marketTypes;
        const marketTypesDetails = data.payload.marketTypesDetails;
        scarpingWeb(marketTypes, ws, marketTypesDetails);
      }
    } catch (err) {
      console.error('Error processing message', err);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
  ws.send(JSON.stringify({status : "info" , message : `Welcome to data pulling service`}));
});

// Start the server
const PORT = process.env.SERVER_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`WebSocket server attached and running on the same port`);
});

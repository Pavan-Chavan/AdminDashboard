const express = require('express');
require('dotenv').config();
const db = require("../db");
const { isEmpty } = require('lodash');
const { default: axios } = require('axios');
const app = express();

app.post('/weather-predict', async (req, res) => {
    try {
      // Extract weather data and parameters from request body
      const { historicalData, crop = "", days = 6 } = req.body;
  
      // Validate input
      if (isEmpty(historicalData)) {
        return res.status(400).json({ error: 'Historical weather data is required and must be a non-empty array' });
      }
      if (days < 1 || days > 30) {
        return res.status(400).json({ error: 'Prediction days must be between 1 and 30' });
      }
  
      // Construct prompt for DeepSeek V3-0324
      const prompt = `You are an AI model that generates farming advice using weather data.  
      The advice should be written in **simple Marathi only**.  
      The response should be **clear, structured, and in a paragraph form**.  

      Below is the weather forecast data:  
      ${JSON.stringify(historicalData, null, 2)}  

      **Instructions:**  
      - **Do not** include this prompt or any system instructions in the response.  
      - **Do not use complex words or long sentences.**  
      - **Write short and simple sentences in Marathi.**  
      - **Do not mention that you are an AI.**  
      - **Provide only the farming advice based on weather data.**  
      - **Use weather data to give farming tips in Marathi.**  
      **Generate the farming advice in simple Marathi now:**
    `;
  
      // Call OpenRouter API
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'google/gemini-2.0-flash-001',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.3, // Low temperature for consistent numerical outputs
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'http://localhost:3000', // Optional for OpenRouter
            'X-Title': 'Weather Predictor', // Optional for OpenRouter
          },
        }
      );
  
      // Extract Marathi response
      const marathiResponse = response.data.choices[0].message.content.trim();

      // Send response to frontend
      res.status(200).json({ prediction: marathiResponse });
    } catch (error) {
      console.error('Error in weather prediction:', error.message);
      res.status(500).json({ error: 'Failed to fetch weather prediction', details: error.message });
    }
});

app.post('/crop-price-prediction', (req, res) => {
    const { commodity_name, market_name } = req.body;
  
    // Validate input
    if (!commodity_name || !market_name) {
      return res.status(400).json({ error: 'commodity_name and market_name are required' });
    }
  
    // Query to get last 30 days data (MySQL syntax)
    const query = `
      SELECT 
        date,
        variety,
        unit,
        arrival_quantity,
        min_price,
        max_price,
        avg_price
      FROM apmc_crop_prices
      WHERE 
        apmc_name = ?
        AND crop_name = ?
        AND date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
      ORDER BY date DESC
    `;
  
    // Execute query using callback-based db.query
    db.query(query, [market_name, commodity_name], (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }
  
      // Format data into a string for AI
      let dataString = `Historical market data for ${commodity_name} at ${market_name}:\n\n`;
      rows.forEach(row => {
        const dateStr = row.date instanceof Date 
          ? row.date.toISOString().split('T')[0]
          : row.date;
        dataString += `Date: ${dateStr}\n`;
        dataString += `Variety: ${row.variety}\n`;
        dataString += `Unit: ${row.unit}\n`;
        dataString += `Arrival Quantity: ${row.arrival_quantity}\n`;
        dataString += `Min Price: ${row.min_price}\n`;
        dataString += `Max Price: ${row.max_price}\n`;
        dataString += `Avg Price: ${row.avg_price}\n\n`;
      });
  
      // System prompt for AI in Marathi
      const systemPrompt = `
        तुम्ही एक कृषी बाजार विश्लेषक आहात. खालील ऐतिहासिक बाजार डेटा ${commodity_name} साठी ${market_name} येथे उपलब्ध आहे. कृपया हा डेटा विश्लेषित करा आणि पुढील 7 दिवसांसाठी बाजारभावाचा अंदाज द्या. तुमचा अंदाज आणि स्पष्टीकरण मराठीत द्या. अंदाजासाठी <b>वित्तीय मॉडेल</b> (उदा., टाइम सीरिज विश्लेषण, रिग्रेशन मॉडेल किंवा इतर योग्य मॉडेल) वापरा आणि स्पष्टीकरणात मॉडेलचा उल्लेख करा. स्पष्टीकरणात किंमतीच्या ट्रेंडचे विश्लेषण, प्रभावित करणारे घटक आणि तुमच्या अंदाजाचे तर्क समाविष्ट करा.
        तुमच्या उत्तरात खालील सूचनांचे काटेकोरपणे पालन करा:
        कोणत्याही चिन्हांचा वापर करू नका (उदा., *, #, _, **, -, >, :, |). शीर्षके किंवा मजकूर यांच्यासाठी केवळ साधा मजकूर किंवा <b></b> टॅग वापरा.
        महत्त्वाच्या शब्दांना ठळक करण्यासाठी <b></b> टॅग वापरा.
        उत्तर स्पष्ट आणि यादीच्या स्वरूपात द्या, ज्यामध्ये खालील गोष्टींचा समावेश असेल: a. सरासरी किंमतीचे ट्रेंड विश्लेषण b. ${commodity_name} ची किंमतींवर परिणाम करणारे घटक c. पुढील 7 दिवसांसाठी किंमत अंदाज d. अंदाजाचे तर्क आणि वापरलेले वित्तीय मॉडेल
        तुमच्या उत्तरात कोणतेही संकेतस्थळ किंवा संदर्भ URL समाविष्ट करू नका.      
        डेटा:
        ${dataString}
      `;
  
      // Call OpenRouter API with streaming
      axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'google/gemini-2.0-flash-001',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: 'कृपया बाजारभावाचा अंदाज आणि स्पष्टीकरण मराठीत द्या.' }
          ],
          max_tokens: 1000, // Reduced for faster response
          temperature: 0.3,
          stream: true,
          tokens_per_second: 20
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'www.jiokheti.com', // Optional for OpenRouter
            'X-Title': 'Crop Price Predictor'
          },
          responseType: 'stream' // Enable streaming
        }
      )
      .then(response => {
        // Set headers for streaming
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Transfer-Encoding', 'chunked');
  
        // Pipe the stream to the response
        response.data.on('data', (chunk) => {
          res.write(chunk.toString()); // Send each chunk to the frontend
        });
  
        response.data.on('end', () => {
          res.end(); // Close the response when streaming is complete
        });
  
        response.data.on('error', (err) => {
          res.status(500).send('Error streaming response');
        });
      })
      .catch(aiError => {
        console.error('AI API error:', aiError);
        res.status(500).json({ error: 'AI API error: ' + aiError.message });
      });
    });
});

app.post('/district-crop-ai', (req, res) => {
  const { view, name, option } = req.body;

  // Validate input
  if (!view || !name || !option) {
      return res.status(400).json({ error: 'view, name, and option are required' });
  }
  if (!['crop', 'district'].includes(view)) {
      return res.status(400).json({ error: 'view must be either "crop" or "district"' });
  }

  // Determine table and column names based on view
  const tableName = view === 'crop' ? 'crop_commodity_data' : 'district_commodity_data';
  const nameColumn = view === 'crop' ? 'commodity_name' : 'district_name';
  const optionColumn = view === 'crop' ? 'market_name' : 'commodity_name';

  // Query to get last 30 days data (MySQL syntax)
  const query = `
      SELECT 
          data_date,
          variety,
          unit,
          arrival_quantity,
          min_price,
          max_price,
          avg_price
      FROM ${tableName}
      WHERE 
          ${nameColumn} = ?
          AND ${optionColumn} = ?
          AND data_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
      ORDER BY data_date DESC
  `;

  // Execute query using callback-based db.query
  db.query(query, [name, option], (err, rows) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error: ' + err.message });
      }

      // Format data into a string for AI
      let dataString = `Historical ${view} data for ${name} with ${option}:\n\n`;
      rows.forEach(row => {
          const dateStr = row.data_date instanceof Date 
              ? row.data_date.toISOString().split('T')[0]
              : row.data_date;
          dataString += `Date: ${dateStr}\n`;
          dataString += `Variety: ${row.variety}\n`;
          dataString += `Unit: ${row.unit}\n`;
          dataString += `Arrival Quantity: ${row.arrival_quantity}\n`;
          dataString += `Min Price: ${row.min_price}\n`;
          dataString += `Max Price: ${row.max_price}\n`;
          dataString += `Avg Price: ${row.avg_price}\n\n`;
      });

      // System prompt for AI in Marathi
      const systemPrompt = `
          तुम्ही एक कृषी बाजार विश्लेषक आहात. खालील ऐतिहासिक ${view} डेटा ${name} साठी ${option} येथे उपलब्ध आहे. कृपया हा डेटा विश्लेषित करा आणि पुढील 7 दिवसांसाठी बाजारभावाचा अंदाज द्या. तुमचा अंदाज आणि स्पष्टीकरण मराठीत द्या. अंदाजासाठी <b>वित्तीय मॉडेल</b> (उदा., टाइम सीरिज विश्लेषण, रिग्रेशन मॉडेल किंवा इतर योग्य मॉडेल) वापरा आणि स्पष्टीकरणात मॉडेलचा उल्लेख करा. स्पष्टीकरणात किंमतीच्या ट्रेंडचे विश्लेषण, प्रभावित करणारे घटक आणि तुमच्या अंदाजाचे तर्क समाविष्ट करा.
          तुमच्या उत्तरात खालील सूचनांचे काटेकोरपणे पालन करा:
          कोणत्याही चिन्हांचा वापर करू नका (उदा., *, #, _, **, -, >, :, |). शीर्षके किंवा मजकूर यांच्यासाठी केवळ साधा मजकूर किंवा <b></b> टॅग वापरा.
          महत्त्वाच्या शब्दांना ठळक करण्यासाठी <b></b> टॅग वापरा.
          उत्तर स्पष्ट आणि यादीच्या स्वरूपात द्या, ज्यामध्ये खालील गोष्टींचा समावेश असेल: a. सरासरी किंमतीचे ट्रेंड विश्लेषण b. ${name} ची किंमतींवर परिणाम करणारे घटक c. पुढील 7 दिवसांसाठी किंमत अंदाज d. अंदाजाचे तर्क आणि वापरलेले वित्तीय मॉडेल
          तुमच्या उत्तरात कोणतेही संकेतस्थळ किंवा संदर्भ URL समाविष्ट करू नका.      
          डेटा:
          ${dataString}
      `;

      // Call OpenRouter API with streaming
      axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
              model: 'google/gemini-2.0-flash-001',
              messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'user', content: 'कृपया बाजारभावाचा अंदाज आणि स्पष्टीकरण मराठीत द्या.' }
              ],
              max_tokens: 1000,
              temperature: 0.3,
              stream: true,
              tokens_per_second: 20
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                  'HTTP-Referer': 'www.jiokheti.com',
                  'X-Title': 'District Crop AI Predictor'
              },
              responseType: 'stream'
          }
      )
      .then(response => {
          // Set headers for streaming
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Transfer-Encoding', 'chunked');

          // Pipe the stream to the response
          response.data.on('data', (chunk) => {
              res.write(chunk.toString());
          });

          response.data.on('end', () => {
              res.end();
          });

          response.data.on('error', (err) => {
              res.status(500).send('Error streaming response');
          });
      })
      .catch(aiError => {
          console.error('AI API error:', aiError);
          res.status(500).json({ error: 'AI API error: ' + aiError.message });
      });
  });
});

module.exports = app;
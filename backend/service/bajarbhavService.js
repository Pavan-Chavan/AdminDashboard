const express = require('express');
const db = require("../db");

const app = express();
const lodash = require('lodash');

app.get('/getCommodityData', async (req, res) => {
  const { page , limit , fromDate, toDate, name, view, option } = req.query;

    // Validate input
    if (!name || !view) {
        return res.status(400).json({ error: 'name and view are required parameters' });
    }
    if (!['crop', 'district'].includes(view)) {
        return res.status(400).json({ error: 'view must be either "crop" or "district"' });
    }

    const offset = (page - 1) * limit;
    const table = view === 'crop' ? 'crop_commodity_data' : 'district_commodity_data';
    const filterColumn = view === 'crop' ? 'commodity_name' : 'district_name';
    const optionColumn = view === 'crop' ? 'market_name' : 'commodity_name';

    // Build the SQL query
    let query = `
        SELECT ${view === 'crop' ? 'market_name AS APMC' : 'commodity_name AS APMC'}, 
               variety, 
               unit, 
               arrival_quantity AS Quantity, 
               min_price,
               max_price,
               avg_price,
               updated_at,
               data_date AS Date
        FROM ${table}
        WHERE ${filterColumn} = ?
    `;

    const params = [name];
    let date_order = 'DESC';
    if (option) {
      query += ` AND ${optionColumn} = ?`;
      params.push(option);
    }

    // Add date range if provided
    if (fromDate && toDate) {
        query += ' AND data_date BETWEEN ? AND ?';
        date_order = 'ASC';
        params.push(fromDate, toDate);
    } else if (fromDate) {
        query += ' AND data_date >= ?';
        params.push(fromDate);
    } else if (toDate) {
        query += ' AND data_date <= ?';
        params.push(toDate);
    }

    query += ` ORDER BY data_date ${date_order} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));

    // Execute query
    db.query(query, params, (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data.');
        }
        if (rows.length === 0) {
            return res.status(404).send('No data found.');
        }

        // Group data by date (mimicking the screenshot structure)
        const groupedData = {};
        rows.forEach(row => {
            const date = row.Date;
            if (!groupedData[date]) {
                groupedData[date] = [];
            }
            groupedData[date].push({
                APMC: row.APMC,
                Variety: row.variety || '---',
                Unit: row.unit,
                Quantity: row.Quantity,
                MinPrice: row.min_price,
                LastUpdate : row.updated_at,
                MaxPrice: row.max_price,
                AvgPrice: row.avg_price
            });
        });

        // Convert grouped data to array for response
        const result = Object.keys(groupedData).map(date => ({
            Date: date,
            data: groupedData[date]
        }));

        // Get total count for pagination
        let countQuery = `
            SELECT COUNT(*) as total
            FROM ${table}
            WHERE ${filterColumn} = ?
        `;
        const countParams = [name];

        if (option) {
          countQuery += ` AND ${optionColumn} = ?`;
          countParams.push(option);
        }

        if (fromDate && toDate) {
            countQuery += ' AND data_date BETWEEN ? AND ?';
            countParams.push(fromDate, toDate);
        } else if (fromDate) {
            countQuery += ' AND data_date >= ?';
            countParams.push(fromDate);
        } else if (toDate) {
            countQuery += ' AND data_date <= ?';
            countParams.push(toDate);
        }

        db.query(countQuery, countParams, (err, countResult) => {
            if (err) {
                console.error('Error fetching count:', err);
                return res.status(500).send('Error fetching data count.');
            }

            const total = countResult[0].total;
            const totalPages = Math.ceil(total / limit);

            res.status(200).json({
                data: result,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalItems: total,
                    itemsPerPage: parseInt(limit)
                }
            });
        });
    });
});

app.get('/getCropDateWiseMarketData', async (req, res) => {
    const { page = 1, limit = 30, fromDate, toDate, apmc, crop } = req.query;
  
    // Validate input
    if (!apmc && !crop) {
      return res.status(400).json({ error: 'At least one of apmc or crop must be provided' });
    }
  
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const table = 'apmc_crop_prices';
  
    // Build the SQL query
    let query = `
      SELECT 
        apmc_name AS APMC,
        crop_name AS Crop,
        variety,
        unit,
        arrival_quantity AS Quantity,
        min_price,
        max_price,
        avg_price,
        created_at,
        updated_at,
        date AS Date
      FROM ${table}
      WHERE 1=1
    `;
  
    const params = [];
    let date_order = 'DESC';
    // Add filters for apmc and crop if provided
    if (apmc) {
      query += ' AND apmc_name = ?';
      params.push(apmc);
    }
    if (crop) {
      query += ' AND crop_name = ?';
      params.push(crop);
    }
  
    // Add date range if provided
    if (fromDate && toDate) {
      query += ' AND date BETWEEN ? AND ?';
      date_order = 'ASC';
      params.push(fromDate, toDate);
    } else if (fromDate) {
      query += ' AND date >= ?';
      params.push(fromDate);
    } else if (toDate) {
      query += ' AND date <= ?';
      params.push(toDate);
    }
  
    query += ` ORDER BY date ${date_order} LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), parseInt(offset));
  
    // Execute query
    db.query(query, params, (err, rows) => {
      if (err) {
        console.error('Error fetching data:', err);
        console.log(err)
        return res.status(500).json({ error: 'Error fetching data' });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: 'No data found' });
      }
  
      // Group data by date
      const groupedData = {};
      rows.forEach(row => {
        const date = row.Date;
        if (!groupedData[date]) {
          groupedData[date] = [];
        }
        groupedData[date].push({
          APMC: row.APMC,
          Crop: row.Crop,
          Variety: row.variety || '---',
          Unit: row.unit,
          Quantity: row.Quantity,
          MinPrice: row.min_price,
          MaxPrice: row.max_price,
          AvgPrice: row.avg_price,
          CreatedAt: row.created_at,
          LastUpdate: row.updated_at
        });
      });
  
      // Convert grouped data to array for response
      const result = Object.keys(groupedData).map(date => ({
        Date: date,
        data: groupedData[date]
      }));
  
      // Get total count for pagination
      let countQuery = `
        SELECT COUNT(*) as total
        FROM ${table}
        WHERE 1=1
      `;
      const countParams = [];
  
      if (apmc) {
        countQuery += ' AND apmc_name = ?';
        countParams.push(apmc);
      }
      if (crop) {
        countQuery += ' AND crop_name = ?';
        countParams.push(crop);
      }
      if (fromDate && toDate) {
        countQuery += ' AND date BETWEEN ? AND ?';
        countParams.push(fromDate, toDate);
      } else if (fromDate) {
        countQuery += ' AND date >= ?';
        countParams.push(fromDate);
      } else if (toDate) {
        countQuery += ' AND date <= ?';
        countParams.push(toDate);
      }
  
      db.query(countQuery, countParams, (err, countResult) => {
        if (err) {
          console.error('Error fetching count:', err);
          return res.status(500).json({ error: 'Error fetching data count' });
        }
  
        const total = countResult[0].total;
        const totalPages = Math.ceil(total / parseInt(limit));
  
        res.status(200).json({
          data: result,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalItems: total,
            itemsPerPage: parseInt(limit)
          }
        });
      });
    });
  });

  app.get('/getCropDistrictDropdownOption', (req, res) => {
    const { name, view } = req.query;

    // Validate input
    if (!name || !view) {
        return res.status(400).json({ error: 'name and view are required parameters' });
    }
    if (!['crop', 'district'].includes(view)) {
        return res.status(400).json({ error: 'view must be either "crop" or "district"' });
    }

    // Query for unique names
    let uniqueQuery;
    let uniqueParams = [name];

    if (view === 'crop') {
        uniqueQuery = `
            SELECT DISTINCT market_name AS name
            FROM crop_commodity_data
            WHERE commodity_name = ?
            ORDER BY market_name
        `;
    } else {
        uniqueQuery = `
            SELECT DISTINCT commodity_name AS name
            FROM district_commodity_data
            WHERE district_name = ?
            ORDER BY commodity_name
        `;
    }

    // Execute query
    db.query(uniqueQuery, uniqueParams, (err, uniqueResults) => {
        if (err) {
            console.error('Error processing request:', err);
            return res.status(500).json({ error: err.message });
        }

        // Extract unique names list
        const uniqueNames = uniqueResults.map(row => row.name);

        res.status(200).json({
            uniqueNames
        });
    });
});

app.get('/getApmcDropdownOptions', (req, res) => {
  const { crop } = req.query;

  // Validate input
  if (!crop) {
    return res.status(400).json({ error: 'crop is a required parameter' });
  }

  // Query for distinct APMC names
  const query = `
    SELECT DISTINCT apmc_name AS name
    FROM apmc_crop_prices
    WHERE crop_name = ?
    ORDER BY apmc_name
  `;
  const params = [crop];

  // Execute query
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error processing request:', err);
      return res.status(500).json({ error: err.message });
    }

    // Extract distinct APMC names
    const uniqueNames = results.map(row => row.name);

    res.status(200).json({
      uniqueNames
    });
  });
});

module.exports = app;
const express = require('express');
require('dotenv').config();
const mysql = require('mysql');
const db = require("../db");
const marketTypesDetails = require('../constant/bajarbhavConstants/marketTypesData');
const cheerio = require('cheerio');
const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/get-sections', (req, res) => {
	res.status(200).json(marketTypesDetails);
});

app.post('/insert-market-data', async (req, res) => {
    const { table_data, tableId } = req.body;
    try {
        if (!table_data) {
            return res.status(400).json({
                status: 'error',
                message: 'HTML content is required'
            });
        }
        let data = null;
        switch (tableId) {
            case "DistrictCommodityGird":
                data = await extractDistrictData(table_data);
                await storeDistrictData(data);
                break;
            case "ArrivalGird":
                data = await extractData(table_data);
                await storeData(data);
                break;
            case "CommodityGird":
                data = await extractCropData(table_data);
                await storeCropData(data);
                break;
            default:
                break;
        }
        

        res.json({
            status: 'insert',
            message: 'Data processed and stored successfully',
            records_processed: data.length
        });
    } catch (error) {
        console.error('Error processing data:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error while processing data'
        });
    }
});

async function extractData(html) {
    try {
        const $ = cheerio.load(JSON.parse(html));
        const records = [];
        let currentDate = null;
        // Check for APMC-specific grid
        const isApmcGrid = !!$('#ArrivalGird').length;

        if (!isApmcGrid) {
            console.error('HTML is not APMC-specific (ArrivalGird not found)');
            throw new Error('Invalid HTML structure');
        }

        // Extract APMC name
        const apmcName = $('#APMCsAPMC').text().trim();

        if (!apmcName) {
            console.error('APMC name is missing');
            throw new Error('Unable to determine APMC name');
        }

        // Process table rows
        $('#tblAPMC tr').each((index, element) => {
            const $row = $(element);
            const columns = $row.find('td');

            if (columns.length === 1) {
                // Date row
                const dateText = columns.text().trim();
                // Validate and convert DD/MM/YYYY to YYYY-MM-DD
                const dateMatch = dateText.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                if (!dateMatch) {
                    console.warn(`Invalid date format: ${dateText}`);
                    return;
                }
                const [, day, month, year] = dateMatch;
                currentDate = `${year}-${month}-${day}`;
                // Validate date
                const parsedDate = new Date(currentDate);
                if (isNaN(parsedDate.getTime())) {
                    console.warn(`Invalid date: ${currentDate}`);
                    currentDate = null;
                    return;
                }
            } else if (columns.length === 7 && currentDate) {
                // Data row
                const record = {
                    apmc_name: apmcName,
                    date: currentDate,
                    crop_name: columns.eq(0).text().trim(),
                    variety: columns.eq(1).text().trim(),
                    unit: columns.eq(2).text().trim(),
                    arrival_quantity: parseInt(columns.eq(3).text().trim()) || 0,
                    min_price: parseFloat(columns.eq(4).text().trim()) || 0,
                    max_price: parseFloat(columns.eq(5).text().trim()) || 0,
                    avg_price: parseFloat(columns.eq(6).text().trim()) || 0
                };
                records.push(record);
            }
        });

        if (!records.length) {
            console.error('No valid data extracted from HTML');
            throw new Error('No valid data extracted from HTML');
        }

        return records;
    } catch (error) {
        console.error('Error extracting data:');
        throw new Error('Error while parsing HTML');
    }
}

async function storeData(records) {
    if (!records.length) {
        console.log('No records to store.');
        return;
    }

    try {
        // Batch inserts in chunks of 1,000
        const batchSize = 1000;
        for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            const values = [];
            const placeholders = batch.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?)').join(',');

            for (const record of batch) {
                values.push(
                    record.apmc_name,
                    record.date,
                    record.crop_name,
                    record.variety,
                    record.unit,
                    record.arrival_quantity,
                    record.min_price,
                    record.max_price,
                    record.avg_price
                );
            }

            await db.query(
                `INSERT INTO apmc_crop_prices 
                (apmc_name, date, crop_name, variety, unit, arrival_quantity, min_price, max_price, avg_price)
                VALUES ${placeholders}
                ON DUPLICATE KEY UPDATE
                unit = VALUES(unit),
                arrival_quantity = VALUES(arrival_quantity),
                min_price = VALUES(min_price),
                max_price = VALUES(max_price),
                avg_price = VALUES(avg_price),
                updated_at = NOW()`,
                values
            );
        }

    } catch (error) {
        console.error('Error storing data:', error);
        throw new Error('Error while storing data in database');
    }
}

async function extractDistrictData(html) {
    try {
        const $ = cheerio.load(JSON.parse(html)); // Assuming html is already a string, no JSON.parse needed
        const records = [];
        let currentDate = null;

        // Check for district-specific grid
        const isDistrictGrid = !!$("#DistrictCommodityGird").length;

        if (!isDistrictGrid) {
            console.error("HTML is not district-specific (DistrictCommodityGird not found)");
            throw new Error("Invalid HTML structure");
        }

        // Extract district name
        const districtName = $("#APMCDistrictCommodity").text().trim();

        if (!districtName) {
            console.error("District name is missing");
            throw new Error("Unable to determine district name");
        }

        // Process table rows
        $("#tblDistrictCommodityGird tr").each((index, element) => {
            const $row = $(element);
            const columns = $row.find("td");

            if (columns.length === 1) {
                // Date row
                const dateText = columns.text().trim();
                // Validate and convert DD/MM/YYYY to YYYY-MM-DD
                const dateMatch = dateText.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                if (!dateMatch) {
                    console.warn(`Invalid date format: ${dateText}`);
                    return;
                }
                const [, day, month, year] = dateMatch;
                currentDate = `${year}-${month}-${day}`;
                // Validate date
                const parsedDate = new Date(currentDate);
                if (isNaN(parsedDate.getTime())) {
                    console.warn(`Invalid date: ${currentDate}`);
                    currentDate = null;
                    return;
                }
            } else if (columns.length === 7 && currentDate) {
                // Data row
                const record = {
                    district_name: districtName,
                    date: currentDate,
                    commodity_name: columns.eq(0).text().trim(),
                    variety: columns.eq(1).text().trim(),
                    unit: columns.eq(2).text().trim(),
                    arrival_quantity: parseFloat(columns.eq(3).text().trim()) || 0,
                    min_price: parseFloat(columns.eq(4).text().trim()) || 0,
                    max_price: parseFloat(columns.eq(5).text().trim()) || 0,
                    avg_price: parseFloat(columns.eq(6).text().trim()) || 0
                };
                records.push(record);
            } else if (columns.length === 4 && columns.eq(0).text().includes("एकुण आवक")) {
                // Total arrival row (optional handling)
                const totalArrival = parseFloat(columns.eq(1).text().trim()) || 0;
                // Note: Not storing totalArrival in records to match table schema
            }
        });

        if (!records.length) {
            console.error("No valid data extracted from HTML");
            throw new Error("No valid data extracted from HTML");
        }

        return records;
    } catch (error) {
        console.error("Error extracting district data:", error);
        throw new Error("Error while parsing district HTML");
    }
}

async function storeDistrictData(records) {
    if (!records.length) {
        console.log("No district records to store.");
        return;
    }

    try {
        // Batch inserts in chunks of 1,000
        const batchSize = 1000;
        for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            const values = [];
            const placeholders = batch.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)").join(",");

            for (const record of batch) {
                values.push(
                    record.district_name,
                    record.date,
                    record.commodity_name,
                    record.variety === "---" ? null : record.variety, // Handle "---" as NULL
                    record.unit,
                    record.arrival_quantity,
                    record.min_price,
                    record.max_price,
                    record.avg_price
                );
            }

            await db.query(
                `INSERT INTO district_commodity_data 
                (district_name, data_date, commodity_name, variety, unit, arrival_quantity, min_price, max_price, avg_price)
                VALUES ${placeholders}
                ON DUPLICATE KEY UPDATE
                unit = VALUES(unit),
                arrival_quantity = VALUES(arrival_quantity),
                min_price = VALUES(min_price),
                max_price = VALUES(max_price),
                avg_price = VALUES(avg_price),
                created_at = NOW()`,
                values
            );
        }

    } catch (error) {
        console.error("Error storing district data:", error);
        throw new Error("Error while storing district data in database");
    }
}

async function extractCropData(html) {
    try {
        const $ = cheerio.load(JSON.parse(html)); // Assuming html is already a string, no JSON.parse needed
        const records = [];
        let currentDate = null;

        // Check for crop-specific grid
        const isCropGrid = !!$("#CommodityGird").length;

        if (!isCropGrid) {
            console.error("HTML is not crop-specific (CommodityGird not found)");
            throw new Error("Invalid HTML structure");
        }

        // Extract commodity name
        const commodityName = $("#APMCCommodity").text().trim();

        if (!commodityName) {
            console.error("Commodity name is missing");
            throw new Error("Unable to determine commodity name");
        }

        // Process table rows
        $("#tblCommodity tr").each((index, element) => {
            const $row = $(element);
            const columns = $row.find("td");

            if (columns.length === 1) {
                // Date row
                const dateText = columns.text().trim();
                // Validate and convert DD/MM/YYYY to YYYY-MM-DD
                const dateMatch = dateText.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
                if (!dateMatch) {
                    console.warn(`Invalid date format: ${dateText}`);
                    return;
                }
                const [, day, month, year] = dateMatch;
                currentDate = `${year}-${month}-${day}`;
                // Validate date
                const parsedDate = new Date(currentDate);
                if (isNaN(parsedDate.getTime())) {
                    currentDate = null;
                    return;
                }
            } else if (columns.length === 7 && currentDate) {
                // Data row
                const record = {
                    commodity_name: commodityName,
                    market_name: columns.eq(0).text().trim(),
                    data_date: currentDate,
                    variety: columns.eq(1).text().trim(),
                    unit: columns.eq(2).text().trim(),
                    arrival_quantity: parseFloat(columns.eq(3).text().trim()) || 0,
                    min_price: parseFloat(columns.eq(4).text().trim()) || 0,
                    max_price: parseFloat(columns.eq(5).text().trim()) || 0,
                    avg_price: parseFloat(columns.eq(6).text().trim()) || 0
                };
                records.push(record);
            }
        });

        if (!records.length) {
            console.error("No valid data extracted from HTML");
            throw new Error("No valid data extracted from HTML");
        }

        return records;
    } catch (error) {
        console.error("Error extracting crop data:", error);
        throw new Error("Error while parsing crop HTML");
    }
}

async function storeCropData(records) {
    if (!records.length) {
        console.log("No crop records to store.");
        return;
    }

    console.log(`Starting to store ${records.length} crop records in the database.`);
    try {
        // Assume db is a configured mysql2/promise connection pool
        const batchSize = 1000;
        for (let i = 0; i < records.length; i += batchSize) {
            const batch = records.slice(i, i + batchSize);
            console.log(`Processing batch ${Math.floor(i / batchSize) + 1} with ${batch.length} records.`);
            const values = [];
            const placeholders = batch.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)").join(",");

            for (const record of batch) {
                values.push(
                    record.commodity_name,
                    record.market_name,
                    record.data_date,
                    record.variety === "---" ? null : record.variety,
                    record.unit,
                    record.arrival_quantity,
                    record.min_price,
                    record.max_price,
                    record.avg_price
                );
            }

            console.log(`Executing query for batch ${Math.floor(i / batchSize) + 1}.`);
            await db.query(
                `INSERT INTO crop_commodity_data 
                (commodity_name, market_name, data_date, variety, unit, arrival_quantity, min_price, max_price, avg_price)
                VALUES ${placeholders}
                ON DUPLICATE KEY UPDATE
                unit = VALUES(unit),
                arrival_quantity = VALUES(arrival_quantity),
                min_price = VALUES(min_price),
                max_price = VALUES(max_price),
                avg_price = VALUES(avg_price),
                created_at = NOW()`,
                values
            );
            console.log(`Batch ${Math.floor(i / batchSize) + 1} inserted successfully.`);
        }

        console.log("All crop records stored successfully.");
    } catch (error) {
        console.error("Error storing crop data:", error);
        throw new Error("Error while storing crop data in database");
    }
}
module.exports = app;
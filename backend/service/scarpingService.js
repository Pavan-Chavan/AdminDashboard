const puppeteer = require('puppeteer');
const axios = require('axios');
const baseURL = 'https://www.msamb.com/ApmcDetail/APMCPriceInformation';
const https = require('https'); 

const scarpingWeb = async (marketTypes, ws, marketTypesDetails) => {
  try {
    // Calculate the total number of dropdown options to process
    let totalOptions = 0;
    for (const marketType of marketTypes) {
      const marketTypeData = marketTypesDetails[marketType];
      totalOptions += marketTypeData.DropdownOptions.length;
    }

    let processedOptions = 0; // Counter for completed tasks

    // Iterate over each market type sequentially
    for (const marketType of marketTypes) {
      const marketTypeData = marketTypesDetails[marketType];

      // Iterate over each dropdown option sequentially
      for (const option of marketTypeData.DropdownOptions) {
        try {
          ws.send(JSON.stringify({
            status: "info",
            message: `Launching browser for Market Type: ${marketType}, Name: ${option.name}, Code: ${option.code}`
          }));

          const browser = await puppeteer.launch();

          ws.send(JSON.stringify({
            status: "info",
            message: `Launching web page for Market Type: ${marketType}, Name: ${option.name}, Code: ${option.code}`
          }));

          const page = await browser.newPage();
          const URL = `${baseURL}#${marketType}`;

          ws.send(JSON.stringify({
            status: "info",
            message: `Loading into ${URL} for Market Type: ${marketType}, Name: ${option.name}, Code: ${option.code}`
          }));

          await page.goto(URL, { waitUntil: 'domcontentloaded' });

          // Update language
          const changingLanguage = await page.evaluate(() => {
            const selectElement = document.getElementById('language');
            if (selectElement) {
              selectElement.value = 'मराठी';
              const event = new Event('change', { bubbles: true });
              selectElement.dispatchEvent(event);
              return `Updated language to मराठी`;
            }
            return `Did not find language dropdown`;
          });
          ws.send(JSON.stringify({ status: "info", message: changingLanguage }));

          await new Promise(resolve => setTimeout(resolve, 2000));

          // Switch tab
          const switchingTab = await page.evaluate((marketTypeData, option) => {
            const selectElement = document.getElementById(marketTypeData.subTabID);
            if (selectElement) {
              selectElement.click();
              return `Switching tab for ${marketTypeData.subTabID} Market Type: ${marketTypeData.name}, Name: ${option.name}, Code: ${option.code}`;
            }
            return `ID not found for ${marketTypeData.subTabID}`;
          }, marketTypeData, option);

          ws.send(JSON.stringify({ status: "info", message: switchingTab }));
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Manipulate dropdown
          const manipulationResult = await page.evaluate((marketTypeData, option) => {
            const selectElement = document.getElementById(marketTypeData.SelectOptionId);
            if (selectElement) {
              const optionsList = [...selectElement.options].map(opt => opt.value);
              if (optionsList.includes(option.code)) {
                selectElement.value = option.code;
              } else {
                const string = optionsList.map(opt => `'${opt}'`).join(', ');
                return `Invalid option code: ${option.code}. Available options: ${string}`;
              }
              const valueOFSelect = selectElement.value;
              const event = new Event('change', { bubbles: true });
              selectElement.dispatchEvent(event);
              return `Dropdown value updated and onchange triggered for valueOFSelect: ${valueOFSelect} Market Type: ${marketTypeData.name}, Name: ${option.name}, Code: ${option.code}, option: ${marketTypeData.SelectOptionId}`;
            }
            return `Dropdown not found for ${marketTypeData.name}`;
          }, marketTypeData, option);

          ws.send(JSON.stringify({ status: "info", message: manipulationResult }));

          await new Promise(resolve => setTimeout(resolve, 2000));

          // Scrape data
          const data = await page.evaluate((marketTypeData) => {
            const items = document.getElementById(marketTypeData.tableId);
            return items ? items.outerHTML : null;
          }, marketTypeData);

          if (!data) {
            ws.send(JSON.stringify({
              status: "error",
              message: `No data found in ${marketTypeData.name} - ${option.name}`
            }));
          } else {
            // Prepare data for API call
            const payload = {
              tableName: marketTypeData.tableName,
              table_data: JSON.stringify(data),
              code: option.code,
              slug: option.slug
            };

            // Call the endpoint
            try {
              const response = await axios.post(
                `${process.env.ADMIN_BACKEND_DOMAIN}/api/insert-market-data`,
                payload,
                {
                  httpsAgent: new https.Agent({
                    rejectUnauthorized: false // Bypasses SSL verification
                  })
                }
              );
              ws.send(JSON.stringify({
                status: response.data.status,
                message: response.data.message,
                data: {
                  Section: marketTypeData.name,
                  Name: option.name,
                  Code: option.code,
                  insertId: response.data.insertId
                }
              }));
            } catch (apiError) {
              console.log(apiError);
              ws.send(JSON.stringify({
                status: "error",
                message: `API call failed: ${apiError.message}`,
                data: {
                  Section: marketTypeData.name,
                  Name: option.name,
                  Code: option.code
                }
              }));
            }
          }

          await browser.close();

        } catch (error) {
          ws.send(JSON.stringify({
            status: "error",
            message: `Error processing ${marketType} - ${option.name}: ${error.message}`
          }));
          console.error(`Error processing ${marketType} - ${option.name}:`, error);
          if (typeof browser !== 'undefined') {
            await browser.close().catch(err => console.error('Error closing browser:', err));
          }
        } finally {
          // Update progress after each option is processed
          processedOptions++;
          const percentageCompleted = (processedOptions / totalOptions) * 100;

          ws.send(JSON.stringify({
            status: "progress",
            percentage: percentageCompleted.toFixed(2),
            message: `Processed ${processedOptions} of ${totalOptions} options`
          }));
        }
      }
    }

    // Send completion message
    ws.send(JSON.stringify({
      status: "success",
      message: "Scraping process completed"
    }));

  } catch (error) {
    ws.send(JSON.stringify({
      status: "error",
      message: `Unexpected error during scraping: ${error.message}`
    }));
    console.error('Unexpected error during scraping:', error);
  }
};

module.exports = scarpingWeb;
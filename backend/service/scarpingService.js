// scrapingWeb.js (modified)
const puppeteer = require('puppeteer');
const axios = require('axios'); // Add this dependency
const baseURL = 'https://www.msamb.com/ApmcDetail/APMCPriceInformation';

const scarpingWeb = (marketTypes, ws, marketTypesDetails) => {
  try {
    marketTypes.forEach((marketType, index) => {
      const marketTypeData = marketTypesDetails[marketType];
      marketTypeData.DropdownOptions.forEach(async (option) => {
        ws.send(JSON.stringify({status: "info", message: `Launching browser for Market Type : ${marketType}, Name : ${option.name}, Code: ${option.code}`}));
        const browser = await puppeteer.launch();
        ws.send(JSON.stringify({status: "info", message: `Launching web page for Market Type : ${marketType}, Name : ${option.name}, Code: ${option.code}`}));
        const page = await browser.newPage();

        const URL = baseURL + `#${marketType}`;
        ws.send(JSON.stringify({status: "info", message: `Loading into ${URL} Market Type : ${marketType}, Name : ${option.name}, Code: ${option.code}`}));
        await page.goto(URL, { waitUntil: 'domcontentloaded' });

        // Language update code remains the same
        const changingLanguage = await page.evaluate(async() => {
          const selectElement = document.getElementById('language');
          if (selectElement) {
            selectElement.value = 'मराठी';
            const event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);
            return `Updated language to मराठी`;
          }
          return `Did not found language dropdown`;
        });
        ws.send(JSON.stringify({status: "info", message: `${changingLanguage}`}));

        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Tab switching code remains the same
        const switchingTab = await page.evaluate(async(marketTypeData, option) => {
          const selectElement = document.getElementById(marketTypeData.subTabID);
          if (selectElement) {
            selectElement.click();
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return `Switching tab for ${marketTypeData.subTabID} Market Type : ${marketTypeData.name}, Name : ${option.name}, Code: ${option.code}`;
          }
          return `ID not found for ${marketTypeData.subTabID}`;
        }, marketTypeData, option);

        ws.send(JSON.stringify({status: "info", message: `${switchingTab}`}));
        
        // Dropdown manipulation code remains the same
        const manipulationResult = await page.evaluate(async(marketTypeData, option) => {
          const selectElement = document.getElementById(marketTypeData.SelectOptionId);
          if (selectElement) {
            const optionsList = [...selectElement.options].map(opt => opt.value);
            if (optionsList.includes(option.code)) {
              selectElement.value = option.code;
            } else {
              let string = optionsList.map(opt => { return " '" + `${opt}` + "'"});
              return `Invalid option code: ${option.code} available options ${string}`; 
            }
            let valueOFSelect = selectElement.value;
            const event = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(event);
            return `Dropdown value updated and onchange triggered for valueOFSelect : ${valueOFSelect} Market Type : ${marketTypeData.name}, Name : ${option.name}, Code: ${option.code}, option : ${marketTypeData.SelectOptionId}`;
          }
          return `Dropdown not found for ${marketTypeData.name}`;
        }, marketTypeData, option);
        
        ws.send(JSON.stringify({status: "info", message: manipulationResult}));
        
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const data = await page.evaluate((marketTypeData) => {
          const items = document.getElementById(marketTypeData.tableId);
          return items ? items.outerHTML : null;
        }, marketTypeData);

        if (!data) {
          ws.send(JSON.stringify({status: "error", message: `No data found in ${marketTypeData.name} - ${option.name}`}));
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
            const response = await axios.post(`${process.env.ADMIN_BACKEND_DOMAIN}/api/insert-market-data`, payload);
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
      });
    });
  } catch (error) {
    ws.send(JSON.stringify({status: "error", message: `Error during scraping: ${error.message}`}));
    console.error('Error during scraping:', error.message);
  }
};

module.exports = scarpingWeb;
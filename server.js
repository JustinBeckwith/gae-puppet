const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://stackoverflow.com/questions/61777810/puppeteer-on-node-js-12-google-cloud-engine-is-crashing');
  const filePath = path.join(__dirname, 'screenshot.png');
  await page.screenshot({path: filePath});
  await browser.close();
  res.sendFile(filePath);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 83; seed <= 92; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for table to load
    await page.waitForSelector("table");

    // Extract all numbers
    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => parseInt(cell.innerText))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;

    console.log(`Seed ${seed} sum: ${pageSum}`);
  }

  console.log("TOTAL SUM:", totalSum);

  await browser.close();
})();
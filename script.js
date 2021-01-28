// require playwright and launch browser
const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({ headless: false });
  searchForPS5(browser);
})();

// helper function for sleeping
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// search whether PS5 is in stock
var searchForPS5 = async (browser) => {
  // go to site
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.shopto.net');

  // enter search term "playstation 5 console"
  await page.type('#input_search', 'playstation 5 digital console', {delay: 100});
  await sleep(3000);
  await page.press('.search_button', 'Enter');
  await sleep(1000);

  // wait for result products to render and put them in a results array
  await page.innerHTML('itemlist_container');
  const results = await page.$$('itemlist_container');

  // iterate through results array
  for (let i = 0; i < results.length; i++) {
    // get product's name
    const itemlistDescription = await results[i].$('itemlist_description');
    const html = await itemlistDescription.innerHTML();

    // check whether product's name contains "playstation 5" and "console"
    if (html.toLowerCase().includes('playseat') && html.toLowerCase().includes('evolution')) {
      // get Sold Out/Add to Cart button
      const button = await results[i].$('button.add-to-cart-button');
      const buttonText = await button.innerText();

      // if the product is not sold out, alert the user
      if (buttonText !== "Sold Out") {
        console.log("Available!");
        // alert the user!!!
      }
    }
  }
};

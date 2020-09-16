const puppeteer = require('puppeteer');

console.log('starting...');


async function ghost() {


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.samsung.com/ca/accessibility/overview/');
    
    const title =  await page.evaluate(() => {
        return document.querySelector('head > title').text
      });

   

    console.log(title)
    await browser.close();

}

ghost();
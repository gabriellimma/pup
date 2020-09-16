const puppeteer = require('puppeteer');

console.log('starting...');


async function ghost() {


    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.samsung.com/ca/accessibility/overview/');

    const pageTwo = await browser.newPage();
    await pageTwo.goto('https://www.samsung.com/ca/accessibility/overview/');
    
    const title =  await page.evaluate(() => {
        return document.querySelector('head > title').text
      });

      const titleTwo =  await pageTwo.evaluate(() => {
        return document.querySelector('head > title').text
      });
   
      if(title == titleTwo) {
        console.log('equal');
      } else {
        console.log('non-equal');
      }

    console.log(title)
    console.log(titleTwo)
    await browser.close();

}

ghost();
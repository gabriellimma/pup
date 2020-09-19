const puppeteer = require('puppeteer');
const { get } = require('request');

console.log('starting...');


async function ghost() {

    const liveURL = 'https://www.samsung.com/cn/accessibility/overview'
    const hShopURL = 'https://www.samsung.com/cn/accessibility/overview'

    const browser = await puppeteer.launch({headless: false});
    const live = await browser.newPage();
    await live.goto(liveURL, {waitUntil: 'domcontentloaded'});

    const hShop = await browser.newPage();
    await hShop.goto(hShopURL, {waitUntil: 'domcontentloaded'});

    const liveAlt =  await live.evaluate(() => {

        let alts = document.querySelectorAll(`img`);
        let altarray = []
        
        for(i = 0; i < alts.length; i++) {
            altarray.push(alts.item(i).alt)
        }

        return altarray
      });

      const hShopAlt =  await hShop.evaluate(() => {

        let alts = document.querySelectorAll(`img`);
        let altarray = []
        
        for(i = 0; i < alts.length; i++) {
            altarray.push(alts.item(i).alt)
        }

        return altarray
      });

    
      //output
    for(i = 12; i < liveAlt.length; i++) {

        if(liveAlt[i] == hShopAlt[i]) {
            console.log(`Live Alt ${i}: OK`);
            console.log(`hSho Alt ${i}: OK`);
        } else {
            console.log(`Live Alt ${i}: ${liveAlt[i]}`);      
            console.log(`hSho Alt ${i}: ${hShopAlt[i]}`);
        }

              
    }
    
    await browser.close();
    
}

//call
ghost();



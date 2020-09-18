const puppeteer = require('puppeteer');
const { get } = require('request');

console.log('starting...');


async function ghost() {
    //startup
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.samsung.com/se/accessibility/web-accessibility/');
    
    const pageTwo = await browser.newPage();
    await pageTwo.goto('https://hshopfront.samsung.com/se/accessibility/web-accessibility/');
    
    //insere a senha do hshop
    await pageTwo.type('#username', 'qauser');
    await pageTwo.type('#password', 'groqa1!');
    await pageTwo.keyboard.press('Enter');
    
    await pageTwo.waitForNavigation();
    
    //titles
    
    const getMetaLive = async tag => {
        const response = await page.evaluate(tag => {
            return document.getElementsByName(tag).item(0).content.toString()
        }, tag);
        
        return response
    }

    const getMetaHshop = async tag => {
        const response = await pageTwo.evaluate(tag => {
            return document.getElementsByName(tag).item(0).content.toString()
        }, tag);
        
        return response
    }
    
    const liveTitle = await getMetaLive('title');
    const hShopTitle = await getMetaHshop('title');
    const liveDescription = await getMetaLive('description');
    const hShopDescription = await getMetaHshop('description');
    const liveKeyword = await getMetaLive('keywords');
    const hShopKeyword = await getMetaHshop('keywords');
    const liveCanonical = await getMetaLive('link');
    const hShopCanonical = await getMetaHshop('link');
    
    compare(liveTitle, hShopTitle, 'title');  
    compare(liveDescription, hShopDescription, 'description'); 
    compare(liveKeyword, hShopKeyword, 'description');
    compare(liveCanonical, hShopCanonical, 'canonical') 

    console.log(liveTitle +"\n" + hShopTitle)
    await browser.close();
    
}



//functions
function compare (params1, params2, propriedade) {
    
    if(params1 == params2) {
        console.log(`${propriedade}: OK`);
    } else {
        console.log(`${propriedade}: FAIL`);
        console.log(propriedade+" live: " + params1);
        console.log(propriedade+" hshop: " +  params2);
    }
    
}

//call
ghost();


const puppeteer = require('puppeteer');
const { get } = require('request');

console.log('starting...');


async function ghost() {

    //startup
    const browser = await puppeteer.launch({headless: false});
    const live = await browser.newPage();
    await live.goto('https://www.samsung.com/uz_ru/accessibility/web-accessibility/', {waitUntil: 'domcontentloaded'});
    
    const hshop = await browser.newPage();
    await hshop.goto('https://hshopfront.samsung.com/uz_ru/accessibility/web-accessibility/', {waitUntil: 'domcontentloaded'});
    
    //insere a senha do hshop
    await hshop.type('#username', 'qauser');
    await hshop.type('#password', 'groqa1!');
    await hshop.keyboard.press('Enter');
    
    await hshop.waitForNavigation();
    
    async function getContent( tag, pagina ) {
        const response = await pagina.evaluate(tag => {
            return document.querySelector(`meta[name="${tag}"]`).content.toString()
        }, tag);        
      
        return response
    }

    async function getHref( tag, pagina ) {
      const response = await pagina.evaluate(tag => {
          return document.querySelector(`link[rel="${tag}"]`).href.toString();
      }, tag);        
  
      return response
  }

  async function getProperty( tag, pagina ) {
    const response = await pagina.evaluate(tag => {
        return document.querySelector(`meta[property="${tag}"]`).content.toString()
    }, tag);        

    return response
}
    
    const liveTitle = await getContent('title', live);
    const hShopTitle = await getContent('title', hshop);
    const liveDescription = await getContent('description', live);
    const hShopDescription = await getContent('description', hshop);
    const liveKeyword = await getContent('keywords', live);
    const hShopKeyword = await getContent('keywords', hshop);
    const liveCanonical = await getHref('canonical', live);
    const hShopCanonical = await getHref('canonical', hshop);
    const liveTwitterSite = await getContent('twitter:site', live);
    const hShopTwitterSite = await getContent('twitter:site', hshop);
    const liveTwitterCreator = await getContent('twitter:creator', live);
    const hShopTwitterCreator = await getContent('twitter:creator', hshop);    
    const liveTwitterTitle = await getContent('twitter:title', live);
    const hShopTwitterTitle = await getContent('twitter:title', hshop);
    const liveTwitterDescription = await getContent('twitter:description', live);
    const hShopTwitterDescription = await getContent('twitter:description', hshop);
    const liveTwitterImage = await getContent('twitter:image', live);
    const hShopTwitterImage = await getContent('twitter:image', hshop);
    const liveFacebookTitle = await getProperty('og:title', live);
    const hShopFacebookTitle = await getProperty('og:title', hshop);
    const liveFacebookDescription = await getProperty('og:description', live);
    const hShopFacebookDescription = await getProperty('og:description', hshop);
    const liveFacebookImage = await getProperty('og:image', live);
    const hShopFacebookImage = await getProperty('og:image', hshop);

      compare(liveTitle, hShopTitle, 'title');
      compare(liveDescription, hShopDescription, 'description');
      compare(liveKeyword, hShopKeyword, 'keyword');
      compare(liveCanonical, hShopCanonical, 'canonical');
      compare(liveTwitterCreator, hShopTwitterCreator, 'twitterCreator');
      compare(liveTwitterSite, hShopTwitterSite, 'twitterSite');
      compare(liveTwitterTitle, hShopTwitterTitle, 'twitterTitle');
      compare(liveTwitterDescription, hShopTwitterDescription, 'twitterDescription');
      compare(liveTwitterImage, hShopTwitterImage, 'twitterImage');
      compare(liveFacebookTitle, hShopFacebookTitle, 'OG:title');
      compare(liveFacebookDescription, hShopFacebookDescription, 'OG:Description');
      compare(liveFacebookImage, hShopFacebookImage, 'OG:Image');

    await browser.close();
    
}

//functions
function compare (params1, params2, propriedade) {
    
    if(params1 == params2) {
        console.log(`${propriedade}: OK`);
    } else {
        console.log(`${propriedade}: FAIL`);
        console.log(propriedade+" live:  " + params1);
        console.log(propriedade+" hshop: " +  params2);
    }
    
}

//call
ghost();



const puppeteer = require('puppeteer');

console.log('starting...');


async function ghost() {
  
  const hShop = 'https://hshopfront.samsung.com/uk/accessibility/web-accessibility/'
  const live = 'https://www.samsung.com/uk/accessibility/web-accessibility/'  
  //startup
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(live);

    const pageTwo = await browser.newPage();
    await pageTwo.goto(hShop);

    //insere a senha do hshop
    await pageTwo.type('#username', 'qauser');
    await pageTwo.type('#password', 'groqa1!');
    await pageTwo.keyboard.press('Enter');

    await pageTwo.waitForNavigation();
    
    //titles

    //-----------------    

    // const getMeta = async tag => {
    //   const response = await page.evaluate(tag => {
    //     return document.getElementsByName(tag).item(0).content.toString()
    //   }, tag);

    //   return response
    // }

  //---------------------



    const title =  await page.evaluate(() => {
        return document.getElementsByName("title").item(0).content.toString();
      });

    const titleTwo =  await pageTwo.evaluate(() => {
        return document.getElementsByName("title").item(0).content.toString();
      });

      //description
      const description = await page.evaluate(() => {
        return document.getElementsByName('description').item(0).content.toString();
      });

      const descriptionTwo = await pageTwo.evaluate(() => {
        return document.getElementsByName('description').item(0).content.toString();
      });

      
      //keywords
      const keyword = await page.evaluate(() => {
        document.getElementsByName('keywords').item(0).content.toString();
      });

      const keywordTwo = await pageTwo.evaluate(() => {
        document.getElementsByName('keywords').item(0).content.toString();
      });

      //canonical
      const canonical = await page.evaluate(() => {
        return document.getElementsByTagName('link').item(0).href.toString();
      });

      const canonicalTwo = await pageTwo.evaluate(() => {
        return document.getElementsByTagName('link').item(0).href.toString();
      });

      //social media

      //Twitter site
      const twitterSite = await page.evaluate(() => {
        return document.getElementsByTagName('link').item(0).href.toString();
      });

      const twitterSiteTwo = await pageTwo.evaluate(() => {
        return document.getElementsByTagName('link').item(0).href.toString();
      });

      //twitter creator
      const twitterCreator = await page.evaluate(() => {
        return document.getElementsByName('twitter:site').item(0).content.toString()
      });

      const twitterCreatorTwo = await pageTwo.evaluate(() => {
        return document.getElementsByName('twitter:site').item(0).content.toString()

      });

      //twitter title
      const twitterTitle = await page.evaluate(() => {
        return document.getElementsByName('twitter:title').item(0).content.toString()

      });

      const twitterTitleTwo = await pageTwo.evaluate(() => {
        return document.getElementsByName('twitter:title').item(0).content.toString()

      });

      //twitter description
      const twitterDescription = await page.evaluate(() => {
        return document.getElementsByName('twitter:description').item(0).content.toString()
      });

      const twitterDescriptionTwo = await pageTwo.evaluate(() => {
        return document.getElementsByName('twitter:description').item(0).content.toString()
      });

      //twitter image
      const twitterImage = await page.evaluate(() => {
        return document.getElementsByName('twitter:image').item(0).content.toString()
      });

      const twitterImageTwo = await pageTwo.evaluate(() => {
        return document.getElementsByName('twitter:image').item(0).content.toString()
      });


      //facebook
      //facebook title
      const facebookTitle = await page.evaluate(() => {
        return document.querySelector('meta[property="og:title"]').content.toString();
      });

      const facebookTitleTwo = await pageTwo.evaluate(() => {
        return document.querySelector('meta[property="og:title"]').content.toString();
      });

      //facebook descrition
      const facebookDescription = await page.evaluate(() => {
        return document.querySelector('meta[property="og:description"]').content.toString();
      });

      const facebookDescriptionTwo = await pageTwo.evaluate(() => {
        return document.querySelector('meta[property="og:description"]').content.toString();
      });

      //facebook image
      const facebookImage = await page.evaluate(() => {
        return document.querySelector('meta[property="og:image"]').content.toString();
      });

      const facebookImageTwo = await pageTwo.evaluate(() => {
        return document.querySelector('meta[property="og:image"]').content.toString();
      });

      //compares
      compare(title, titleTwo, 'title');
      compare(description, descriptionTwo, 'description');
      compare(keyword, keywordTwo, 'keyword');
      compare(canonical, canonicalTwo, 'canonical');
      compare(twitterCreator, twitterCreatorTwo, 'twitterCreator');
      compare(twitterSite, twitterSiteTwo, 'twitterSite');
      compare(twitterTitle, twitterTitleTwo, 'twitterTitle');
      compare(twitterDescription, twitterDescriptionTwo, 'twitterDescription');
      compare(twitterImage, twitterImageTwo, 'twitterImage');
      compare(facebookTitle, facebookTitleTwo, 'OG:title');
      compare(facebookDescription, facebookDescriptionTwo, 'OG:Description');
      compare(facebookImage, facebookImageTwo, 'OG:Image');
    await browser.close();

}
//functions
function compare (params1, params2, propriedade) {

  if(params1 == params2) {
      console.log(`${propriedade}: OK`);
  } else {
      console.log(`${propriedade}: FAIL`);
      console.log(propriedade+" live : " + params1);
      console.log(propriedade+" hshop: " +  params2);
  }

}

//call
ghost();


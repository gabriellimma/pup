const puppeteer = require('puppeteer');

console.log('starting...');


async function ghost() {
    //startup
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.samsung.com/se/accessibility/web-accessibility/');

    const pageTwo = await browser.newPage();
    await pageTwo.goto('https://hshopfront.samsung.com/se/accessibility/web-accessibility/');

    //insere a senha do hshop
    await pageTwo.type('#username', 'qauser');
    await pageTwo.type('#password', 'groqa1!');
    await pageTwo.keyboard.press('Enter');

    await pageTwo.waitForNavigation();
    
    //retorna os titles
    const title =  await page.evaluate(() => {
        return document.querySelector('head > title').text
      });

    const titleTwo =  await pageTwo.evaluate(() => {
        return document.querySelector('head > title').text
      });

      //description
      const description = await page.evaluate(() => {
        return document.querySelector('head > meta:nth-child(11)').content.toString();
      });

      const descriptionTwo = await pageTwo.evaluate(() => {
        return document.querySelector('head > meta:nth-child(11)').content.toString();
      });

      
      //keywords
      const keyword = await page.evaluate(() => {
        return document.querySelector('head > meta:nth-child(10)').content.toString();
      });

      const keywordTwo = await pageTwo.evaluate(() => {
        return document.querySelector('head > meta:nth-child(10)').content.toString();
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

      //facebook descrition

      //facebook image


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
      //output
     // console.log(title)
     // console.log(titleTwo)
      // console.log(description);
      // console.log(keyword);
      // console.log(canonical);
      // console.log(twitterCreator);
      // console.log(twitterSite);
      // console.log(twitterTitle);
      // console.log(twitterDescription);
      // console.log(twitterImage)

      //0
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
const puppeteer = require('puppeteer');

console.log('starting...');


async function ghost() {

    //abre as páginas
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.samsung.com/co/support/mobile-devices/galaxy-note8-how-to-create-a-gif/');

    const pageTwo = await browser.newPage();
    await pageTwo.goto('https://hshopfront.samsung.com/co/support/mobile-devices/galaxy-note8-how-to-create-a-gif/');

    //insere a senha do hshop
    await pageTwo.type('#username', 'qauser');
    await pageTwo.type('#password', 'groqa1!');
    await pageTwo.keyboard.press('Enter');

    await pageTwo.waitForNavigation();
    
    //retorna os atributos
    const title =  await page.evaluate(() => {
        return document.querySelector('head > title').text
      });

      const titleTwo =  await pageTwo.evaluate(() => {
        return document.querySelector('head > title').text
      });
   
      compare(title, titleTwo);

      function compare (params1, params2) {

        if(params1 == params2) {
            console.log(`${params1} é igual ao ${params2}`);
        } else {
            console.log(`${params1} NÃO é igual ao ${params2}`);
        }

      }

    console.log(title)
    console.log(titleTwo)
    await browser.close();

}


ghost();
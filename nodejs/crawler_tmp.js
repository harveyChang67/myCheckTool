/**
 * Require the puppeteer library.
 */
const puppeteer = require('puppeteer');

/**
 * Inside the main function we'll place all the required code
 * that will be used in the scraping process.
 * The reason why we create an async function is to use
 * the power of async programming  that comes with puppeteer.
 */
async function main() {
    /**
     * Launch Chromium. By setting `headless` key to false,
     * we can see the browser UI.
     */
    const browser = await puppeteer.launch({
        headless: false,

        // Add the following line.
        // args: ['--proxy-server=socks5://127.0.0.1:9050']
        // args: ['--proxy-server=http://127.0.0.1:8118']
    });

    /**
     * Create a new page.
     */
    const page = await browser.newPage();
    const useProxy = require('puppeteer-page-proxy');
    /**
     * Using the newly created page, navigate to https://api.ipify.org
     */
    for(var i=0; i<60; i++){
        var p = await browser.newPage();
        await useProxy(p, 'http://127.0.0.1:8118');
        await p.goto('https://api.ipify.org');
        await p.waitFor(1000);
    }


    /**
     * Wait 3 seconds and then close the browser instance.
     */
    setTimeout(() => {
        browser.close();
    }, 3000);
}

/**
 * Start the script by calling main().
 */
main();
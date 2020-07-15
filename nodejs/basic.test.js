/*
basic check
    response
    html-validate
    console.log
    all ajax 200
 */
const puppeteer = require('puppeteer');

const test_domain = "https://www.google.com";

//  just for sample
describe.each([
    ['/', ''],
])(test_domain, (testUrl, text) => {
    var browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        // await page.emulate(iPhonex);
        // await page.authenticate({username: user, password: pass});
        await page.goto(test_domain + testUrl, {waitUntil: 'load', timeout: 0});
    });

    afterAll(() => {
        browser.close()
    });

    it('should be titled "Google"', async () => {
        await expect(page.title()).resolves.toMatch('Google');
    });

});
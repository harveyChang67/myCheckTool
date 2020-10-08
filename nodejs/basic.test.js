/*
basic check
    response
    html-validate
    console.log
    all ajax 200
 */
const func = require('mylib/func');
const puppeteer = require('puppeteer');

const test_domain = "https://www.google.com";
jest.setTimeout(12000);
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

    it('Display:block', async () => {
        await func.checkCSSProperty(page, '#body > center', 'display', 'block');
    });

    //  Get in one time, check in one time
    it('The Google image should be correct', async () => {
        var img_rule = {
            alt: 'Google',
            src: expect.stringMatching(/.+\.png/),
            width: 272,
            height: 92
        };

        var img_el = await page.$eval('img#hplogo', el => {
            return {alt: el.alt, src: el.src, width: el.width, height: el.height}
        })

        expect(img_el).toMatchObject(img_rule);
    });

});
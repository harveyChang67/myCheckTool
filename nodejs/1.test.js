const puppeteer = require('puppeteer');

describe('Google', () => {
    var browser, page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            args: ['--no-sandbox']
        });
        page = await browser.newPage();
        await page.goto('https://google.com')
    })

    afterAll(() => {
        browser.close()
    });

    it('should display "google" text on page', async () => {
        await expect(page).toMatch('google')
    })
})
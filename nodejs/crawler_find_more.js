const puppeteer = require('puppeteer');

const targetUrl = '';
const targetSelector = '';
const moreSelector = '';

var browser, page, response = null;

(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    page.setViewport({width: 1280, height: 926});
// await page.emulate(iPhonex);
// await page.authenticate({username: user, password: pass});
    await page.goto(targetUrl, {waitUntil: 'load', timeout: 50000});
    await page.waitFor('img');

    do {
        var bMore = false;

        console.log(bMore);
        bMore = await page.$(moreSelector).then(res => !!res);
        console.log(bMore);
        if (bMore) {
            await page.hover(moreSelector);
            await page.click(moreSelector);
        } else {
            await page.hover('#l--footer > ul > li:nth-child(1) > a');
        }

        await page.waitFor(1000);
    } while (bMore);


    var dump_data = [];
    var shopUrls = await page.$$eval(targetSelector, e => e.map((el) => el.href));
    console.log(shopUrls.length);

    for (const url of shopUrls) {
        await page.goto(url, {waitUntil: 'load', timeout: 50000});
        await page.waitFor('img');

        const el = await page.$('body')
        const body_class = await (await el.getProperty('className')).jsonValue();

        console.log(url + '     :     ' + body_class);
        dump_data = dump_data.concat([
            {'url': url, 'body_class': body_class}
        ]);

        await page.waitFor(1000);
    }

    var fs = require('fs');
    var file = fs.createWriteStream('crawler_dump.txt');
    file.on('error', function (err) {
        Console.log(err)
    });
    dump_data.forEach(value => file.write(`${value.url}\t\t\t${value.body_class}\r\n`));
    file.end();

    browser.close();
})();
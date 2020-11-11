require('dotenv').config();
const func = require('./lib/func.js');
const puppeteer = require('puppeteer');

const target_url = process.env.single_target_url;
const target_selector = process.env.target_selector;
const cb_file_stream = eval(process.env.callback_file_stream);

var browser, page = null;
var dump_data = [];

(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    page.setViewport({width: 1280, height: 926});
    // await page.emulate(iPhonex);
    // await page.authenticate({username: user, password: pass});
    if (target_url) {
        await page.goto(target_url, {waitUntil: 'load', timeout: 50000});
    }
    await page.waitFor('img');

    if (target_url) {
        var dump_data = await page.$$eval(target_selector, e => e.map((el) => el.textContent));
        console.log(dump_data.length);
    }
    //  TODO:  Multiple Urls
    //
    // else if(){
    //
    // }

    //  TODO:  find in 1st page and to findout something in 2nd Page

    if (dump_data) {
        //  write to file
        var fs = require('fs');
        var file = fs.createWriteStream('crawler_dump.txt');
        file.on('error', function (err) {
            Console.log(err)
        });
        dump_data.forEach(function (item) {
            cb_file_stream(file, item);
        }, file);
        file.end();
    }

    //  close puppeteer
    browser.close();
})();
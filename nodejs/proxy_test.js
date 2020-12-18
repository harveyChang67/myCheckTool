/**
 * Require the puppeteer library.
 */
const puppeteer = require('puppeteer');

const proxy_list = require(__dirname+'/data/proxy_list.json');
const fs_checked = require('fs');
const proxy_ok_list_filename = `output/proxy_ok_list.json`;
fs_checked.openSync(proxy_ok_list_filename, 'w');

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
    const useProxy = require('puppeteer-page-proxy');
    /**
     * Using the newly created page, navigate to https://api.ipify.org
     */

    for (var i = 0, i_max = proxy_list.length; i < i_max; i++)
    {
        var p = await browser.newPage();
        await p.setUserAgent("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0");

        await useProxy(p, proxy_list[i]);
        try {
            console.log(proxy_list[i]);
            var response = await p.goto(
                'https://api.ipify.org'
                , {
                waitUntil: 'load',
                // Remove the timeout
                timeout: 5000
            });
            await p.waitFor(3000);

            console.log(response.status());

            if (response.status() == 200) {

                console.log(response.status());
                fs_checked.appendFile(proxy_ok_list_filename, `"${proxy_list[i]}"\r`, function (err) {
                    console.log(err ? err : `Append:`);
                });
            }

        } catch (e) {
            // console.log('**** FAIL ****')
            // console.error(e)
            await p.close()
        }

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
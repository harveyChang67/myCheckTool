const {Cluster} = require('puppeteer-cluster');
const useProxy = require('puppeteer-page-proxy');

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 25,
        monitor: true,
    });

    await cluster.task(async ({page, data: url}) => {
        let ts = Date.now();
        await useProxy(page, 'http://127.0.0.1:8118');

        await page.goto(url, {
            waitUtil: "networkidle2"
        });
        const path = 'screenshot/' + url.replace(/[^a-zA-Z]/g, '_') + '_' + ts + '.png';
        const screen = await page.screenshot({path});
        // Store screenshot, do something else
        await page.waitFor(300);
    });

    // In case of problems, log them
    cluster.on('taskerror', (err, data) => {
        console.log(`  Error crawling ${data}: ${err.message}`);
    });

    for (var i = 0; i < 40; i++) {
        cluster.queue('https://api.ipify.org');
    }

    await cluster.idle();
    await cluster.close();
})();
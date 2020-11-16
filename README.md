#   Puppeteer + Jest

Get in one time, check in one time.

```javascript
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
```

TODO: Rule -> Auto get attribute.


#   Crawler
## using Proxy
- git clone https://github.com/zet4/alpine-tor.git
- require('puppeteer-page-proxy');
```javascript
    const useProxy = require('puppeteer-page-proxy');
    var page = await browser.newPage();
    await useProxy(page, 'http://127.0.0.1:8118');      //  <-- alpine-tor
```

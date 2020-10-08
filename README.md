#   myCheckTool

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
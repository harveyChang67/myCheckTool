//  click element.A -> element.B display:block
async function clickToDisplay(_page, _selector, _toDisplay) {
    await _page.click(_selector);
    await _page.waitFor(3000);
    var bDisplay = await _page.$eval(_toDisplay, (el) => window.getComputedStyle(el).getPropertyValue("display"));
    await _page.waitFor(3000);
    //  check open
    expect(bDisplay).toBe('block');
}

//  checkCSSProperty
async function checkCSSProperty(_page, _selector, _property, expect_value) {
    let el = await _page.$eval(_selector, (element, property) => window.getComputedStyle(element).getPropertyValue(property), _property);
    expect(el).toBe(expect_value);
}

//  TODO: checkMultipleElementCSSProperty
async function checkMultiCSSProperty(_page, _selector, _property, _expect) {

}

//  TODO: checkMultikUrlPattern
async function checkMultikUrlPattern(_page, _selector, _property, _expect) {

}

//  TODO: getAllUrlOnPage
async function getAllUrlOnPage(_page) {
    // var links = await page.$$eval('a', e => e.map(
    //     els => ({href: els.href, content: els.textContent,})
    //     // els => [els.href, els.textContent]
    // ));
    //
    // // console.log(links);
    //
    // for(var item of links){
    //     result = await page.click(item.href);    //  goto  ?
    //     expect(result.status()).toBe(200);
    // }
}


module.exports = {
    clickToDisplay: clickToDisplay,
    checkCSSProperty: checkCSSProperty,
};
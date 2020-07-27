//  TODO: click element.A -> element.B display:block
async function clickToDisplay(_page, _selector, _toDisplay, expect_value) {
    await _page.click(_selector);
    await _page.waitFor(1000);
    //  check open
    expect(await _page.$eval(_toDisplay, (el) => window.getComputedStyle(el).getPropertyValue("display"))).toBe('block');
}

//  TODO: checkCSSProperty
async function checkCSSProperty(_page, _selector, _property, _expect) {
    var _el = await _page.$eval(_selector, (el, _property) => window.getComputedStyle(el).getPropertyValue(_property));
    expect(_el).toBe(_expect);
}

//  TODO: checkMultipleElementCSSProperty
async function checkMultiCSSProperty(_page, _selector, _property, _expect) {
    var _el = await _page.$eval(_selector, (el, _property) => window.getComputedStyle(el).getPropertyValue(_property));
    expect(_el).toBe(_expect);
}
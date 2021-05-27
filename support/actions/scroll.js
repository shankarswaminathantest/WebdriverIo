/**
 * Scroll the page to the given element
 * @param  {String}   selector Element selector
 */
export function scroll (selector) {
    $(selector).scrollIntoView();
};

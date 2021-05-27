/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   selector Element selector
 */
export function clearInputField (selector) {
    $(selector).clearValue();
};
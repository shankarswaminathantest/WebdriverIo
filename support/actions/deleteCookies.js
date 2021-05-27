/**
 * Delete a cookie
 * @param  {String}   name The name of the cookie to delete
 */
export function deleteCookies (name) {
    browser.deleteCookies(name);
};

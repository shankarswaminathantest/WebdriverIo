/**
 * Check the URL of the given browser window
 * @param  {String}   falseCase   Whether to check if the URL matches the
 *                                expected value or not
 * @param  {String}   expectedUrl The expected URL to check against
 */
export function checkUrl (falseCase, expectedUrl) {
    /**
     * The current browser window's URL
     * @type {String}
     */
    const currentUrl = browser.getUrl();

    if (falseCase) {
        expect(currentUrl)
            .not.toContain(expectedUrl, `expected url not to be "${currentUrl}"`);
    } else {
        expect(currentUrl).toContain(
            expectedUrl,
            `expected url to be "${expectedUrl}" but found `
            + `"${currentUrl}"`
        );
    }
};

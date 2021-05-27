/**
 * Open the given URL
 * @param  {String}   type Type of navigation (url or site)
 * @param  {String}   page The URL to navigate to
 */
export function openWebsite (type , page) {
    const url = (type === 'url') ? page : browser.options.baseUrl + page;
    browser.url(url);
    browser.setCookies({name: 'CONSENTMGR', value: 'consent:true'});
    browser.url(url);
    console.log("URL address of current page: "+browser.getUrl()+" Consent Mgr Cookie details"+JSON.stringify(browser.getCookies(['CONSENTMGR'])));
    if($("#consent_prompt_submit").isDisplayed()) {
        $("#consent_prompt_submit").click();
    }
}
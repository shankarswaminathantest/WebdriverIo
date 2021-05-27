import {When} from 'cucumber';
import accountingSystem from '../../pages/sugar/accountingSystem';
import analytics from '../../pages/sugar/analytics';
import appsflyer from '../../pages/sugar/appsflyer';
import banking from '../../pages/sugar/banking';
import companyDetails from '../../pages/sugar/companyDetails';
import login from '../../pages/sugar/login';
import products from '../../pages/sugar/products';
import registration from '../../pages/sugar/registration';
import welcome from '../../pages/sugar/welcome';

When(/^I enter login details$/, function () {
    login.enterLoginDetails();
});

When(/^I select "([^"]*)?" company name$/, function (companyName) {
   companyDetails.enterCompanyName(companyName);
});

When(/^I enter phone number as "([^"]*)?"$/, function (phoneNumber) {
   companyDetails.enterPhoneNumber(phoneNumber);
});

When(/^I proceed with submit button$/, function () {
    companyDetails.clickOnSubmit();
});

When(/^I enter registration details$/, function () {
    registration.registerUser();
});

When(/^I select product$/, function () {
    products.clickOnApplyNow();
});

When(/^I click on start integrations$/, function () {
    welcome.clickOnStartIntegration();
});

When(/^I click on appsflyer$/, function () {
    analytics.clickOnAnalytics();
});

When(/^I click on Next button on appsflyer page$/, function () {
    appsflyer.clickOnNextButton();
});

When(/^I click on Next button on banking page$/, function () {
    banking.clickOnNextButton();
});

When(/^I click on Next button on accounting system page$/, function () {
    accountingSystem.clickOnNextButton();
});

When(/^I click on continue button$/, function () {
    products.clickOnApplyNow();
});

When(/^$/, function () {
    
});

When(/^$/, function () {
    
});

When(/^$/, function () {
    
});

When(/^I enter verification code$/, function () {
    
});
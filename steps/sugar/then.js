import { Then } from 'cucumber';
import accountingSystem from '../../pages/sugar/accountingSystem';
import activateAccount from '../../pages/sugar/activateAccount';
import analytics from '../../pages/sugar/analytics';
import appsflyer from '../../pages/sugar/appsflyer';
import banking from '../../pages/sugar/banking';
import companyDetails from '../../pages/sugar/companyDetails';
import login from '../../pages/sugar/login';
import products from '../../pages/sugar/products';
import welcome from '../../pages/sugar/welcome';

Then(/^I should be on company details page$/, function () {
    companyDetails.isOnCompanyDetailsPage();
});

Then(/^I should be on login page$/, function () {
   login.isOnLoginPage(); 
});

Then(/^I should be on activate account page$/, function () {
    activateAccount.isOnActivateAccountPage(); 
 });

Then(/^I should be on product details page$/, function () {
     products.isOnProductsPage();
 });

Then(/^I should be on welcome page$/, function () {
    welcome.isOnWelcomePage();
});

Then(/^I should be on analytics page$/, function () {
    analytics.isOnAnalyticsPage();
});

Then(/^I should be on appsflyer page$/, function () {
    appsflyer.isOnAppsflyerPage();
});

Then(/^I should be on banking page$/, function () {
    banking.isOnBankingPage();
});

Then(/^I should be on accounting system page$/, function () {
    accountingSystem.isOnAccountingSystemPage();
});

Then(/^$/, function () {
    
});

Then(/^$/, function () {
    
});

Then(/^$/, function () {
    
});

Then(/^$/, function () {
    
});

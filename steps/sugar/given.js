import {Given} from 'cucumber';
import login from '../../pages/sugar/login';
import registration from '../../pages/sugar/registration';
import {openWebsite} from '../../support/actions/openWebsite';

Given(/^I am on login page$/, function () {
    openWebsite('url', login.url);
});

Given(/^I am on registration page$/, function () {
    openWebsite('url', registration.url);
});

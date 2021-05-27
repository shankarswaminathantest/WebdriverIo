const { config } = require('./wdio.shared.conf');
const { join } = require('path');
config.hostname= 'localhost';
config.port=4444;
config.path= '/wd/hub';
config.capabilities= [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5,
        //
        browserName: 'chrome',
        acceptInsecureCerts : true,
        'goog:chromeOptions': {
            prefs: {
                'directory_upgrade': true,
                'prompt_for_download': false,
                'download.default_directory': downloadDir},
            args: ['--no-sandbox','--start-maximized','--disable-infobars','--enable-automation','--disable-popup-blocking','--allow-running-insecure-content']
        },
        'cjson:metadata': {
            // For a browser
             device: 'Local Machine',
             platform: {
                version: 'Win 10 Pro'
           }
        }
      }];

config.services= ['chromedriver'] ; 
exports.config = config;
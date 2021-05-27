const { config } = require('./wdio.shared.conf');
config.hostname= 'localhost';
config.port=4444;
config.path= '/wd/hub';
const { join } = require('path');
config.capabilities= [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        //maxInstances: 10,
        //
        browserName: 'chrome',
        acceptInsecureCerts : true,
        'goog:chromeOptions': {
          prefs: {
            'directory_upgrade': true,
            'prompt_for_download': false,
            'download.default_directory': downloadDir},
          args: ['--no-sandbox','disable-web-security','start-maximized','disable-infobars','ignore-certificate-errors',
          'enable-automation','disable-popup-blocking','allow-running-insecure-content','allow-insecure-localhost']
        },
        'cjson:metadata': {
            // For a browser
             device: 'Docker',
          }
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    },
    /*{
      maxInstances: 5,
      browserName: 'firefox',
        'cjson:metadata': {
            // For a browser
             device: 'Docker',
            }
    }*/
    ];
    exports.config = config;

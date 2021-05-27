const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
const cucumberJson = require('wdio-cucumberjs-json-reporter').default;
require('dotenv').config()
const { ReportAggregator, HtmlReporter } = require('@rpii/wdio-html-reporter') ;
var log4j = require('log4js');
var excludeTests='none';
const path = require('path');
const fs = require('fs');
var fse = require('fs-extra');
var destDir = './reports/downloads';
global.downloadDir = '/var/tmp/';
const del=require('del');
global.jUnitDir = './reports/junit/';
require('global-agent/bootstrap');
var max_parallel_browsers=6;

if (process.env.server === ("sugar_stage")||process.env.server === ("sugar_qa")||process.env.server === ("sugar_prod")){
    global.Config = require('./data/config-stage');
}
exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './features/**/*.feature'
           ],

    suites: {
        sugar: ['./features/sugar/**']  
      },
    // Patterns to exclude.doc
    exclude: [ excludeTests
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: max_parallel_browsers,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    /*capabilities: [{

        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 10,
        //
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--start-maximized','--disable-infobars','--enable-automation','--disable-popup-blocking','--allow-running-insecure-content']},
        'cjson:metadata': {
            // For a browser
             device: 'HP Elite Book',
             platform: {
                version: 'Win 10 Pro'
           }

            }
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    },
    {
        browserName: 'firefox',
        'cjson:metadata': {
            // For a browser
             device: 'Docker',
           }
    },
    ],*/
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'warn',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    baseUrl:process.env[process.env.server]  ,  //url[process.env.server],
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 65000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.

    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters:  [
     'spec',
     // OR like this if you want to set the folder and the language
     [ 'cucumberjs-json', {
            jsonFolder: 'reports/json/',
            language: 'en',
        },
     ],
     ['junit', {
      outputDir: 'reports/junit',
      outputFileFormat: function(opts) { // optional
         return `results-${opts.cid}.${opts.capabilities.browserName}.xml`
      }
     }]
    ],

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: [
            "./steps/**/given.js",
            "./steps/**/when.js",
            "./steps/**/then.js"
          ],      // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        requireModule: ['@babel/register'],  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tagExpression: '',  // <string> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 65000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: true,
        //retry:true, // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        // Remove the `.tmp/` folder that holds the json and report files
      removeSync('reports/');
      var listfilenames = fs.readdirSync(downloadDir);
      console.log("\nCurrent Download Directory filenames list is - This is the folder on sel host node on jenkins as it is mapped to chrome var tmp:");
      listfilenames.forEach(file => {
        console.log("Download Dir "+downloadDir+" "+file);
      });

      (async () => {
      const deletedPaths = await del(['/var/tmp/*.jpg'], {force: true});
      const deletedPaths1 = await del(['/var/tmp/*.tif'], {force: true});
      const deletedPaths2 = await del(['/var/tmp/*.pdf'], {force: true});
      const deletedPaths3 = await del(['/var/tmp/*.png'], {force: true});
      const deletedPaths10 = await del(['/var/tmp/*.eps'], {force: true});
      const deletedPaths11 = await del(['/var/tmp/*.gif'], {force: true});
      const deletedPaths12 = await del(['/var/tmp/*.crdownload'], {force: true});

      console.log('Files and directories that was deleted:\n', deletedPaths.join('\n') ,deletedPaths1.join('\n'), deletedPaths2.join('\n'), deletedPaths3.join('\n'), deletedPaths10.join('\n'), deletedPaths11.join('\n'), deletedPaths12.join('\n'));
      })();
     // const del=require('del');
      //del(['Reports']);
     // del(['Reports/allure-results','Reports/html-reports','allure-report','Reports/junit','Reports/jsonReport','Reports']);
     },
      /**
       * Gets executed after all workers got shut down and the process is about to exit.
       */
      onComplete: function (capabilties, specs) {
       //  Generate the report when it all tests are done
        generate({
          // Required
          // This part needs to be the same path where you store the JSON files
          // default = '.tmp/json/'
          jsonDir: 'reports/json/',
          reportPath: 'reports/html/',
                // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });

         // if folder doesn't exists create it
         if (!fs.existsSync(destDir)){
            fs.mkdirSync(destDir, { recursive: true });
        }

        console.log("\nCurrent content of local reports/download  Directory before copy function:");
        var listfilenames10 = fs.readdirSync(destDir);
        listfilenames10.forEach(file => {
          console.log("destDir "+destDir+" "+"File in workspace copied now is : "+file);
        });

        // copy directory, even if it has subdirectories or files
          try{
            fse.copySync(downloadDir, destDir);
            console.log("Copied Files")
            } catch (err){
                console.log("Necessary files copied");
            }

                var listfilenames1 = fs.readdirSync(destDir);
                console.log("\nCurrent dest directory filenames are -after copy:");
                listfilenames1.forEach(file => {
                console.log("destDir "+destDir+" "+"File in workspace copied now is : "+file);
                });

        (async () => {
                const deletedPaths4 = await del([downloadDir+'*.jpg'], {force: true});
                const deletedPaths5 = await del([downloadDir+'*.tif'], {force: true});
                const deletedPaths6 = await del([downloadDir+'*.pdf'], {force: true});
                const deletedPaths7 = await del([downloadDir+'*.png'], {force: true});
                const deletedPaths20 = await del([downloadDir+'*.eps'], {force: true});
                const deletedPaths21 = await del([downloadDir+'*.gif'], {force: true});

                console.log('Files and directories that would be deleted in workspace downloaded folder:\n', deletedPaths4.join('\n'), deletedPaths5.join('\n'), deletedPaths6.join('\n'), deletedPaths7.join('\n'), deletedPaths20.join('\n'), deletedPaths21.join('\n'));
            })();

            //jUnitDir - For deleting any 0 filesize - as cucumber tags results in zero size files. Reporting goes wrong.

            fs.readdir(jUnitDir, function (err, files) {
                //handling error
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                }
                //listing all files using forEach
                files.forEach(function (file) {
                    var {size} = fs.statSync( jUnitDir+file);
                    if(size<1){
                        console.log(jUnitDir+file); //sharing the file names about to get deleted.
                        fs.unlinkSync(jUnitDir+file); //deleting file
                    }
                });
            });
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     /*beforeSession: function (config, capabilities, specs) {
        require("@babel/register");
     },*/
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
     before: function (capabilities, specs) {
       //global variables

     },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Runs before a Cucumber feature
     */
    // beforeFeature: function (uri, feature, scenarios) {
    // },
    /**
     * Runs before a Cucumber scenario
     */
     beforeScenario: function (uri, feature, scenario, sourceLocation) {
        var assert=require('assert');
     },
    /**
     * Runs before a Cucumber step
     */
     beforeStep: function ({ uri, feature, step }, context) {
        cucumberJson.attach("Current URL Before Step: " + browser.getUrl());
     },
    /**
     * Runs after a Cucumber step
    *
    */
    afterStep: function(uri, feature, { error,passed }) {
        if (error !== undefined) {
            cucumberJson.attach(browser.takeScreenshot(), 'image/png');
            cucumberJson.attach("Current URL After Step: " + browser.getUrl());
        }
       // const allCookies = browser.getCookies()
       // console.log(allCookies);
    },

    /*

  // afterStep: function ({ uri, feature, step }, context, { error, result, duration, passed, retries })
    // {}}
    * Runs after a Cucumber scenario
     */
     afterScenario: function (uri, feature, scenario, result, sourceLocation) {
        cucumberJson.attach(browser.takeScreenshot(), 'image/png');
        cucumberJson.attach("Current URL After Scenario: " + browser.getUrl());
    },
    /**
     * Runs after a Cucumber feature
     */
    // afterFeature: function (uri, feature, scenarios) {
    // },

    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function(exitCode, config, capabilities, results) {
    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
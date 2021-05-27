Requirements: Node (ver 12.13.1) and Java are installed already.

Default Branch for Repo: Develop

Jenkins job: 

Quick start:

1. Clone the repo from repository
2. Run npm install in the base folder (where the package.json is present)
3. Run below command
On bash terminal: server below means which test environment to be used for test execution

Command: server=sugar_qa npm run local_chrome -- --spec loggedin-user-entering-details.feature
(for local execution on ver 83 of chrome)

Command : server=sugar_qa npm run docker_grid_jenkins
(for Selenium Grid in dockerized envn)

Command: server=sugar_qa npm run android.browser
(to run on local with Emulator or real device, will Android Studio installed with AVD & ADB)

(Command to install relevant version chromedriver with appium - use below -
npm install appium --chromedriver_version="83.0.4103.39")
**********************************************************
Environment-specific configurations

Test Environment- Options to pass in command line:

i.e. server=sugar_qa npm run local_chrome -- --spec loggedin-user-entering-details.feature
Some other options:
**********************************************************
How to run the test - details for Test Execution:

STEP 1: To get all the dependencies for the test execution

After cloning repository - go to the folder where package.json file is present and run command -> npm i (this will install all the dependencies. It is not best practice to save node_modules folder in the repo, whenever this repo will be cloned, npm i command must follow that to get dependencies before executing tests)

STEP 2: To run test locally using Chrome (ver 83): By default execution takes place on production website.

via Bash Command Prompt to execute local chrome test:

server=sugar_qa npm run local_chrome
for stage: npm run local_chrome -- --baseUrl="https://dashboard.stage.add-sugar.io/"

If you want to change chrome driver to match your local chrome version then update this setting with the desired version number in package.json
"chromedriver": "^83.0.0" and run npm i [this will download the requested version of chrome driver]

STEP 2a: To run tests on selenim grid, you will need to provide the port number and selenium host name or ip

Using Bash :
server=sugar_stage npm run docker_grid_jenkins

by default it will look for selelnium-hub as hostname.

STEP 2b: Jenkins free style job example set up, two build commands:
Build:
Execute Windows batch command
npm i
Execute Windows batch Command
server=sugar_stage npm run docker_grid_jenkins

STEP 2c: You can create a dockerized local selenium grid by running this command in root folder of project where docker-compose.yaml is present
Execute this command: docker-compose up -d selenium-hub chrome-dbug firefox-dbug
To shut down the grid and stop docker containers- execute this command: docker-compose down
Example command to run tests:
server=sugar_stage npm run docker_grid

Configurations:
Note: Currently there are multiple config files.
i.e for local chrome - wdio.conf.js
*******************************

Running single feature
Use spec options.

server=sugar-prod npm run local_chrome -- --spec loggedin-user-entering-details.feature
*******************************
How to write a test
CREATING NEW TEST:
1. Create a feature file in features folder. Further add sub folders to segregate the apps.
2. Create Step definitions in steps folder. Further add sub folders to segregate the apps.
   Each app to have three .js file - given.js, when.js and then.js
   All the given, when and then statements should map to these files.
3. Create Page Objects in pages folder. Further add sub folders to segregate the apps.
   Locators to be configured with get method. (Use SNY folder for example purpose)
4. Write common methods which can be used by multiple tests in support folder.
   You can also write common assertions in here.
5. Data folder contains common static data for easy reference and upgradation

P.S: Please add comments where suitable as best practice for others.

*******************************

To force add baseline images when copied over from :
git add -f data/baseline/desktop_chrome/*.*

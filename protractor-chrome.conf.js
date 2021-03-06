/**
 * Created by fkabir on 11/10/2015.
 */
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var reporters = require('jasmine-reporters');

exports.config = {
    //Selenium standalone server set up: Option 1  ##Start the Selenium server manually
    //seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    //http://10.126.68.:4444/wd/hub

    //Selenium standalone server set up: Option 2
    //If using seleniumServerJar, do not specify seleniumAddress !!!
    seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',
    //port of the server
    seleniumPort: 4444,
    seleniumArgs: ['-browserTimeout=60'],  //End Option 2

    directConnect: true,

   // specs: ['test/e2e/protractor_and_jenkins-test setup/**/*_spec.js'],
    specs: ['test/e2e/tests/**/*_spec.js'],

    capabilities: {
        'browserName': 'chrome'
    },
    params: {

        users: {
            orgAdmin: {
                username: 'org_admin',
                password: 'password'
            },
            //siteAdmin: {
            //    username: 'canary',
            //    password: 'steelthread-2010'
            //},
            orgUserObserver: {
                username: 'org_user_observer',
                password: 'password'
            },
            orgUser: {
                username: 'org_user',
                password: 'password'
            }
        },
        url: {
            baseUrl: 'https://dev-cicm-canary-1.dev.uspto.gov/'

        },
        release: {
            release_name: 'release_3'

        },
        email: {
            valid_email: 'getkabir@gmail.com',
            invalid_email: 'BAD_EMAIL@FAKE.COM',
            incomplete_email: 'INCOMPLETE'
        },
        organization: {
            organization_name: 'uspto/'
        },
        workspace:{
            workspace_id: 'WS-10077/'
        },
    },
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 180000
    },
    onPrepare: function() {
        require('protractor-linkuisref-locator')(protractor);

        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({displayStackTrace: true, displaySpecDuration: true}));

        jasmine.getEnv().addReporter(new HtmlScreenshotReporter({
            dest: 'reports/e2e/chrome/screenshots',
            filename: 'canary-report-chrome.html',
            captureOnlyFailedSpecs: true
        }));

        jasmine.getEnv().addReporter(new reporters.JUnitXmlReporter({
            savePath: 'reports/e2e/chrome',
            consolidateAll: false
        }));

        browser.driver.manage().window().maximize();
    }
};
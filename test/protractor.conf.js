/**
 * Created by vyom.sharma on 26-11-2014.
 */

var reportPath = "";
var urlToTest = "";
var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');
exports.config = {
  seleniumAddress: 'http://10.140.2.105:4444/wd/hub',
  params:
  {
    config:
    {
      testDataPath: 'TestDataNew.xlsx',
      zipCode: '',
      county: '',
      emailAddress: '',
      phoneNumber: '',
      urlToTest: 'https://partner-test.qa-pachyderm.com/#/postal-code/',
      testToExecute:[],
      autoGen:'false',
      sheetId:null,
      curLocation: ""
    }
  },

  multiCapabilities: [
    {
      platform: "WINDOWS",
      browserName: 'firefox',
      shardTestFiles: true,
      maxInstances: 1 // Use number of instances you want
    },
    {
      platform: "WINDOWS",
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 1 // Use number of instances you want
    },
    {
      platform: "LINUX",
      browserName: 'firefox',
      shardTestFiles: true,
      maxInstances: 1 // Use number of instances you want
    },
    {
      platform: "LINUX",
      browserName: 'chrome',
      shardTestFiles: true,
      maxInstances: 1 // Use number of instances you want
    },
    {
      platform: "WINDOWS",
      browserName: 'internet explorer',
      version: "11",
      shardTestFiles: true,
      maxInstances: 1 // Use number of instances you want
    },
    {
      platform: "WINDOWS",
      browserName: 'internet explorer',
      version: "10",
      shardTestFiles: true,
      maxInstances: 1 // Use number of instances you want
    }
  ],

  specs: ['e2e/specs/md/*.js','e2e/specs/va/*.js','e2e/specs/tx/*.js'],

  suites:
  {
    va: 'e2e/specs/va/*.js',
    md: 'e2e/specs/md/*.js',
    tx: 'e2e/specs/tx/*.js'
  },

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 1500000
  },

  onPrepare: function () {
    browser.driver.manage().window().maximize();

    reportPath = browser.params.config.curLocation;
    urlToTest = browser.params.config.urlToTest;

    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'reports',
      preserveDirectory: true,
      metaDataBuilder: function metaDataBuilder(spec, descriptions, results, capabilities) {
        var itemLength = (results.items_ != undefined ? results.items_.length : 0) - 1;

        return {
          urlTested: urlToTest,
          description: descriptions.join(' '),

          passed: results.passed(),
          message: itemLength >= 0 ? results.items_[itemLength].message : undefined,
          trace: itemLength >= 0 ? results.items_[itemLength].trace + "" : undefined,

          testCaseId: spec.id,
          finishTime: spec.finishTime,
          finishedAt: spec.finishedAt,

          os: capabilities.caps_.platform,
          browserName: capabilities.caps_.browserName,
          browserVersion: capabilities.caps_.version
        };
      },
      pathBuilder: function pathBuilder(spec, descriptions, results, capabilities)
      {
        var date = new Date();
        var month = (date.getMonth() + 1).toString();
        month = (month.length > 1 ? "" : "0") + month;
        var day = date.getDate().toString();
        day = (day.length > 1 ? "" : "0") + day;

        if(reportPath == "" || reportPath == undefined)
        {
          reportPath = day + '-' + month + '-' + date.getFullYear() + '-' + date.getHours();
        }

        var browserDetails = capabilities.caps_.platform + " " + capabilities.caps_.browserName + " " + capabilities.caps_.version;
        var timeCode = date.getHours() + " " + date.getMinutes() + " " + date.getSeconds();

        return path.join(reportPath, browserDetails, descriptions.join('-') + timeCode);
      }
    }));
  },
  allScriptsTimeout: 300000
};

this.GetNumberToString = function(number)
{
  var value = number.toString();
  return (value.length > 1 ? "" : "0") + value;
};

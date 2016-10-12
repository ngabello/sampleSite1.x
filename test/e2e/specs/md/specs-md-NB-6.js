'use strict';

describe('Start MD-NB-6 test flow', function () {
  var StandardTestCaseFlow = require('./../../StandardTestCaseFlow.js');
  var standardTestCaseFlow = new StandardTestCaseFlow();
  standardTestCaseFlow.ExecuteTest({ zipCode: 20601,sheetId:1,testName:'NB-6' ,State:'MD' });

});

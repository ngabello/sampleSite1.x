'use strict';

describe('Start MD-NB-5 test flow', function () {
  var StandardTestCaseFlow = require('./../../StandardTestCaseFlow.js');
  var standardTestCaseFlow = new StandardTestCaseFlow();
  standardTestCaseFlow.ExecuteTest({ zipCode: 20601,sheetId:1,testName:'NB-5' ,State:'MD' });

});

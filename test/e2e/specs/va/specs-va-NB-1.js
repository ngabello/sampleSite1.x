/**
 * Created by vyom.sharma on 05-02-2015.
 */

'use strict';

describe('Start VA-NB-1 test flow', function () {
  var StandardTestCaseFlow = require('./../../StandardTestCaseFlow.js');
  var standardTestCaseFlow = new StandardTestCaseFlow();
  standardTestCaseFlow.ExecuteTest({ zipCode: 20130,sheetId:3,testName:'NB-1',State:'VA' });
});

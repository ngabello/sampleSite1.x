/**
 * Created by vyom.sharma on 05-02-2015.
 */

'use strict';

describe('Start VA-NB-8 test flow', function () {
  var StandardTestCaseFlow = require('./../../StandardTestCaseFlow.js');
  var standardTestCaseFlow = new StandardTestCaseFlow();
  standardTestCaseFlow.ExecuteTest({ zipCode: 20130,sheetId:3,testName:'NB-8' ,State:'VA'});
});

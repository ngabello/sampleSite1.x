/**
 * Created by vyom.sharma on 05-02-2015.
 */

'use strict';

describe('Start TX-NB-1 test flow', function () {
  var StandardTestCaseFlow = require('./../../StandardTestCaseFlow.js');
  var standardTestCaseFlow = new StandardTestCaseFlow();
  standardTestCaseFlow.ExecuteTest({ zipCode: 75847 ,sheetId:2,testName:'NB-1',State:'TX' });

});


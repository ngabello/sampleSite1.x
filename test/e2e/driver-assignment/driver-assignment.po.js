/**
 * Created by vyom.sharma on 22-12-2014.
 */

var driverAssignment = function ()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.btnContinue = by.id('btnContinue');

  this.assignDriver = function (obj)
  {
      var dvList=helper.assignDrivers(obj);

  };


  this.clickContinue = function ()
  {
    helper.click(this.btnContinue);
  };
};

module.exports = driverAssignment;


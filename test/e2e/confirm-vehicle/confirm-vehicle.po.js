/**
 * Created by vyom.sharma on 26-12-2014.
 */

var ConfirmVehicle = function ()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.btnContinue = by.id('btnContinue');

  this.setValues=function(obj)
  {
    helper.setValuesOnConfirmVehiclePage(obj);
  };


  this.clickContinue = function ()
  {
    helper.click(this.btnContinue);
  };

};

module.exports=ConfirmVehicle;


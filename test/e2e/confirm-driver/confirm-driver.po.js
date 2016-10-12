/**
 * Created by vyom.sharma on 26-12-2014.
 */

var ConfirmDriver = function ()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.btnContinue = by.tagName('button');

  this.setValues=function(obj)
  {
    helper.setValuesOnConfirmDriverPage(obj);
  };


  this.clickContinue = function ()
  {
    helper.click(this.btnContinue);
  };

};

module.exports=ConfirmDriver;

/**
 * Created by vyom.sharma on 02-12-2014.
 */

var PostalCode = function()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.zipCode = by.model('zipCode');
  this.btnStartQuote = by.id('btnStartQuote');

  this.setValues = function (zipCode)
  {
    this.setZipCode(zipCode);
  };

  this.setZipCode = function(zipCode)
  {
    helper.setText(this.zipCode, zipCode);
  };

  this.clickContinue = function()
  {
    helper.click(this.btnStartQuote);
  };
};

module.exports = PostalCode;

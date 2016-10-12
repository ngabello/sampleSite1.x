/**
 * Created by vyom.sharma on 08-12-2014.
 */
var Discount = function () {

  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();
  this.EmailAddress = by.model('policyHolder.EmailAddress');
  this.EmailAddressConfirm = by.model('policyHolder.EmailAddressConfirm');
  this.SocialSecurityNumber = by.model('policyHolder.SocialSecurityNumber');
  this.btnContinue = by.id('btnContinue');




  this.setValues = function (obj) {
    //this.setEmailAddress( obj.EmailAddress);
    this.setEmailAddressConfirm(obj.EmailAddress);
    this.setSocialSecurityNumber(obj.SocialSecurityNumber);
  };

  this.setEmailAddress = function (emailAddress)
  {
   // console.log('emailAddress='+emailAddress);
    helper.setText(this.EmailAddress, emailAddress,true);
  };

  this.setEmailAddressConfirm = function (emailAddress)
  {
    //console.log('emailAddressConf='+emailAddress);
    helper.setText(this.EmailAddressConfirm, emailAddress,true);
  };

  this.setSocialSecurityNumber = function (socialSecurityNumber)
  {
    var hassocialSecurityNumber=socialSecurityNumber == undefined || socialSecurityNumber!='' ? false : true;
    if(hassocialSecurityNumber)
    {
      helper.setText(this.SocialSecurityNumber, socialSecurityNumber);
    }

  };

  this.clickContinue = function ()
  {
    helper.click(this.btnContinue);
  };


};

module.exports = Discount;

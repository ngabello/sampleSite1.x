/**
 * Created by vyom.sharma on 06-01-2015.
 */

var Billing = function ()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.creditCardName = by.model('billingSummary.bindRequest.CreditCard.Name');
  this.creditCardNumber=by.model('billingSummary.bindRequest.CreditCard.Number');
  this.creditCardExpDate=by.model('billingSummary.bindRequest.CreditCard.ExpirationDate');


  this.radioBtnBillingAddress = 'billingSummary.paymentDetails.billingAddress';
  this.billingStreetUpdate=by.id('billingStreetUpdate');
  this.billingAptUpdate=by.id('billingAptUpdate');
  this.billingCityUpdate=by.id('billingCityUpdate');
  this.billingStateUpdate=by.id('billingStateUpdate');
  this.billingZipUpdate=by.id('billingZipUpdate');
  this.billingPhone=by.model('billingSummary.bindRequest.PhoneNumber');
  this.esigInitials=by.id('esigInitials');
  this.billingSummaryInitials=by.model('billingSummary.initials');
  this.btnPurchase=by.tagName('button');

  this.setValues=function(obj)
  {
    this.setCreditCardName(obj.CreditCardName);
    this.setCreditCardNumber(obj.CreditCardNumber);
    this.setCreditCardExpDate(obj.CreditCardExpDate);
    this.setRadioBtnBillingAddress(obj.SameBillingAddress);
    //this.setBillingPhone(obj.BillingPhone);
   // this.setEsigInitials(obj.EsigInitials);
    var initialsBill=obj.FirstName.substr(0,1)+obj.LastName.substr(0,1);
    console.log("initialsBill="+initialsBill);
    this.setBillingSummaryInitials(initialsBill);
    if(obj.SameBillingAddress=='No')
    {
      this.setBillingStreetUpdate(obj.BillingStreet);
      this.setBillingAptUpdate(obj.BillingApt);
      this.setBillingCityUpdate(obj.BillingCity);
      this.setBillingStateUpdate(obj.BillingState);
      this.setBillingZipUpdate(obj.BillingZip);
    }
    this.clickAccept();
    this.clickPurchase();
  };

  this.setBillingSummaryInitials=function(billingSummaryInitials)
  {
    helper.setText(this.billingSummaryInitials,billingSummaryInitials);
  };

  this.setCreditCardName=function(creditCardName)
  {
    helper.setText(this.creditCardName,creditCardName,true);
  };

  this.setCreditCardNumber=function(creditCardNumber)
  {
    helper.setText(this.creditCardNumber,creditCardNumber,true);
  };

  this.setCreditCardExpDate=function(creditCardExpDate)
  {
    helper.setText(this.creditCardExpDate,creditCardExpDate,true);
  };

  this.setRadioBtnBillingAddress=function(radioBtnBillingAddress)
  {
    helper.RadioButtonClick(this.radioBtnBillingAddress,radioBtnBillingAddress);
  };

  this.setBillingStreetUpdate=function(billingStreetUpdate)
  {
    helper.setText(this.billingStreetUpdate,billingStreetUpdate,true);
  };

  this.setBillingAptUpdate=function(billingAptUpdate)
  {
    helper.setText(this.billingAptUpdate,billingAptUpdate,true);
  };

  this.setBillingCityUpdate=function(billingCityUpdate)
  {
    helper.setText(this.billingCityUpdate,billingCityUpdate,true);
  };

  this.setBillingStateUpdate=function(billingStateUpdate)
  {
    helper.setDropDown(this.billingStateUpdate,billingStateUpdate);
  };

  this.setBillingZipUpdate=function(billingZipUpdate)
  {
    helper.setText(this.billingZipUpdate,billingZipUpdate,true);
  };

  this.setBillingPhone=function(billingPhone)
  {
    helper.setText(this.billingPhone,billingPhone,true);
  };

  this.setEsigInitials=function(esigInitials)
  {
    helper.setText(this.esigInitials,esigInitials,true);
  };

  this.clickAccept = function ()
  {
    element(by.id('esig')).all(by.tagName('input')).get(0).click();
  };


  this.clickPurchase = function ()
  {
    helper.click(this.btnPurchase);
  };

};

module.exports=Billing;


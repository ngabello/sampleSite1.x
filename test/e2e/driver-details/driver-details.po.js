/**
 * Created by vyom.sharma on 04-12-2014.
 */

var DriverDetails = function ()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.LicenseStatus = by.model('driver.LicenseStatus');
  this.AgeFirstLicensed = by.model('driver.AgeFirstLicensed');
  this.CurrentlyInsured = 'driver.CurrentlyInsured';
  this.CurrentInsuranceStatus = by.model('driver.CurrentInsuranceStatus');
  this.PolicyStartDate = by.model('quoteIntent.EffectiveDate');
  this.AdditionalDrivers = 'driver.AdditionalDrivers';
  this.CurrentZipCode = 'driver.CurrentZipCode';
  this.PreviousLapse = by.model('driver.PreviousLapse');
  this.CurrentInsurer = by.model('driver.CurrentInsurer');
  this.YearsWithCurrentInsurer = by.model('driver.YearsWithCurrentInsurer');
  this.CurrentPremium = by.model('driver.CurrentPremium');
  this.CurrentInsuranceLimits = by.model('driver.CurrentInsuranceLimits');
  this.btnContinue = by.id('btnContinue');

  this.setValues = function (obj)
  {
    this.setLicenseStatus(obj.LicenseStatus);
    this.setAgeFirstLicensed(obj.AgeFirstLicensed);
    this.setCurrentlyInsured(obj.CurrentlyHaveAutoInsurance);

    if(obj.CurrentlyHaveAutoInsurance=='No')
    {
      this.setCurrentInsuranceStatus(obj.Reason);
      console.log("obj.Reason= "+obj.Reason);
      if(obj.Reason=='Deployed oversees with the military' ||obj.Reason=='My policy expired 30 days ago or less')
      {
        console.log("Inside if obj.Reason= "+obj.Reason);
        this.setPreviousLapse(obj.LapseinLast3Years);
        this.setCurrentInsurer(obj.CurrentInsurer);
        this.setYearsWithCurrentInsurer(obj.YearsWithPriorInsurer);
        this.setCurrentPremium(obj.CurrentPremium);
        this.setCurrentInsuranceLimits(obj.CurrentBILimits);
      }
    }
    else if(obj.CurrentlyHaveAutoInsurance=='Yes')
    {
      this.setPreviousLapse(obj.LapseinLast3Years);
      this.setCurrentInsurer(obj.CurrentInsurer);
      this.setYearsWithCurrentInsurer(obj.YearsWithPriorInsurer);
      this.setCurrentPremium(obj.CurrentPremium);
      this.setCurrentInsuranceLimits(obj.CurrentBILimits);
    }

    this.setPolicyStartDate(obj.EffectiveDate);
    this.setCurrentZipCode(obj.ArevehiclesKeptCurrentZipCode);
    if(obj.ListedDrivers.length>0)
    {
      this.setAdditionalDrivers("Yes");
    }
else
    {
      this.setAdditionalDrivers("No");
    }
  };

  this.setLicenseStatus = function (licenseStatus)
  {
    helper.setDropDown(this.LicenseStatus, licenseStatus);
  };

  this.setAgeFirstLicensed = function (ageFirstLicensed)
  {
    helper.setText(this.AgeFirstLicensed, ageFirstLicensed,true);
  };

  this.setCurrentlyInsured = function (currentlyInsured)
  {
    helper.RadioButtonClick(this.CurrentlyInsured, currentlyInsured);
  };

  this.setCurrentInsuranceStatus = function (currentInsuranceStatus)
  {
    helper.setDropDown(this.CurrentInsuranceStatus, currentInsuranceStatus);
  };

  this.setPolicyStartDate = function (policyStartDate)
  {
    helper.setText(this.PolicyStartDate, policyStartDate);
  };

  this.setAdditionalDrivers = function (additionalDrivers)
  {
    helper.RadioButtonClick(this.AdditionalDrivers, additionalDrivers);
  };

  this.setCurrentZipCode = function (currentZipCode)
  {
    helper.RadioButtonClick(this.CurrentZipCode, currentZipCode);
  };

  this.setPreviousLapse = function (previousLapse)
  {
    helper.setDropDown(this.PreviousLapse, previousLapse);
  };

  this.setCurrentInsurer = function (currentInsurer)
  {
    helper.setDropDown(this.CurrentInsurer, currentInsurer);
  };

  this.setYearsWithCurrentInsurer= function (yearsWithCurrentInsurer)
  {
    helper.setDropDown(this.YearsWithCurrentInsurer, yearsWithCurrentInsurer);
  };

  this.setCurrentPremium = function (currentPremium)
  {
    helper.setText(this.CurrentPremium, currentPremium);
  };

  this.setCurrentInsuranceLimits = function (currentInsuranceLimits)
  {
    helper.setDropDown(this.CurrentInsuranceLimits, currentInsuranceLimits);
  };

  this.clickContinue = function ()
  {
    helper.click(this.btnContinue);
  };
};

module.exports = DriverDetails;

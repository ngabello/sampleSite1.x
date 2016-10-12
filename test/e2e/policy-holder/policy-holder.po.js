/**
 * Created by vyom.sharma on 03-12-2014.
 */

var PolicyHolder = function ()
{
  var FS = require("q-io/fs");
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.FirstName = by.model('driver.FirstName');
  this.MiddleName = by.model('driver.MiddleName');
  this.LastName = by.model('driver.LastName');
  this.Suffix = by.model('driver.Suffix');
  this.AddressLine1 = by.model('physicalAddress.AddressLine1');
  this.AddressLine2 = by.model('physicalAddress.AddressLin2');
  this.City = by.model('physicalAddress.City');
  this.PostalCode = by.model('physicalAddress.PostalCode');
  this.County = by.model('physicalAddress.County');
  this.DateOfBirth = by.model('driver.DateOfBirth');
  this.PhoneNumber = by.model('driver.PhoneNumber.Value');
  this.EmailAddress = by.model('driver.EmailAddress');
  this.btnContinue = by.id('btnContinue');

  this.setValues = function (obj)
  {
    this.setFirstName(obj.FirstName);
    this.setMiddleName(obj.MiddleName);
    this.setLastName(obj.LastName);
    this.setSuffix(obj.Suffix);
    this.setAddressLine1(obj.AddressLine1);
    this.setAddressLine2(obj.AddressLine2);
    this.setCity(obj.City);
    if(obj.County!=undefined && obj.County!='')
    {
      this.setCounty(obj.County);
    }
    this.setDateOfBirth(obj.DateOfBirth, false);
    this.setPhoneNumber(obj.PhoneNumber, false);
    this.setEmailAddress(obj.EmailAddress);
  };

  this.setFirstName = function (firstName)
  {
    helper.setText(this.FirstName, firstName,true);
  };

  this.setMiddleName = function (middleName)
  {
    helper.setText(this.MiddleName, middleName,true);
  };

  this.setLastName = function (lastName)
  {
    console.log("LastName= "+ lastName);
    FS.isFile("LastName.txt").then(
      function(value)
      {
        if(value)
        {
          FS.append("LastName.txt", "\n "+ lastName+" \n");
        }
        else
        {
          FS.write("LastName.txt", "\n "+lastName+" \n");
        }
      }
    );
    //FS.write("LastName.txt", lastName+"\n");
    helper.setText(this.LastName, lastName,true);
  };

  this.setSuffix = function (suffix)
  {
    helper.setDropDown(this.Suffix, suffix);
  };

  this.setCounty = function (county)
  {
    helper.setDropDown(this.County, county, true);
  };

  this.setAddressLine1 = function (addressLine1)
  {
    helper.setText(this.AddressLine1, addressLine1);
  };

  this.setAddressLine2 = function (addressLine2)
  {
    helper.setText(this.AddressLine2, addressLine2);
  };

  this.setCity = function (city)
  {
    helper.setText(this.City, city);
  };

  this.setPostalCode = function (postalCode)
  {
    helper.setText(this.PostalCode, postalCode);
  };

  this.setCountry = function (country)
  {
    helper.setText(this.Country, country);
  };

  this.setDateOfBirth = function (dateOfBirth)
  {
    console.log("DateOfBirth= "+ dateOfBirth);
    helper.setText(this.DateOfBirth, dateOfBirth);
  };

  this.setPhoneNumber = function (phoneNumber)
  {
    helper.setText(this.PhoneNumber, phoneNumber);
  };

  this.setEmailAddress = function (emailAddress)
  {
    console.log("Email= "+ emailAddress);
    helper.setText(this.EmailAddress, emailAddress,true);
  };

  this.clickContinue = function ()
  {
    helper.click(this.btnContinue);
  };
};

module.exports = PolicyHolder;

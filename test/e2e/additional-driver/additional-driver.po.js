/**
 * Created by vyom.sharma on 04-12-2014.
 */



var AdditionalDriver = function ()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  console.log("Inside AdditionalDriver:- property");

  this.FirstName = by.model('driver.FirstName');
  this.MiddleName = by.model('driver.MiddleName');
  this.LastName = by.model('driver.LastName');
  this.Suffix = by.model('driver.Suffix');
  this.Gender = 'driver.Gender';
  this.RelationToInsured = by.model('driver.RelationToInsured');
  this.LicenseStatus = by.model('driver.LicenseStatus');
  this.CurrentlyInsured = 'driver.CurrentlyInsured';
  this.DrivesAnyVehicles = 'driver.DrivesAnyVehicles';
  this.AgeFirstLicensed = by.model('driver.AgeFirstLicensed');
  this.DateOfBirth = by.model('driver.DateOfBirth');
  this.MaritalStatus = by.model('driver.MaritalStatus');
  this.HighestLevelOfEducation = by.model('driver.HighestLevelOfEducation');
  this.EmploymentStatus = by.model('driver.EmploymentStatus');
  this.Occupation = by.model('driver.Occupation');
  this.MilitaryBranch = by.model('driver.MilitaryBranch');
  this.addDriver = 'addDriver';
  this.btnContinue = by.id('btnContinue');
  this.CurrentStudentEnrollment = by.model('driver.CurrentStudentEnrollment');
  this.GoodStudentDiscount = 'driver.GoodStudentDiscount';


  this.setValues = function (obj)
  {
    var j = 0;
    for (j = 0; j < obj.ListedDrivers.length; j++)
    {
      this.setFirstName(obj.ListedDrivers[j].FirstName);
      this.setMiddleName(obj.ListedDrivers[j].MiddleName);
      this.setLastName(obj.ListedDrivers[j].LastName);
      this.setSuffix(obj.ListedDrivers[j].Suffix);
      this.setGender(obj.ListedDrivers[j].Gender);
      if(obj.MaritalStatus=='Married' && j==0)
      {
        this.setLicenseStatus(obj.ListedDrivers[j].LicenseStatus);
        if(obj.ListedDrivers[j].LicenseStatus=='Valid'||obj.ListedDrivers[j].LicenseStatus=='Non-US'||obj.ListedDrivers[j].LicenseStatus=='Expired'||obj.ListedDrivers[j].LicenseStatus=='Suspended'||obj.ListedDrivers[j].LicenseStatus=='Restricted')
        {
          element(by.id('content')).click();
          helper.waitForElement(element(this.AgeFirstLicensed),"agelisenced");
          this.setAgeFirstLicensed(obj.ListedDrivers[j].AgeFirstLicensed);
          this.setDateOfBirth(obj.ListedDrivers[j].DateOfBirth);
          this.setHighestLevelOfEducation(obj.ListedDrivers[j].HighestEducation);
          this.setEmploymentStatus(obj.ListedDrivers[j].EmploymentStatus);
          element(by.id('content')).click();
          helper.waitForElement(element(this.AgeFirstLicensed),"agelisenced");
          if(obj.ListedDrivers[j].EmploymentStatus=='Employed')
          {
            this.setOccupation(obj.ListedDrivers[j].Occupation||obj.ListedDrivers[j].EmploymentStatus=='Retired');
          }

          else if(obj.ListedDrivers[j].EmploymentStatus=='Full-time student')
          {
            this.setCurrentStudentEnrollment(obj.ListedDrivers[j].CurrentStudentEnrollment);
          }

          else if(obj.ListedDrivers[j].EmploymentStatus=='Military - active'||obj.ListedDrivers[j].EmploymentStatus=='Military - retired')
          {
            this.setMilitaryBranch(obj.ListedDrivers[j].MilitaryBranch);

          }
        }

        else  if(obj.ListedDrivers[j].LicenseStatus=='Revoked'||obj.ListedDrivers[j].LicenseStatus=='Non-licensed'||obj.ListedDrivers[j].LicenseStatus=='Permit'||obj.ListedDrivers[j].LicenseStatus=='Surrendered')
        {
          this.setHighestLevelOfEducation(obj.ListedDrivers[j].HighestEducation);
          this.setEmploymentStatus(obj.ListedDrivers[j].EmploymentStatus);
          if(obj.ListedDrivers[j].EmploymentStatus=='Employed')
          {
            this.setOccupation(obj.ListedDrivers[j].Occupation||obj.ListedDrivers[j].EmploymentStatus=='Retired');
          }

          else if(obj.ListedDrivers[j].EmploymentStatus=='Full-time student')
          {
            this.setCurrentStudentEnrollment(obj.ListedDrivers[j].CurrentStudentEnrollment);
          }

          else if(obj.ListedDrivers[j].EmploymentStatus=='Military - active'||obj.ListedDrivers[j].EmploymentStatus=='Military - retired')
          {
            this.setMilitaryBranch(obj.ListedDrivers[j].MilitaryBranch);

          }
        }

      }

      else
      {
        this.setRelationToInsured(obj.ListedDrivers[j].Relationship);
        this.setLicenseStatus(obj.ListedDrivers[j].LicenseStatus);
        if(obj.ListedDrivers[j].LicenseStatus=='Valid'||obj.ListedDrivers[j].LicenseStatus=='Non-US'||obj.ListedDrivers[j].LicenseStatus=='Expired'||obj.ListedDrivers[j].LicenseStatus=='Suspended'||obj.ListedDrivers[j].LicenseStatus=='Restricted')
        {
          this.setCurrentlyInsured(obj.ListedDrivers[j].CurrentlyHaveAutoInsurance);
          if(obj.ListedDrivers[j].CurrentlyHaveAutoInsurance=='Yes')
          {
           /* this.setDrivesAnyListedVehicles(obj.ListedDrivers[j].DrivesAnyVehicles);
            if(obj.ListedDrivers[j].DrivesAnyVehicles=='Yes')
            {
              this.setAgeFirstLicensed(obj.ListedDrivers[j].AgeFirstLicensed);
              this.setDateOfBirth(obj.ListedDrivers[j].DateOfBirth);
              this.setMaritalStatus(obj.MaritalStatus);
            }
            else
            {
              //no more fields to set
            }*/
          }
          else
          {
            this.setAgeFirstLicensed(obj.ListedDrivers[j].AgeFirstLicensed);
            this.setDateOfBirth(obj.ListedDrivers[j].DateOfBirth);
            this.setMaritalStatus(obj.MaritalStatus);
          }
        }
        else  if(obj.ListedDrivers[j].LicenseStatus=='Revoked'||obj.ListedDrivers[j].LicenseStatus=='Non-licensed'||obj.ListedDrivers[j].LicenseStatus=='Permit'||obj.ListedDrivers[j].LicenseStatus=='Surrendered')
        {
          this.setDrivesAnyListedVehicles(obj.ListedDrivers[j].DrivesAnyVehicles);
        }
      }
      if (j == obj.ListedDrivers.length - 1)
      {
        this.setAddDriver('No');
        this.clickContinue();
      }
      else
      {
        this.setAddDriver('Yes');
        this.clickContinue();
      }
    }

  };

  this.setFirstName = function (FirstName)
  {
    helper.setText(this.FirstName, FirstName);
  };

  this.setMiddleName = function (MiddleName)
  {
    helper.setText(this.MiddleName, MiddleName);
  };

  this.setLastName = function (LastName)
  {
    helper.setText(this.LastName, LastName);
  };

  this.setSuffix = function (Suffix)
  {
    helper.setDropDown(this.Suffix, Suffix);
  };

  this.setGender = function (Gender)
  {
    helper.RadioButtonClick(this.Gender, Gender);
  };

  this.setRelationToInsured = function (Relationship)
  {
    helper.setDropDown(this.RelationToInsured, Relationship);
  };

  this.setLicenseStatus = function (LicenseStatus)
  {
    helper.setDropDown(this.LicenseStatus, LicenseStatus);
  };

  this.setCurrentlyInsured = function (currentlyInsured)
  {
    helper.RadioButtonClick(this.CurrentlyInsured, currentlyInsured);
  };

  this.setDrivesAnyListedVehicles = function (WhichVehicleDriveMostId)
  {
    var val = '';
    if (WhichVehicleDriveMostId != undefined && WhichVehicleDriveMostId != '')
    {
      val = 'Yes';
    }
    else {
      val = 'No';
    }
    helper.RadioButtonClick(this.DrivesAnyVehicles, val);
  };

  this.setAgeFirstLicensed = function (AgeFirstLicensed)
  {
    helper.setText(this.AgeFirstLicensed, AgeFirstLicensed, true);
  };

  this.setDateOfBirth = function (DateOfBirth) {
    helper.setText(this.DateOfBirth, DateOfBirth);
  };
  this.setMaritalStatus = function (MaritalStatus) {
    helper.setDropDown(this.MaritalStatus, MaritalStatus);
  };
  this.setHighestLevelOfEducation = function (HighestEducation) {
    helper.setDropDown(this.HighestLevelOfEducation, HighestEducation);
  };

  this.setEmploymentStatus = function (EmploymentStatus) {
    helper.setDropDown(this.EmploymentStatus, EmploymentStatus);
  };


  this.setOccupation = function (Occupation) {
    helper.setText(this.Occupation, Occupation, false, true);
  };

  this.setMilitaryBranch = function (MilitaryBranch) {
    helper.setDropDown(this.MilitaryBranch, MilitaryBranch);
  };

  this.setCurrentStudentEnrollment = function (CurrentStudentEnrollment)
  {
    helper.setDropDown(this.CurrentStudentEnrollment, CurrentStudentEnrollment);
  };

  this.setGoodStudentDiscount = function (GoodStudentDiscount) {
    helper.RadioButtonClick(this.GoodStudentDiscount , GoodStudentDiscount);
  };


  this.clickContinue = function () {
    helper.click(this.btnContinue);
  };

  this.setAddDriver = function (value) {
    helper.RadioButtonClick(this.addDriver,value);
  };
};

module.exports = AdditionalDriver;

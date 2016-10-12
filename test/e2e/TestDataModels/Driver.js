/**
 * Created by gurpreet.singh on 12/04/2014.
 */

'use strict';

var Driver = function()
{
  this.DriverId = undefined;

  this.FirstName = undefined;
  this.LastName = undefined;
  this.MiddleName = undefined;
  this.Suffix = undefined;

  this.DateOfBirth = undefined;
  this.Age = undefined;
  this.AddressLine1 = undefined;
  this.AddressLine2 = undefined;

  this.ZIPCode = undefined;
  this.City = undefined;
  this.State = undefined;
  this.County = undefined;

  this.PhoneNumber = undefined;
  this.EmailAddress = undefined;

  this.ResidenceType = undefined;
  this.YearsatResidence = undefined;

  this.CurrentlyHaveAutoInsurance = undefined;
  this.Reason = undefined;
  this.OtherDriversYourHome = undefined;
  this.ArevehiclesKeptCurrentZipCode = undefined;
  this.LapseinLast3Years = undefined;
  this.CurrentInsurer = undefined;
  this.YearsWithPriorInsurer = undefined;

  this.CurrentPremium = undefined;

  this.HomeOwnerExistsCurrentIND = false;
  this.LifeExistsCurrentIND = false;
  this.Motorcycle = false;
  this.OnlineDiscount = false;
  this.WebToPhoneDiscount = false;
  this.PaperlessDiscount = false;
  this.ESigDiscount = false;
  this.Doyouhaveinsurance = undefined;

  this.CurrentBILimits = undefined;
  this.SourceofBusiness = undefined;
  this.Affinity = undefined;

  this.DriverNumber = undefined;
  this.DriverName = undefined;

  this.AccidentPreventionIND = false;
  this.GoodStudentIND = false;

  this.Gender = undefined;
  this.RatingStatus = undefined;

  this.Relationship = undefined;
  this.LicenseStatus = undefined;
  this.MaritalStatus = undefined;
  this.AgeFirstLicensed = undefined;

  this.HighestEducation = undefined;
  this.EmploymentStatus = undefined;
  this.Occupation = undefined;
  this.MilitaryBranch = undefined;
  this.MilitaryStatus = undefined;

  this.WhichVehicleDriveMostId = undefined;
  this.WhoDrivesthisVehicle=undefined;
  this.PolicyInfo = undefined;

  this.ExtraRatabaseInformation = undefined;

  this.LicenseNumber=undefined;
  this.LicenseState=undefined;

  this.DrivesAnyVehicles=undefined;
  this.PlanName=undefined;

  this.CreditCardName=undefined;
  this.CreditCardNumber=undefined;
  this.CreditCardExpDate=undefined;
  this.SameBillingAddress=undefined;
  this.BillingPhone=undefined;
  this.EsigInitials=undefined;

  this.BillingStreet=undefined;
  this.BillingApt=undefined;
  this.BillingCity=undefined;
  this.BillingState=undefined;
  this.BillingZip=undefined;
  this.CurrentlyStudentOrHaveBachelorDegree=undefined;
  this.ListedDrivers = [];
  this.Incidents = [];

  this.Vehicles = [];
};

module.exports = Driver;

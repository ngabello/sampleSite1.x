/**
 * Created by vyom.sharma on 03-12-2014.
 */

var Driver = function ()
{
  var Helper = require('./../Helpers/Helper.js');
  var helper = new Helper();

  this.Gender = 'driver.Gender';
  this.MaritalStatus = by.model('driver.MaritalStatus');
  this.ResidenceOwnership = by.model('driver.ResidenceOwnership');
  this.YearsAtCurrentResidence = by.model('driver.YearsAtCurrentResidence');
  this.HighestLevelOfEducation = by.model('driver.HighestLevelOfEducation');
  this.EmploymentStatus = by.model('driver.EmploymentStatus');
  this.Occupation = by.model('driver.Occupation');
  this.MilitaryBranch = by.model('driver.MilitaryBranch');
  this.MilitaryStatus = by.model('driver.MilitaryStatus');
  this.CurrentStudentEnrollment=by.model('driver.CurrentStudentEnrollment');
  this.btnContinue = by.id('btnContinue');
  this.CurrentlyEnrolled='driver.CurrentlyEnrolled';


  this.setValues = function (obj)
  {
    this.setGender(obj.Gender);
    this.setEmploymentStatus(obj.EmploymentStatus);
    this.setMaritalStatus(obj.MaritalStatus);
    this.setResidenceOwnership(obj.ResidenceType);
    this.setYearsAtCurrentResidence(obj.YearsatResidence);
    this.setHighestLevelOfEducation(obj.HighestEducation);


    console.log("Age= "+obj.Age+" obj.MaritalStatus= "+obj.MaritalStatus);
    if(obj.Age<25 && obj.MaritalStatus=='Never Married')
    {
      console.log("inside Age if= ");
      this.setCurrentlyEnrolled(obj.CurrentlyStudentOrHaveBachelorDegree);
    }

    if(obj.EmploymentStatus == 'Employed')
    {
      this.setOccupation(obj.Occupation);
    }
    else if(obj.EmploymentStatus == 'Full-time student')
    {
      this.setCurrentStudentEnrollment(obj.CurrentStudentEnrollment);
    }
    else if(obj.EmploymentStatus == 'Military - active' || obj.EmploymentStatus == 'Military - retired')
    {
      this.setMilitaryBranch(obj.MilitaryBranch);
      this.setMilitaryStatus(obj.MilitaryStatus);
    }

  };

  this.setCurrentStudentEnrollment = function (currentStudentEnrollment)
  {
    helper.setDropDown(this.CurrentStudentEnrollment, currentStudentEnrollment);
  };

  this.setGender = function (gender)
  {
    if(this.Gender == "M") { this.Gender = "Male" }
    else if(this.Gender == "F") { this.Gender = "Female" }

    helper.RadioButtonClick(this.Gender, gender);
  };

  this.setMaritalStatus = function (maritalStatus)
  {
    helper.setDropDown(this.MaritalStatus, maritalStatus, true);
  };

  this.setResidenceOwnership = function (residenceOwnership)
  {
    helper.setDropDown(this.ResidenceOwnership, residenceOwnership);
  };

  this.setYearsAtCurrentResidence = function (yearsAtCurrentResidence)
  {
    helper.setDropDown(this.YearsAtCurrentResidence, yearsAtCurrentResidence);
  };

  this.setHighestLevelOfEducation = function (highestLevelOfEducation)
  {
    helper.setDropDown(this.HighestLevelOfEducation, highestLevelOfEducation);
  };

  this.setEmploymentStatus = function (employmentStatus)
  {
    helper.setDropDown(this.EmploymentStatus, employmentStatus, true);
  };

  this.setOccupation = function (occupation)
  {
     helper.setText(this.Occupation, occupation, false, true);
  };

  this.setMilitaryBranch = function (militaryBranch)
  {
    helper.setDropDown(this.MilitaryBranch, militaryBranch);
  };

  this.setMilitaryStatus = function (militaryStatus)
  {
    helper.setDropDown(this.MilitaryStatus, militaryStatus);
  };

  this.clickContinue = function ()
  {
    helper.click(this.btnContinue);
  };

  this.setCurrentlyEnrolled=function(currentlyEnrolled)
  {
    helper.RadioButtonClick(this.CurrentlyEnrolled, currentlyEnrolled);
  };
  /*this.getAge=function(dateOfBirth)
  {

    var dob=dateOfBirth.substring(0,2)+"-"+dateOfBirth.substring(2,4)+"-"+dateOfBirth.substring(4);
    console.log("dob= "+dob);
    var today = new Date();
    var age = today.getFullYear() - dateOfBirth.substring(4);
    var m = today.getMonth() - dateOfBirth.substring(2,4);
    if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.substring(0,2)))
    {
      age--;
    }
    return age;
  }*/
};

module.exports = Driver;

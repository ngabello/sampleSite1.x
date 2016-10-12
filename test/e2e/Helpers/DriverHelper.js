/**
 * Created by gurpreet.singh on 12/04/2014.
 */

var DriverHelper = function()
{
  var TypeConstants = require('../Helpers/TypeConstants.js');
  var JsonHelper = require('../Helpers/JsonHelper.js');

  var autoGen=false;
  var Driver = require('../TestDataModels/Driver.js');
  var PolicyInfo = require('../TestDataModels/PolicyInfo.js');
  var ExtraRatabaseInformation = require('../TestDataModels/ExtraRatabaseInformation.js');
  var Coverages = require('../TestDataModels/Coverages.js');
  var Incident = require('../TestDataModels/Incident.js');

  var ListedDriver = require('../TestDataModels/ListedDriver.js');
  var Vehicle = require('../TestDataModels/Vehicle.js');

  var typeConstants = new TypeConstants();
  var jsonHelper = new JsonHelper();

  this.GetDriverFromTestData = function(excelData, customConfig)
  {
    var driverList = [];
    autoGen=customConfig.autoGen;
    if(excelData == undefined && excelData == null)
    {
      return driverList;
    }

    var columns = Object.keys(excelData[0]).length;

    if(columns < 3)
    {
      return driverList;
    }

    var driverCount = 1;

    while(true)
    {
      var result = this.GetDriverFromColumn(driverCount, excelData, customConfig);
      driverCount++;

      if(result == undefined)
      {
        //console.log("driverCount= "+driverCount);
        break;
      }

      driverList.push(result);
    }

    return driverList;
  };

  this.GetDriverFromColumn = function(driverCount, excelData, customConfig)
  {
    var objDriver = undefined;

    var driverName = this.GetColumnValueByName(excelData, "FirstName", driverCount);
    //console.log("driverName= "+driverName);
    if(driverName != undefined && driverName != "")
    {
      objDriver = new Driver();

      this.LoadObjectWithData(objDriver, excelData, driverCount);

      if(customConfig != undefined)
      {
        objDriver.ZIPCode = objDriver.ZIPCode == undefined || objDriver.ZIPCode == '' ? customConfig.zipCode : objDriver.ZIPCode;
        objDriver.County = objDriver.County == undefined || objDriver.County == '' ? customConfig.county : objDriver.County;
        objDriver.EmailAddress = objDriver.EmailAddress == undefined || objDriver.EmailAddress == '' ? customConfig.emailAddress : objDriver.EmailAddress;
        objDriver.PhoneNumber = objDriver.PhoneNumber == undefined || objDriver.PhoneNumber == '' ? customConfig.phoneNumber : objDriver.PhoneNumber;
      }

      if(objDriver.DateOfBirth != undefined)
      {
        objDriver.Age = jsonHelper.GetDifferenceInYears(objDriver.DateOfBirth.replace(/\//g, ""))
      }

      objDriver.EmailAddress = this.GetEmailAddress(objDriver.EmailAddress);
      objDriver.PhoneNumber = this.GetPhoneNumber(objDriver.PhoneNumber);

      objDriver.PolicyInfo = this.GetPolicyInfo(excelData, driverCount);
      objDriver.ExtraRatabaseInformation = this.GetExtraRatabaseInformation(excelData, driverCount);


      objDriver.ListedDrivers = this.GetListedDrivers(excelData, driverCount);

      objDriver.Incidents = this.GetIncidents(excelData, driverCount, objDriver);
      objDriver.Vehicles = this.GetVehicles(excelData, driverCount);
    }

    return objDriver;
  };

  this.GetEmailAddress = function(emailId)
  {
    if(emailId == undefined || emailId == '')
    {
        var uniqueNum = new Date().valueOf();
        emailId = "pro" + uniqueNum.toString() + "@mailinator.com";
    }

    return emailId;
  };

  this.GetPhoneNumber = function(phoneNumber)
  {
    if(phoneNumber == undefined || phoneNumber == '')
    {
      // NOTE: random phone number logic created an invalid North America phone #
      //       no need to randomize phone number
      phoneNumber = "2013425465"
    }

    return phoneNumber;
  };

  this.GetPolicyInfo = function(excelData, driverCount)
  {
    var policyInfo = new PolicyInfo();
    return this.LoadObjectWithData(policyInfo, excelData, driverCount);
  };

  this.GetExtraRatabaseInformation = function(excelData, driverCount)
  {
    var extraRatabaseInformation = new ExtraRatabaseInformation();
    return this.LoadObjectWithData(extraRatabaseInformation, excelData, driverCount);
  };

  this.GetCoverages = function(excelData, driverCount, listedDriverCount)
  {
    var coverages = new Coverages();
    return this.LoadObjectWithData(coverages, excelData, driverCount, listedDriverCount);
  };

  this.GetVehicles = function(excelData, driverCount)
  {
    var vehicles = [];
    var vehicleCount = 0;

    while(true)
    {
      var vin = this.GetColumnValueByName(excelData, "VIN", driverCount, vehicleCount);
      if(vin == undefined || vin == "")
      {
        break;
      }

      var vehicle = new Vehicle();
      this.LoadObjectWithData(vehicle, excelData, driverCount, vehicleCount);
      vehicle.Coverages = this.GetCoverages(excelData, driverCount,vehicleCount);
      vehicles.push(vehicle);
      vehicleCount += 1;
    }

    return vehicles;
  };

  this.GetIncidents = function(excelData, driverCount, objDriver)
  {
    var incidents = [];
    var incidentCount = 0;

    while(true)
    {
      var description = this.GetColumnValueByName(excelData, "Description", driverCount, incidentCount);
      if(description == undefined || description == "")
      {
        break;
      }

      var incident = new Incident();
      this.LoadObjectWithData(incident, excelData, driverCount, incidentCount);
      //incident.DriverName = jsonHelper.Trim(objDriver.FirstName + " " + objDriver.LastName);
      incidents.push(incident);
      incidentCount += 1;
    }

    return incidents;
  };

  this.GetListedDrivers = function(excelData, driverCount)
  {
    var listedDrivers = [];
    var listedDriverCount = 1;

    while(true)
    {
      var firstName = this.GetColumnValueByName(excelData, "FirstName", driverCount, listedDriverCount);

      if(firstName == undefined || firstName == "")
      {
        break;
      }

      var listedDriver = new ListedDriver();
      this.LoadObjectWithData(listedDriver, excelData, driverCount, listedDriverCount);

      if(listedDriver.DateOfBirth != undefined)
      {
        listedDriver.Age = jsonHelper.GetDifferenceInYears(listedDriver.DateOfBirth.replace(/\//g, ""))
      }

      listedDriver.Coverages = this.GetCoverages(excelData, driverCount, listedDriverCount);
      listedDrivers.push(listedDriver);
      listedDriverCount += 1;
    }

    return listedDrivers;
  };

  this.LoadObjectWithData = function(targetObj, excelData, driverNumber, listedDriverCount)
  {
    var keys = Object.keys(targetObj);
    for(var i = 0; i < keys.length; i++)
    {
      targetObj[keys[i]] = this.GetColumnValueByName(excelData, keys[i], driverNumber, listedDriverCount);
    }

    return targetObj;
  };

  this.GetColumnValueByName = function(excelData, propertyName, driverNumber, listedDriverCount)
  {
    var columnName = null;
    if(listedDriverCount == undefined || listedDriverCount == 0)
    {
      columnName = "NB" + driverNumber.toString();
    }
    else
    {
      columnName = "NB" + driverNumber.toString() + "_Col" + listedDriverCount.toString();
    }

    var rowNum = -1;
    var objectType = undefined;
    var preFix=undefined;

    for(var row = 0; row < excelData.length; row++)
    {
      var jsonProperty = excelData[row].JsonProperty;

      if(jsonProperty == undefined)
      {
        break;
      }

      if(jsonProperty.split('#')[0] == propertyName)
      {
        objectType = jsonProperty.split('#')[1];
        preFix=jsonProperty.split('#')[2];
        rowNum = row;
        var chkData = eval("excelData["+rowNum+"]." + columnName);

        if(!(chkData == undefined || chkData == ""))
        {
          break;
        }
      }
    }

    var valueEval = rowNum == -1 ? undefined :  eval("excelData["+rowNum+"]." + columnName);

    if(propertyName=='LastName' && autoGen=='true')
    {
      var autoGenVal = this.GetTypedValue(typeConstants.AutoString, '');

      //console.log("autoGenerated driver " + propertyName + " = "+autoGenVal);

      return autoGenVal;
    }
    else
    {
      return this.GetTypedValue(objectType, valueEval,preFix);
    }
  };

  this.GetTypedValue = function(objType, value,preFix)
  {
    if(objType == undefined || value == undefined)
    {
      return value;
    }

    objType = objType.toLowerCase();
    if(objType == typeConstants.BoolType && value !="" )
    {
      return value == "Y";
    }

    if(objType == typeConstants.DateType && !isNaN(value)&& value !="" )
    {
      var date = new Date();
      date.setTime((parseFloat(value) - 25569) * 24 * 3600 * 1000);
      return "".concat(this.GetNumberToString(date.getMonth()+1), this.GetNumberToString(date.getDate()), date.getFullYear())
    }

    if(objType == typeConstants.AutoNum && (value==""||value==undefined))
    {
      var randomText = "";
      var possible = "0123456789";
      for (var i = 0; i < 10; i++)
      {
        randomText += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return randomText;
    }


    if(objType == typeConstants.AutoAlphaNum && (value==""||value==undefined))
    {
      var randomText = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 10; i++)
      {
        randomText += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      randomText = (preFix == undefined || preFix == '' ? "test" : preFix) + randomText;

      return randomText;
    }

    if(objType == typeConstants.AutoString && (value==""||value==undefined))
    {

      var randomText = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (var i = 0; i < 10; i++)
      {
        randomText += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      randomText = (preFix == undefined || preFix == '' ? "test" : preFix) + randomText;

      return randomText;
    }

    return value;
  };

  this.GetNumberToString = function(number)
  {
      var value = number.toString();
      return (value.length > 1 ? "" : "0") + value;
  };

};

module.exports = DriverHelper;

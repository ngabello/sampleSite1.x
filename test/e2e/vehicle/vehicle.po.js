/**
 * Created by vyom.sharma on 08-12-2014.
 */
var Vehicle = function ()
  {

    var Helper = require('./../Helpers/Helper.js');
    var helper = new Helper();
    this.Year = by.model('vehicle.Year');
    this.Make = by.model('vehicle.Make');
    this.Model = by.model('vehicle.Model');
    this.CustomEquipment ='vehicle.CustomEquipment';
    this.ValueOfCustomEquipment =  by.model('vehicle.ValueOfCustomEquipment');
    this.Usage = by.model('vehicle.Usage');
    this.EstimatedAnnualMileage = by.model('vehicle.EstimatedAnnualMileage');
    this.CurrentOwner = 'vehicle.CurrentOwner';
    this.YearsVehicleOwned = by.model('vehicle.YearsVehicleOwned');
    this.PrimaryDriverID = by.model('vehicle.PrimaryDriverID');

    this.AddAnotherVehicle = 'addVehicle';
    this.btnContinue = by.id('btnContinue');




    this.setValues = function (obj)
    {
      var hasVehicles = obj.Vehicles != undefined && obj.Vehicles.length > 0 ? "Yes" : "No";
      if(hasVehicles=='Yes')
      {
        console.log('hasVehicles is YES');
        for(var i = 0; i < obj.Vehicles.length; i++)
        {
          console.log('Vehicles length= '+obj.Vehicles.length);
          var vehicle = obj.Vehicles[i];
          this.setYear(vehicle.ModelYear);
          this.setCustomEquipment(vehicle.CustomEquipment);
           if(vehicle.CustomEquipment=='Yes')
           {
             this.setValueOfCustomEquipment(vehicle.ValueOfCustomEquipment);
           }
          this.setMake(vehicle.Make);
          this.setModel(vehicle.Model);
          this.setUsage(vehicle.PrimaryUse);
          this.setEstimatedAnnualMileage(vehicle.EstimatedAnnualMileage);
          this.setCurrentOwner(vehicle.CurrentOwner);
          this.setYearsOwned(vehicle.Yearsowned);
          if(obj.MaritalStatus=='Married' || obj.OtherDriversYourHome=='Yes')
          {
            this.setPrimaryDriverId(obj, vehicle.VehicleNumber);
          }
          if(i==obj.Vehicles.length-1)
          {
            this.setAddAnotherVehicle("No");
          }
          else
          {
            this.setAddAnotherVehicle("Yes");
          }

          this.clickContinue();
        }
      }
      else
      {
        this.clickContinue();
      }


    };

    this.setYear = function (year)
    {
      helper.setText(this.Year, year,true);
    };

    this.setCustomEquipment = function (customEquipment)
    {
      var hascustomEquipment = customEquipment != undefined && customEquipment != ''&& customEquipment == 'Yes' ? 'Yes' : 'No';
      helper.RadioButtonClick(this.CustomEquipment, hascustomEquipment);
    };

    this.setValueOfCustomEquipment = function (valueOfCustomEquipment)
    {
      helper.setDropDown(this.ValueOfCustomEquipment, valueOfCustomEquipment);
    };

    this.setMake = function (make)
    {
      helper.setDropDown(this.Make, make);
    };

    this.setModel = function (model)
    {
      helper.setDropDown(this.Model, model);
    };

    this.setUsage = function (usage)
    {
      helper.setDropDown(this.Usage, usage);
    };

    this.setEstimatedAnnualMileage = function (estimatedAnnualMileage)
    {
      helper.setDropDown(this.EstimatedAnnualMileage, estimatedAnnualMileage);
    };

    this.setCurrentOwner = function (currentOwner)
    {
      helper.RadioButtonClick(this.CurrentOwner, currentOwner);
    };

    this.setYearsOwned = function (yearsOwned)
    {
      helper.setDropDown(this.YearsVehicleOwned, yearsOwned);
    };

    this.setPrimaryDriverId = function (obj,vehicleNumber)
    {
      var ptor = browser;
      var thisObj=this;
      ptor.isElementPresent(this.PrimaryDriverID).then
      (
        function (present)
        {
          console.log("primary driver dropdown exists present= "+present)
          if (present == true)
          {
            helper.setDropDown(thisObj.PrimaryDriverID, undefined, true);
          }
        }
      );

    };
      /*if(obj.WhichVehicleDriveMostId==vehicleNumber)
      {
        helper.setDropDown(this.PrimaryDriverID, undefined,true);
      }
      else
      {
        for(var i = 0; i < obj.ListedDrivers.length; i++)
        {
          if(obj.ListedDrivers[i].WhichVehicleDriveMostId==vehicleNumber)
          {
            helper.setDropDown(this.PrimaryDriverID, obj.ListedDrivers[i].FirstName+ " "+obj.ListedDrivers[i].LastName);
          }
        }
      }
    };*/
     /* var ptor = browser;
      ptor.isElementPresent(this.PrimaryDriverID).then
      (
        function(p)
        {
          console.log("p= "+p);
          if(p==true)
          {*/

      /* }
        }
      );


      if(obj.WhichVehicleDriveMostId==vehicleNumber)
      {
       helper.setDropDown(this.PrimaryDriverID, obj.FirstName+" "+obj.LastName);
      }
      else
      {
        for(var i = 0; i < obj.ListedDrivers.length; i++)
        {
          if(obj.ListedDrivers[i].WhichVehicleDriveMostId==vehicleNumber)
          {
            helper.setDropDown(this.PrimaryDriverID, obj.ListedDrivers[i].FirstName+ " "+obj.ListedDrivers[i].LastName);
          }
        }
      }*/

    this.setAddAnotherVehicle = function (value)
    {
      helper.RadioButtonClick(this.AddAnotherVehicle,value);
    };

    this.clickContinue = function ()
    {
      helper.click(this.btnContinue);
    };

  };


module.exports = Vehicle;

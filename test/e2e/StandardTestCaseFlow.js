/**
 * Created by vyom.sharma on 26-11-2014.
 */
'use strict';

var StandardTestCaseFlow = function()
{
  var ptor = browser;
  var postalCodePO = require('./postal-code/postal-code.po.js');
  var policyHolderPO = require('./policy-holder/policy-holder.po.js');
  var driverPO = require('./driver/driver.po.js');
  var driverDetailsPO = require('./driver-details/driver-details.po.js');
  var additionalDriverPO = require('./additional-driver/additional-driver.po.js');
  var driverHistoryPO = require('./driver-history/driver-history.po.js');
  var vehiclePO = require('./vehicle/vehicle.po.js');
  var driverAssignmentPO = require('./driver-assignment/driver-assignment.po.js');
  var discountPO = require('./Discount/discount.po.js');
  var quotePO=require('./quote/quote.po.js');
  var confirmDriverPO=require('./confirm-driver/confirm-driver.po.js');//confirm-vehicle.po.js
  var confirmVehiclePO=require('./confirm-vehicle/confirm-vehicle.po.js');
  var paymentPO=require('./payment/payment.po.js');
  var billingPO=require('./billing/billing.po.js');

  var DriverHelper = require('./Helpers/DriverHelper.js');

  var JsonHelper = require('./Helpers/JsonHelper.js');
  var jsonHelper = new JsonHelper();
  var excelData = null;
  this.ProcessCustomConfig = function(customConfig)
  {
    var params = browser.params;
    customConfig.zipCode = params.config.zipCode != '' ? params.config.zipCode : customConfig.zipCode;
    customConfig.testDataPath = params.config.testDataPath != '' ? params.config.testDataPath : customConfig.testDataPath;
    customConfig.county = params.config.county != '' ? params.config.county : customConfig.county;
    customConfig.emailAddress = params.config.emailAddress != '' ? params.config.emailAddress : customConfig.emailAddress;
    customConfig.phoneNumber = params.config.phoneNumber != '' ? params.config.phoneNumber : customConfig.phoneNumber;
    customConfig.urlToTest = params.config.urlToTest != '' ? params.config.urlToTest : customConfig.urlToTest;
    customConfig.testToExecute =  jsonHelper.parseJsonArrays(params.config.testToExecute);
    customConfig.autoGen= params.config.autoGen != '' ? params.config.autoGen : customConfig.autoGen;
    customConfig.sheetId=params.config.sheetId !=null ? params.config.sheetId : customConfig.sheetId;
  };



  this.ExecuteTest = function(customConfig)
  {
    var thisObj = this;
    this.ProcessCustomConfig(customConfig);
    console.log("customConfig.testToExecute= "+customConfig.testToExecute+"customConfig.testName="+customConfig.testName+"jhelp= "+jsonHelper.inArray(customConfig.testToExecute, customConfig.testName, true));
    if(customConfig.testToExecute.length != 0 && jsonHelper.inArray(customConfig.testToExecute, customConfig.testName, true) == -1)
    {
      console.log("inside return if testName= "+customConfig.testName);
      return;
    }
    var excelData = null;


    describe('Elephant.com', function () {
      beforeEach(function () {
        jsonHelper.ReadExcel(customConfig).then
        (
          function(exceldata)
          {
            excelData=exceldata;
          }
        );

        ptor.get(customConfig.urlToTest);
        ptor.waitForAngular();

      });

      it('Load Test Data', function ()
      {
        //element(by.id('content')).click();
        //expect(ptor.getCurrentUrl()).toContain('#/postal-code');
        thisObj.TestFlow(excelData);
      });
    });

    this.TestFlow = function(excelData)
    {
      var thisObj = this;
      var driverHelper = new DriverHelper();
      var testCount=0;


      var driverList = driverHelper.GetDriverFromTestData(excelData, customConfig);
      console.log("driverList length= "+ driverList.length);
      //var testList=customConfig.testToExecute.split(',');
      describe('Full test execution', function ()
      {
        beforeEach(function () {
          if(testCount==0)
          {
            //console.log("Inside testcount if");
            testCount++;
          }
          else
          {
            //console.log("Inside testcount else");
            ptor.executeScript('window.onbeforeunload = function(e){};');
            ptor.get(customConfig.urlToTest);
            testCount++;
          }
        });

          //console.log("driverList.length= "+driverList.length);
        for(var i = 0; i < driverList.length; i++)
        {
          var _driver = driverList[i];

          //console.log("customConfig.testToExecute= "+customConfig.testToExecute.length+" = "+customConfig.testToExecute);
         // console.log("customConfig.testToExecute.length= "+customConfig.testToExecute.length+"customConfig.testName= "+customConfig.testName.toLocaleLowerCase()+" _driver.DriverId= "+_driver.DriverId.toLocaleLowerCase());
          if(/*customConfig.testToExecute.length != 0  &&*/ _driver.DriverId.toLocaleLowerCase()!=customConfig.testName.toLocaleLowerCase())//)
          {
            console.log("inside continue");
            continue;
          }

          (function(currentDriver, urlToTest, parentObj) {
            it(customConfig.State+"-"+currentDriver.DriverId + " Test", function ()
            {

              expect(ptor.getCurrentUrl()).toContain('#/postal-code');

              var postalCode = new postalCodePO();
              postalCode.setValues(currentDriver.ZIPCode);
              postalCode.clickContinue();
              expect(ptor.getCurrentUrl()).toContain('#/policy-holder/');

              var policyHolder = new policyHolderPO();
              policyHolder.setValues(currentDriver);
              policyHolder.clickContinue();
              expect(ptor.getCurrentUrl()).toContain('#/driver/');

              var driverPage = new driverPO();
              driverPage.setValues(currentDriver);
              driverPage.clickContinue();
              expect(ptor.getCurrentUrl()).toContain('#/driver-details/');

              var driverDetails = new driverDetailsPO();
              driverDetails.setValues(currentDriver);
              driverDetails.clickContinue();

              var isAdditionPageDriver = (currentDriver.MaritalStatus == "Married" || currentDriver.MaritalStatus == "Civil Union" || currentDriver.OtherDriversYourHome == "Yes");

              if(isAdditionPageDriver)
              {
                expect(ptor.getCurrentUrl()).toContain('#/additional-driver/');
              }
              else
              {
                expect(ptor.getCurrentUrl()).toContain('#/driver-history/');
              }

              if(isAdditionPageDriver)
              {
                var additionalDriver = new additionalDriverPO();
                additionalDriver.setValues(currentDriver);

                expect(ptor.getCurrentUrl()).toContain('#/driver-history/');
              }

              parentObj.DriverHistoryFlow(currentDriver);
              parentObj.VehicleFlow(currentDriver);

              if(currentDriver.ListedDrivers.length==1 && currentDriver.Vehicles.length==1)
              {

              }

              else if(currentDriver.MaritalStatus=='Married' || currentDriver.ListedDrivers.length>0)
              {
                var driverAssignment = new driverAssignmentPO();
                driverAssignment.assignDriver(currentDriver);
                driverAssignment.clickContinue();
              }

              var discount = new discountPO();
              discount.setValues(currentDriver);
              discount.clickContinue();
              expect(ptor.getCurrentUrl()).toContain('#/quote');

               var quote=new quotePO();
              quote.openAccordian();
              ptor.executeScript('window.scrollTo(0,0);');
              quote.setValues(currentDriver);
              quote.clickContinue();
              expect(ptor.getCurrentUrl()).toContain('#/confirm-driver');

              var confirmDriver=new confirmDriverPO();
              confirmDriver.setValues(currentDriver);
              confirmDriver.clickContinue();
              expect(ptor.getCurrentUrl()).toContain('#/confirm-vehicle');

              var confirmVehicle=new confirmVehiclePO();
              confirmVehicle.setValues(currentDriver);
              confirmVehicle.clickContinue();
              expect(ptor.getCurrentUrl()).toContain('#/payment');

              var payment=new paymentPO();
              payment.clickContinue(currentDriver.PlanName);
              //payment.clickContinue('Pay in Full');
              expect(ptor.getCurrentUrl()).toContain('#/billing');

              var billing=new billingPO();
              billing.setValues(currentDriver);
              expect(ptor.getCurrentUrl()).toContain('#/congratulations');
            });
          })(_driver, customConfig.urlToTest, thisObj,customConfig.State);
        }
      });
    };

    this.DriverHistoryFlow = function(currentDriver)
    {
      var driverHistory = new driverHistoryPO();
      driverHistory.setValues(currentDriver);

      //driverHistory.clickContinue();
      expect(ptor.getCurrentUrl()).toContain('#/vehicle/');
    };

    this.VehicleFlow = function(currentDriver)
    {
      var hasUnAssignedDriver=false;
      var vehicle = new vehiclePO();
      vehicle.setValues(currentDriver);

      if(currentDriver.Vehicles != undefined && currentDriver.Vehicles.length > 0)
      {
        element.all(by.repeater('vehicle in vehicles')).then(function (vehicles)
        {
          //console.log("repeter="+vehicles.length);
          //expect(vehicles.length).toEqual(currentDriver.Vehicles.length);
        });
      }
      if(currentDriver.ListedDrivers.length==1 && currentDriver.Vehicles.length==1)
      {
        expect(ptor.getCurrentUrl()).toContain('#/discounts');
      }
      else if(currentDriver.MaritalStatus=='Married' || currentDriver.OtherDriversYourHome=='Yes')
      {
        expect(ptor.getCurrentUrl()).toContain('#/driver-assignment');
      }
      else
      {
        expect(ptor.getCurrentUrl()).toContain('#/discounts');
      }
    };

  };





};

module.exports = StandardTestCaseFlow;

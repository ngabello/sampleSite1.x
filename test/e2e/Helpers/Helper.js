/**
 * Created by vyom.sharma on 03-12-2014.
 */
var Helper = function ()
{

  this.getText = function (key)
  {

  };


  this.setText = function (key, value, clearText, isAutoFIll)
  {
    if(value != undefined && value != "")
    {
      if (clearText)
      {
        element(key).clear();
      }

      if(isAutoFIll)
      {
        var ele = element(key);
        ele.sendKeys(value + " ");
        ele.sendKeys("\uE007");
      }
      else
      {
        element(key).sendKeys(value);
      }
    }
  };

  this.setDropDown = function selectOption(key, value,selectFirst ,milliseconds)
  {
    if (selectFirst && (value == undefined || value == ''))
    {
      value = "\uE015"; // DOWN arrow
      element(key).sendKeys(value);
    }
    else
    {
      var desiredOption;
      var hasMatchedValue=false;
      var count=0;
      element(key).all(by.tagName('option')).getText().then
      (
        function findMatchingOption(options)
        {
          options.some
          (
            function (option)
            {

              if (option.toLowerCase()== value.toLowerCase())
              {
                desiredOption = count;
                hasMatchedValue=true;
                return true;
              }
              else
              {
                count++;
              }
            }
          );
        }
      ).then(function clickOption() {
          if (hasMatchedValue) {
            element(key).all(by.tagName('option')).get(count).click();
          }
          else
          {
            console.log("No Match found for= "+value);
          }
        });

    }
  };



  /*this.setDropDown = function (key, value, selectFirst)
  {
    if (selectFirst && (value == undefined || value == ''))
    {
      value = "\uE015"; // DOWN arrow
      element(key).sendKeys(value);
    }
    else
    {
      element(key).sendKeys(value);
    }
  };*/



  this.click = function (key)
  {
    element(key).click();
  };


  this.RadioButtonClick = function (key, value)
  {
    element.all(by.tagName('buttons-radio')).getAttribute('model').then(function (model)
    {
      for (var i = 0; i < model.length; i++)
      {
        if (model[i] == key)
        {
          element.all(by.tagName('buttons-radio')).get(i).isDisplayed().then(function (isVisible)
          {
            if (isVisible)
            {
              element.all(by.tagName('buttons-radio')).get(i).all(by.tagName('label')).getText().then
              (
                function (txt)
                {
                for (var j = 0; j < txt.length; j++)
                {
                  if (txt[j] == value)
                  {
                    element.all(by.tagName('buttons-radio')).get(i).all(by.tagName('label')).get(j).click();
                    break;
                  }
                }
              });
            }
            else
            {

            }
          });
          break;
        }
        else
        {

        }
      }

    });
  };




  this.setAdditionalCoverage = function (key, value, vehicle) {
    if (value != '' && value != undefined) {
      var thisObj = this;
      console.log('setAdditionalCoverage:- key= ' + key + ' value= ' + value + ' vehicle= ' + vehicle);
      element.all(by.repeater('vehicle in vehicles')).all(by.tagName('a')).then
      (
        function (_vehicles) {
          console.log('setAdditionalCoverage:- vehiclelength= ' + _vehicles.length);
          for (var i = 0; i < _vehicles.length; i++) {
            (function (i, _vehicles, key, value, vehicle, thisObj) {
              _vehicles[i].getText().then
              (
                function (vehicleName) {
                  console.log('setAdditionalCoverage:- vehicleName= ' + vehicleName + ' vehicle= ' + vehicle);
                  if (vehicleName == vehicle) {
                    console.log('setAdditionalCoverage:- vehicle matched');
                    _vehicles[i].getAttribute('href').then
                    (
                      function (hrefLink) {
                        console.log('setAdditionalCoverage:- hrefLink= ' + hrefLink);
                        var hrefId = hrefLink.substring(hrefLink.lastIndexOf('/') + 1);
                        console.log('setAdditionalCoverage:- hrefId= ' + hrefId);
                        thisObj.setAdditionalCoverageDropdownValue(key, value, hrefId);
                      }
                    );

                  }
                }
              );
            })(i, _vehicles, key, value, vehicle, thisObj);
          }

        }
      )
    }
  };

  this.setAdditionalCoverageDropdownValue = function (key, value, accordionId, repeaterValue) {
    element(by.id(accordionId)).all(by.repeater('coverage in listedVehicle.Coverages')).then
    (
      function (coverage) {
        console.log("setAdditionalCoverageDropdownValue:- check coverage.length= " + coverage.length);
        for (var i = 0; i < coverage.length; i++) {
          (function (i) {

            coverage[i].all(by.tagName('label')).then
            (
              function (labels) {
                console.log("setAdditionalCoverageDropdownValue:- labellength= " + labels.length);
                for (var j = 0; j < labels.length; j++) {

                  (function (i, j, key, value, coverage) {
                    labels[j].getText().then
                    (
                      function (text) {
                        console.log("setAdditionalCoverageDropdownValue :-labeltext " + j + " = " + text + " Key= " + key);
                        if (text == key) {
                          console.log("setAdditionalCoverageDropdownValue:- Matched labeltext " + j + " = " + text + " Key= " + key);
                          coverage[i].all(by.tagName('select')).then
                          (
                            function (ddl) {
                              console.log("setAdditionalCoverageDropdownValue:- ddl= " + ddl.length + " value= " + value);
                              ddl[0].sendKeys(value);
                            }
                          );
                        }
                      }
                    );
                  })(i, j, key, value, coverage);
                }
              }
            );
          })(i);
        }
      }
    )
  };

  this.setPrimaryCoverage = function (key, value, repeaterValue) {
    if (value != '' && value != undefined) {
      element.all(by.repeater(repeaterValue)).then
      (
        function (coverage) {
          console.log("check coverage.length= " + coverage.length);
          for (var i = 0; i < coverage.length; i++) {
            (function (i) {
              element.all(by.repeater(repeaterValue)).get(i).then
              (
                function (CustomLineCoverages) {
                  console.log("check CustomLineCoverages= " + CustomLineCoverages.length);
                  CustomLineCoverages.all(by.tagName('label')).then
                  (
                    function (labels) {
                      console.log("labellength= " + labels.length);
                      for (var j = 0; j < labels.length; j++) {

                        (function (j, key, value, CustomLineCoverages) {
                          labels[j].getText().then
                          (
                            function (text) {
                              console.log("labeltext " + j + " = " + text + " Key= " + key);
                              if (text == key) {
                                console.log("Matched labeltext " + j + " = " + text + " Key= " + key);
                                CustomLineCoverages.all(by.tagName('select')).then
                                (
                                  function (ddl) {
                                    ddl[0].sendKeys(value);
                                  }
                                );
                              }
                            }
                          );
                        })(j, key, value, CustomLineCoverages);
                      }
                    }
                  );


                  //console.log('label '+i+'= '+labels[0]);
                  /*console.log("Coverage= " + labelText);
                   console.log('Key='+key);
                   if (labelText == key)
                   {
                   element.all(by.repeater('coverage in quote.LineCoverages')).get(i).element(by.tagName('select')).first().sendKeys(value);
                   }*/
                }
              );
            })(i);
          }
        }
      );

    }
  };


  this.openAccordian = function () {
    element.all(by.id('quote_coverage')).all(by.css('.accordion-toggle')).then
    (
      function (accordian) {
        console.log("Accordian Length= " + accordian.length);
        for (var i = 0; i < accordian.length; i++) {
          (function (i, accordian) {
            var ptor = browser;
            ptor.executeScript('window.scrollTo(0,document.body.scrollHeight);').then
            (
              function () {
                accordian[i].click().then
                (
                  function () {
                    return true;
                  }
                  ,
                  function () {
                    console.log('not clickable');
                    return false;
                  }
                );
              }
            );
          })(i, accordian);
        }
      }
    );
  };

  this.assignDrivers = function (obj)
  {

    element.all(by.repeater('driver in assignDriverVehiclesList')).all(by.tagName('label')).getText().then
    (
      function (drivers)
      {
        console.log("assignDrivers:-  drivers.length="+drivers.length);
        for (var i = 0; i < drivers.length; i++)
        {
          for (var j = 0; j < obj.ListedDrivers.length; j++)
          {
            console.log("assignDrivers:-  drivers[i]="+drivers[i]+" obj.FirstName + obj.LastName="+obj.FirstName+ " "+obj.LastName);
            if(drivers[i].toLowerCase()==(obj.FirstName+ " "+obj.LastName).toLowerCase())
            {
              console.log("assignDrivers:- inside if");
              for(k=0;k<obj.Vehicles.length;k++)
              {
                if(obj.WhichVehicleDriveMostId==obj.Vehicles[k].VehicleNumber)
                {
                  var carName = obj.Vehicles[k].ModelYear + " " + obj.Vehicles[k].Make + " " + obj.Vehicles[k].Model;
                  (
                    function(carName,i)
                    {
                      element.all(by.repeater('driver in assignDriverVehiclesList')).get(i).element(by.tagName('select')).sendKeys(carName);
                    }
                  )(carName,i);
                  break;
                }
              }
              break;
            }
            else if(drivers[i].toLowerCase()==(obj.ListedDrivers[j].FirstName+ " "+obj.ListedDrivers[j].LastName).toLowerCase())
            {
              console.log("assignDrivers:- inside else if");
              for(k=0;k<obj.Vehicles.length;k++)
              {
                if(obj.ListedDrivers[j].WhichVehicleDriveMostId==obj.Vehicles[k].VehicleNumber)
                {
                  var carName = obj.Vehicles[k].ModelYear + " " + obj.Vehicles[k].Make + " " + obj.Vehicles[k].Model;
                  (
                    function(carName,i)
                    {
                      element.all(by.repeater('driver in assignDriverVehiclesList')).get(i).element(by.tagName('select')).sendKeys(carName);
                    }
                  )(carName,i);
                  break;
                }
              }
              break;
            }
          }
        }
      }
    );
  };





  this.setValuesOnConfirmDriverPage = function (obj) {
    element(by.id('step-confirm-driver')).all(by.repeater('driver in confirmDriverSummary.confirmedDrivers')).then
    (
      function (driverRepeaters) {
        console.log("setValuesOnConfirmDriverPage:- driverRepeaters length= " + driverRepeaters.length);
        for (var i = 0; i < driverRepeaters.length; i++) {
          (function (i) {
            driverRepeaters[i].element(by.tagName('h4')).getText().then
            (
              function (driverNameFromPage) {
                var driverName = obj.FirstName + " " + obj.LastName;
                console.log("setValuesOnConfirmDriverPage:- if driverNameFromPage " + i + " = " + driverNameFromPage + " drivername= " + driverName);
                if (driverName.toLowerCase() == driverNameFromPage.toLowerCase()) {
                  driverRepeaters[i].element(by.model('driver.LicenseNumber')).sendKeys(obj.LicenseNumber);
                  driverRepeaters[i].element(by.model('driver.LicenseState')).sendKeys(obj.LicenseState);
                }
                else {
                  for (var j = 0; j < obj.ListedDrivers.length; j++) {
                    driverName = obj.ListedDrivers[j].FirstName + " " + obj.ListedDrivers[j].LastName;
                    console.log("setValuesOnConfirmDriverPage:- else driverNameFromPage " + i + " = " + driverNameFromPage + " drivername= " + driverName);
                    if (driverName.toLowerCase() == driverNameFromPage.toLowerCase()) {
                      driverRepeaters[i].element(by.model('driver.LicenseNumber')).sendKeys(obj.ListedDrivers[j].LicenseNumber);
                      driverRepeaters[i].element(by.model('driver.LicenseState')).sendKeys(obj.ListedDrivers[j].LicenseState);
                    }
                  }
                }
              }
            );
          })(i);

        }
      }
    );
  };

  this.setValuesOnConfirmVehiclePage = function (obj)
  {

    element(by.id('step-confirm-vehicle')).all(by.repeater('vehicle in confirmVehicleSummary.vehicles')).then
    (
      function (vehicleRepeaters)
      {
        console.log("setValuesOnConfirmVehiclePage:- vehicleRepeaters length= " + vehicleRepeaters.length);
        for (var i = 0; i < vehicleRepeaters.length; i++)
        {
          (function (i)
          {
            vehicleRepeaters[i].element(by.tagName('h4')).getText().then
            (
              function(vehicleNameFromPage)
              {

                for (var j = 0; j < obj.Vehicles.length; j++)
                {
                  (function(j)
                    {
                      var vehicleName = obj.Vehicles[j].ModelYear + " " + obj.Vehicles[j].Make + " " + obj.Vehicles[j].Model;
                      if(vehicleName.toLowerCase().trim()==vehicleNameFromPage.toLowerCase().trim())
                      {
                        console.log("setValuesOnConfirmVehiclePage:- If  vehicleNameFromPage " + i + " = " + vehicleNameFromPage + " vehicleName= " + vehicleName);
                        console.log("ClickRadioButtonClickInDivision:- vehicle.IsDamaged= "+obj.Vehicles[j].IsDamaged+" vehicle.Name= "+obj.Vehicles[j].ModelYear + " " + obj.Vehicles[j].Make + " " + obj.Vehicles[j].Model);
                        vehicleRepeaters[i].all(by.tagName('buttons-radio')).getAttribute('model').then
                        (
                          function (model)
                          {
                            console.log("Model Length= "+model.length);
                            console.log("Vehicle repeater index= "+i);
                            for (var k = 0; k < model.length; k++)
                            {
                              if (model[k] == 'vehicle.IsDamaged')
                              {
                                vehicleRepeaters[i].all(by.tagName('buttons-radio')).get(k).isDisplayed().then
                                (
                                  function (isVisible)
                                  {
                                    if (isVisible)
                                    {
                                      vehicleRepeaters[i].all(by.tagName('buttons-radio')).get(k).all(by.tagName('label')).getText().then
                                      (
                                        function (txt)
                                        {
                                          for (var l = 0; l < txt.length; l++)
                                          {
                                            if (txt[l] == obj.Vehicles[j].IsDamaged)
                                            {
                                              vehicleRepeaters[i].all(by.tagName('buttons-radio')).get(k).all(by.tagName('label')).get(l).click().then
                                              (
                                                function()
                                                {
                                                  if (obj.Vehicles[j].IsDamaged != undefined && obj.Vehicles[j].IsDamaged != '' && obj.Vehicles[j].IsDamaged != null && obj.Vehicles[j].IsDamaged == 'Yes')
                                                  {
                                                    vehicleRepeaters[i].element(by.model('vehicle.DamageDescription')).sendKeys(obj.Vehicles[j].DamageDescription);
                                                  }
                                                  vehicleRepeaters[i].element(by.model('vehicle.Vin')).sendKeys(obj.Vehicles[j].VIN);
                                                  var ptor = browser;
                                                  if(obj.Vehicles[j].Ownership=='Yes')
                                                  {
                                                    vehicleRepeaters[i].element(by.model('vehicle.IsInLien')).click();
                                                    ptor.waitForAngular();
                                                    vehicleRepeaters[i].element(by.model('vehicle.LienHolder.AddressLine1')).sendKeys(obj.Vehicles[j].LienHolderAddressLine1);
                                                    vehicleRepeaters[i].element(by.model('vehicle.LienHolder.AddressLine2')).sendKeys(obj.Vehicles[j].LienHolderAddressLine2);
                                                    vehicleRepeaters[i].element(by.model('vehicle.LienHolder.City')).sendKeys(obj.Vehicles[j].LienHolderCity);
                                                    vehicleRepeaters[i].element(by.model('vehicle.LienHolder.State')).sendKeys(obj.Vehicles[j].LienHolderState);
                                                    vehicleRepeaters[i].element(by.model('vehicle.LienHolder.PostalCode')).sendKeys(obj.Vehicles[j].LienHolderPostalCode);
                                                    vehicleRepeaters[i].element(by.model('vehicle.LienHolder.Name')).sendKeys(obj.Vehicles[j].LienHolderName);
                                                  }

                                                },
                                                function()
                                                {

                                                }
                                              );
                                              break;
                                            }
                                          }
                                        });
                                    }
                                    else
                                    {

                                    }
                                  });
                                break;
                              }
                              else
                              {

                              }
                            }

                          });
                        /*(thisObj.ClickRadioButtonClickInDivision(vehicleRepeaters[i],'vehicle.IsDamaged',obj.Vehicles[j]);
                         ptor.waitForAngular();
                         if(obj.Vehicles[j].Ownership!='Paid Off')
                         {
                         vehicleRepeaters[i].element(by.model('vehicle.LienHolder.AddressLine1')).sendKeys(obj.Vehicles[j].LienHolderAddressLine1);
                         vehicleRepeaters[i].element(by.model('vehicle.LienHolder.AddressLine2')).sendKeys(obj.Vehicles[j].LienHolderAddressLine2);
                         vehicleRepeaters[i].element(by.model('vehicle.LienHolder.City')).sendKeys(obj.Vehicles[j].LienHolderCity);
                         vehicleRepeaters[i].element(by.model('vehicle.LienHolder.State')).sendKeys(obj.Vehicles[j].LienHolderState);
                         vehicleRepeaters[i].element(by.model('vehicle.LienHolder.PostalCode')).sendKeys(obj.Vehicles[j].LienHolderPostalCode);
                         vehicleRepeaters[i].element(by.model('vehicle.LienHolder.Name')).sendKeys(obj.Vehicles[j].LienHolderName);
                         }*/
                      }
                      else
                      {
                        console.log("setValuesOnConfirmVehiclePage:- else  vehicleNameFromPage " + i + " = " + vehicleNameFromPage + " vehicleName= " + vehicleName);
                      }
                    }
                  )(j);

                }//vyom
              }
            );
          })(i);
        }
      }
    );
  };


  this.ClickRadioButtonClickInDivision = function (division,key, vehicle)
  {
    console.log("ClickRadioButtonClickInDivision:- vehicle.IsDamaged= "+vehicle.IsDamaged+" vehicle.Name= "+vehicle.ModelYear + " " + vehicle.Make + " " + vehicle.Model);
    division.all(by.tagName('buttons-radio')).getAttribute('model').then
    (
      function (model)
      {
        for (var i = 0; i < model.length; i++)
        {
          if (model[i] == key)
          {
            element.all(by.tagName('buttons-radio')).get(i).isDisplayed().then
            (
              function (isVisible)
              {
                if (isVisible)
                {
                  element.all(by.tagName('buttons-radio')).get(i).all(by.tagName('label')).getText().then
                  (
                    function (txt)
                    {
                      for (var j = 0; j < txt.length; j++)
                      {
                        if (txt[j] == vehicle.IsDamaged)
                        {
                          element.all(by.tagName('buttons-radio')).get(i).all(by.tagName('label')).get(j).click().then
                          (
                            function()
                            {
                              if (vehicle.IsDamaged != undefined && vehicle.IsDamaged != '' && vehicle.IsDamaged != null && vehicle.IsDamaged == 'Yes')
                              {
                                division.element(by.model('vehicle.DamageDescription')).sendKeys(vehicle.DamageDescription);
                              }
                              division.element(by.model('vehicle.VIN')).sendKeys(vehicle.VIN);
                              division.element(by.model('vehicle.Ownership')).sendKeys(vehicle.Ownership);

                            },
                            function()
                            {

                            }
                          );
                          break;
                        }
                      }
                    });
                }
                else
                {

                }
              });
            break;
          }
          else
          {

          }
        }

    });
  };


  this.waitForElement = function (element, label) {
    browser.wait(function () {
      return element.isPresent().then(function (state) {
        if (state == true) {
          return element.isDisplayed().then(function (state2) {
            return state2 == true;
          });
        } else {
          return false;
        }
      });
    }, 10000, label + " did not appear");
    browser.sleep(250);
  };

  /*this.setText = function (key, value, clearText) {
    if (value == undefined) {
      return false;
    }

    var flag;
    var ptor = protractor.getInstance();
    ptor.isElementPresent(key).then(function (present)
      {
        if (present == true)
        {
          element(key).isDisplayed().then(function (isVisible)
          {
            if (isVisible)
            {
              element(key).getAttribute('ng-model').then(function (attr)
              {
                element(key).getAttribute('readonly').then(function (attr)
                {
                  if (attr == null)
                  {
                    if (clearText)
                    {
                      element(key).clear();
                    }

                    element(key).sendKeys(value);
                    flag = true;
                  }
                });
              });
            }
            else
            {
              flag = false;
            }
          });
        }
        else
        {
          flag = false;
        }
      }
    );
    return flag;
  };

  this.setDropDown = function (key, value, selectFirst)
  {
    var flag = false;
    if (selectFirst && (value == undefined || value == ''))
    {
      value = "\uE015"; // DOWN arrow
    }
    var ptor = protractor.getInstance();
    ptor.isElementPresent(key).then(function (present)
      {
        if (present == true)
        {
          element(key).isDisplayed().then
          (
            function (isVisible)
            {
              if (isVisible)
              {
                element(key).getAttribute('ng-model').then
                (
                  function (attr)
                  {
                    element(key).getAttribute('readonly').then
                    (
                      function (attr)
                      {
                        if (attr == null)
                        {
                          element(key).sendKeys(value);
                          flag = true;
                        }
                      }
                    );
                  });
              }
              else
              {
                flag = false;
              }
            }
          );
        }
        else
        {
          flag = false;
        }
      }
    );

    return flag;
  };*/






};

module.exports = Helper;


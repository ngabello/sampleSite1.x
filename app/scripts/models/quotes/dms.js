/**
 * Created by gabello on 3/25/2015.
 */
'use strict';
function DmsModelService() {
  return ['$q', '$log', 'ancillaryAPIDataService', 'QuoteIntentModel', 'vinIsoDataService', 'segmentIoTrackingService',
    function ($q, $log, ancillaryAPIDataService, quoteIntentModel, vinIsoDataService, segmentIoTrackingService) {
      var clazz = function (attributes) {
        var defaults = {
          ErrorFlag: null,
          CapInd: null,
          DaysSinceLastInsured: null,
          DaysWithoutCoverageInLastThreeYears: null,
          Drivers: [{
            FirstName: null,
            LastName: null,
            DateOfBirth: null,
            FullName: null,
            LicenseNumber: null,
            LicenseState: null,
            AddedToPolicy: null
          }],
          Vehicles: [{
            AddedToPolicy: null,
            LienInfoAvailable: null,
            LienHolderAddrLine1: null,
            LienHolderAddrLine2: null,
            LienHolderCity: null,
            LienHolderState: null,
            LienHolderZip: null,
            LienHolderName: null,
            MakeID: null,
            MakeName: null,
            ModelID: null,
            ModelName: null,
            ModelYear: null,
            PIPMPSymbol: null,
            RatedYear: null,
            ShortModelName: null,
            StyleName: null,
            Vin: null
          }],
          Links: [{
            Href: null,
            Rel: null
          }]
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        getDmsRouteName: function () {
          return '/dms/data-prefill';
        },

        getSameDay: function (dateAStr, dateBStr) {
          //Our Display dates are always mm-dd-yyyy, firefox cannot process '-' in Date constructor
          var dateAVal = dateAStr.replace(/-/g, "/");
          var dateBVal = dateBStr.replace(/-/g, "/");
          var dateA = new Date(dateAVal);
          var dateB = new Date(dateBVal);
          return dateA.getFullYear() == dateB.getFullYear()
            && dateA.getDate() == dateB.getDate()
            && dateA.getMonth() == dateB.getMonth();
        },

        getPrefillInquiry: function () {
          var policyHolder = quoteIntentModel.getPolicyHolder();
          var physicalAddress = quoteIntentModel.getAddress();
          var inquiry = {
            DateOfBirth: policyHolder.DateOfBirth,
            FirstName: policyHolder.FirstName,
            LastName: policyHolder.LastName,
            AddressLine1: physicalAddress.AddressLine1,
            City: physicalAddress.City,
            State: physicalAddress.State,
            ZipCode: physicalAddress.PostalCode
          };
          return inquiry;
        },

        getDataPrefill: function () {
          var inquiry = this.getPrefillInquiry();
          var routeName = this.getDmsRouteName();
          var deferred = $q.defer();
          var currentDms = this;
          if (!inquiry || !inquiry.FirstName || !inquiry.LastName || !inquiry.AddressLine1 || !inquiry.City || !inquiry.State
            || !inquiry.ZipCode) {
            deferred.reject('Invalid data object to call data-prefill');
            return deferred.promise;
          }
          segmentIoTrackingService.trackGeneralEvent('DataPrefill', JSON.stringify(inquiry));
          ancillaryAPIDataService.postApiData(routeName, inquiry).then(function (response) {
            var dmsResults = JSON.parse(JSON.stringify(response.data));
            currentDms.populateData(dmsResults);
            quoteIntentModel.saveDmsData(currentDms);
            deferred.resolve("Success");
          }, function (error) {
            $log.error(String.format('ancillaryAPIDataService: failed calling dataPrefill with inquiry {0}', JSON.stringify(inquiry)), error);
            deferred.reject(error);
          });
          return deferred.promise;
        },

        prefillDmsVehicleData: function () {
          var dmsVehicles = quoteIntentModel.getDmsVehicles();
          var currentVehicles = quoteIntentModel.getVehicles();
          var currentDms = this;
          if (dmsVehicles && dmsVehicles.length > 0) {
            var matchCollection = [];
            _.each(dmsVehicles, function (dmsVehicleItem) {
              //Find a user entered vehicle that matches up with a dms vehicle
              var matchedVehicle = _.find(currentVehicles, function (currentVehicle) {
                //if user entered vin exists do not update
                if (currentVehicle.Vin) {
                  return false;
                }
                if (currentVehicle.Year == dmsVehicleItem.ModelYear && currentVehicle.Make.toLowerCase() == dmsVehicleItem.MakeName.toLowerCase()
                  && currentVehicle.Model.toLowerCase() == dmsVehicleItem.ModelName.toLowerCase()) {
                  return currentVehicle;
                }
              });
              //update year make model matches and leave the loop
              if (matchedVehicle) return currentDms.updateVehicleInformation(matchedVehicle, dmsVehicleItem);
            });
          }
        },
        collectMatchedVehicles: function () {
          var dmsVehicles = quoteIntentModel.getDmsVehicles();
          var currentVehicles = quoteIntentModel.getVehicles();
          var currentDms = this;
          if (dmsVehicles && dmsVehicles.length > 0) {
            var matchCollection = [];
            _.each(dmsVehicles, function (dmsVehicleItem) {
              _.each(currentVehicles, function (currentVehicle) {
                //if user entered vin exists do not update
                if (currentVehicle.Vin) {
                  return false;
                }
                //look for Y/Mk, Mk/Md matches
                if (currentVehicle.ShortModelName) {
                  if ((currentVehicle.Year == dmsVehicleItem.ModelYear && currentVehicle.Make.toLowerCase() == dmsVehicleItem.MakeName.toLowerCase()) ||
                    (currentVehicle.ShortModelName.toLowerCase() == dmsVehicleItem.ShortModelName.toLowerCase() && currentVehicle.Make.toLowerCase() == dmsVehicleItem.MakeName.toLowerCase())) {
                    matchCollection.push({
                      dmsVehicle: dmsVehicleItem,
                      currentVehicle: currentVehicle
                    })
                  }
                }
                else if ((currentVehicle.Year == dmsVehicleItem.ModelYear && currentVehicle.Make.toLowerCase() == dmsVehicleItem.MakeName.toLowerCase()) ||
                  (currentVehicle.Model.toLowerCase() == dmsVehicleItem.ModelName.toLowerCase() && currentVehicle.Make.toLowerCase() == dmsVehicleItem.MakeName.toLowerCase())) {
                  matchCollection.push({
                    dmsVehicle: dmsVehicleItem,
                    currentVehicle: currentVehicle
                  })
                }
              });
            });
            //if we have Y/Mk or Mk/Mo matches show confirmation model
            if (matchCollection.length > 0) {
              return matchCollection;
            }
          }
        },
        updateVehicleInformation: function (matchedVehicle, dmsVehicleItem) {
          if (matchedVehicle) {
            var dmsVehicles = quoteIntentModel.getDmsVehicles();
            //update the user entered vehicle with the VIN and Lienholder data if it applies
            segmentIoTrackingService.trackGeneralEvent('DataPrefill', {
              "MatchedVehicle": true
            });
            //update the matched vehicles vin
            var dmsVehicle = _.findWhere(dmsVehicles, {Vin: dmsVehicleItem.Vin});
            if (dmsVehicle) {
              quoteIntentModel.updateVehicleVin(matchedVehicle.ID, dmsVehicleItem.Vin);
              //If there is lien holder data and the vehicle is not paidOff then bonus update that as well
              if (dmsVehicle.LienInfoAvailable && matchedVehicle.Ownership != 'PaidOff') {
                quoteIntentModel.updateVehicleLienData(matchedVehicle.ID, dmsVehicle.LienHolderName, dmsVehicle.LienHolderAddrLine1,
                  dmsVehicle.LienHolderCity, dmsVehicle.LienHolderState, dmsVehicle.LienHolderZip);
              }
            }
          }
        },
        prefillDmsData: function () {
          var currentDms = this;
          var deferred = $q.defer();
          var matchedDrivers = [];
          this.getDataPrefill().then(function () {
            //Start the vehicle retrieval but let the drivers stuff move on
            currentDms.prefillDmsVehicleData();
            var dmsDrivers = quoteIntentModel.getDmsDrivers();
            if (dmsDrivers && dmsDrivers.length > 0) {
              var ratedDrivers = quoteIntentModel.getRatedDrivers();
              var currentState = quoteIntentModel.getAddress().State;
              //Match up drivers and update the drivers license data
              _.each(ratedDrivers, function (ratedDriver) {
                //try to find a match for this rated driver in the list of dmsDrivers
                var driverMatch = _.find(dmsDrivers, function (dmsDriverItem) {
                  if (dmsDriverItem.FirstName.toLowerCase() == ratedDriver.FirstName.toLowerCase()
                    && dmsDriverItem.LastName.toLowerCase() == ratedDriver.LastName.toLowerCase()
                    && currentDms.getSameDay(dmsDriverItem.DateOfBirth, ratedDriver.DateOfBirth)) {
                    return dmsDriverItem;
                  }
                });
                if (driverMatch) {
                  //we have found a matching driver based on First, LastName and DateOfBirth
                  //if user entered license exists do not update
                  if (ratedDriver.LicenseNumber) {
                    return false;
                  }
                  quoteIntentModel.updateDriverLicenseInfo(ratedDriver.ID, driverMatch.LicenseNumber, driverMatch.LicenseState);
                  //Test each LicenseNumber for validity if all are valid
                  var licensePattern = new RegExp("^" + GetDLPatterByState(driverMatch.LicenseState) + "$");
                  //If the driver matches and is valid then add it to the list to return
                  if (licensePattern.test(driverMatch.LicenseNumber) && currentState == driverMatch.LicenseState) {
                    matchedDrivers.push(quoteIntentModel.getDriverById(ratedDriver.ID));
                  }
                }
              });//_.each
            }//if dmsDrivers
            //if the matched driver count equals the rated driver count and are all valid
            //then we do not need to show Confirm Driver screen.
            deferred.resolve(matchedDrivers);
          }, function (error) {
            //Log the error here;
            deferred.reject(error);
          });
          //return the promise
          return deferred.promise;
        },

        populateData: function (data) {
          _.extend(this, data);

          // MUST convert date/time to utc b/c that's what the internal api returns
          if (this.Drivers && this.Drivers.length > 0) {
            _.each(this.Drivers, function (driver) {
              driver.DateOfBirth = moment.utc(driver.DateOfBirth).format('MM-DD-YYYY');
              //strip extra characters from license #
              if (driver.hasOwnProperty('LicenseNumber')) {
                driver.LicenseNumber = driver.LicenseNumber.replace(/[^A-Za-z0-9]/g, '');
              }
            });
          }
        }
      });

      return clazz;
    }
  ];
}

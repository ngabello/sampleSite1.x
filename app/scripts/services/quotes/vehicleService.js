/**
 * Created by gabello on 12/9/2015.
 */
function VehicleService() {
  'use strict';

  var getVinIsoYears = function (vinIsoDataService) {
    return vinIsoDataService.getVinIsoYears();
  };

  var getVehicleAssignments = function(quoteData){
    var vehicles = quoteData.getVehicles();
    var collection = [];
    if(vehicles.length > 0){
      _.each(vehicles, function(vehicle){
        collection.push({
          MakeModel: vehicle.Make + ' ' + vehicle.Model,
          PrimaryVehicleID: vehicle.ID,
          PrimaryDriverID: vehicle.PrimaryDriverID
        })
      });
    }
    return collection;
  };
  var saveAllAssignments = function(vehicleAssignments, quoteData) {
    _.each(vehicleAssignments, function (vehicleAssignment) {
      var vehicleModel = quoteData.getVehicleById(vehicleAssignment.PrimaryVehicleID);
      vehicleModel.PrimaryDriverID = vehicleAssignment.PrimaryDriverID;
      vehicleModel.save();
    });
  }
  return ['$q', 'QuoteIntentModel', 'vinIsoDataService', 'localStorageService', 'ancillaryAPIDataService',
    function ($q, quoteIntentModel, vinIsoDataService, localStorage, ancillaryAPIDataService) {
    return {

      getVinIsoYears: function () {
        var vehicleYearPromise = $q.defer();
        var vehicleYears = localStorage.get('vehicleYears');
        if (!vehicleYears) {
          getVinIsoYears(vinIsoDataService).then(function (yearData) {
            var tempYears = [];
            _.each(yearData, function (yearItem) {
              tempYears.push(yearItem.Year);
            });
            var years = _.sortBy(tempYears, function (year) {
              return year;
            });
            localStorage.set('vehicleYears', years);
            vehicleYearPromise.resolve(years);
          }, function (error) {
            vehicleYearPromise.reject(error);
          });
        } else {
          vehicleYearPromise.resolve(vehicleYears);
        }
        return vehicleYearPromise.promise;
      },

      getLienHolderList: function(){
        var vehicleLienPromise = $q.defer();
        var vehicleLienHolders = localStorage.get('vehicleLienHolders');
        if (!vehicleLienHolders) {
          ancillaryAPIDataService.getApiData('/resource/lien-holder-iso').then(function (lienDataResult) {
            vehicleLienHolders = lienDataResult.data;
            localStorage.set('vehicleLienHolders', vehicleLienHolders);
            vehicleLienPromise.resolve(vehicleLienHolders);
          }, function (error) {
            vehicleLienPromise.reject(error);
          });
        } else {
          vehicleLienPromise.resolve(vehicleLienHolders);
        }
        return vehicleLienPromise.promise;
       },

      getLienHolder: function(lienHolderName){
        var vehicleLienHolders = localStorage.get('vehicleLienHolders');
        var lienHolder = _.findWhere(vehicleLienHolders, {Name: lienHolderName});
        return lienHolder;
      },

      getMinVehicleYear: function () {
        var vehicleYears = localStorage.get('vehicleYears');
        return _.min(vehicleYears);
      },

      getMaxVehicleYear: function () {
        var vehicleYears = localStorage.get('vehicleYears');
        return _.max(vehicleYears);
      },

      saveVehicles: function (vehicles) {
        _.each(vehicles, function (vehicle) {
          vehicle.save()
        });
      },

      saveEligibleVehicles: function (vehicles,  eligibilityList, eligibilityFlag, formModel) {
        _.each(vehicles, function (vehicle) {
          if (_.findWhere(eligibilityList, {vehicleId: vehicle.ID})) {
            vehicle.HasDiminishingDeductible = (eligibilityFlag && formModel) ? true : false;
          } else {
            vehicle.HasDiminishingDeductible = false;
          }
          vehicle.save()
        });
      },

      saveAllVehicleLienData: function (promiseEng, vehicles) {
        _.each(vehicles, function (vehicle) {
          vehicle.saveLienHolder()
        });
      },

      getYearDifference: function () {
        return 2;
      },

      getCurrentYear: function () {
        return new Date().getFullYear();
      },

      getMinYear: function () {
        return new Date().getFullYear() - this.getYearDifference()
      },

      getYearsOwned: function (yearSelected) {
        var years = [];
        var addPriorTo = true;
        var currentYear = this.getCurrentYear();
        var minYear = this.getMinYear();
        // if we are less than 60 days from the next year add it as well
        var days = new Date().getDOY();
        if ((365 - days) <= 60) {
          years.push({Value: currentYear + 1, Desc: currentYear + 1})
        }

        if (yearSelected > minYear) {
          minYear = yearSelected - 1;
          addPriorTo = false;
        }

        for (var i = currentYear; i >= minYear; i--) {
          years.push({Value: i, Desc: i})
        }

        if (addPriorTo) {
          years.push({Value: 1, Desc: String.format("Prior to {0}", currentYear - this.getYearDifference())});
        }

        return years;
      },

      getMonthsOwned: function () {
        var count = 0;
        var months = [];
        while (count < 12) months.push({Value: count, Desc: moment().month(count++).format("MMMM")});
        return months;
      },

      fillMakes: function (vehicleYear) {
        var vehicleMakes = [];
        var newResDeferred = $q.defer();
        vinIsoDataService.getVinIsoMakes(vehicleYear).then(function (yearResponse) {
          _.each(yearResponse.data.YearMakeModelRecords, function (item) {
            if (!item.DoNotInsure) {
              vehicleMakes.push(item);
            }
          });
          newResDeferred.resolve(vehicleMakes);
        }, function (error) {
          newResDeferred.reject(error);
        });
        return newResDeferred.promise;
      },

      fillOtherStuff: function (href) {
        var itemsToCollect = [];
        var newResDeferred = $q.defer();
        vinIsoDataService.getVinIsoVehicleData(href).then(function (makeResponse) {
          _.each(makeResponse.data.YearMakeModelRecords, function (item) {
            if (!item.DoNotInsure) {
              itemsToCollect.push(item);
            }
          });
          newResDeferred.resolve(itemsToCollect);
        }, function (error) {
          newResDeferred.reject(error);
        });
        return newResDeferred.promise;
      },

      validateVehicles: function (vehicles) {
        var invalidVehicle = _.find(vehicles, function (vehicle) {
          return !vehicle.MakeID || !vehicle.ModelID || !vehicle.YearStyleID || !vehicle.PrimaryUse || !vehicle.PrimaryDriverID;
        });
        return invalidVehicle;
      },
      saveAllAssignments: function (promiseEng, driverAssignments) {
        return saveAllAssignments(promiseEng, driverAssignments, quoteIntentModel);
      },
      getVehicleAssignments: function () {
        return getVehicleAssignments(quoteIntentModel);
      },
      showVehicleAssignments: function(){
        var drivers = quoteIntentModel.getDrivers();
        if(drivers.length === 1){
          var assignments = this.getVehicleAssignments();
          _.each(assignments, function(assignment){
            assignment.PrimaryDriverID = drivers[0].ID;
          });
          this.saveAllAssignments(assignments, quoteIntentModel);
          return false;
        }else{
          return true;
        }
      }

    }
  }];
}

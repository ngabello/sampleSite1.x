/**
 * Created by gabello on 3/31/2015.
 */
function DriverService() {
  'use strict';

  function getDriverAssignments(quoteData) {
    var ratedDrivers = quoteData.getRatedDrivers();
    var vehicles = quoteData.getVehicles();
    var assignDriverVehiclesList = [];
    //I've been told that we only skip driver assignments if there is only one vehicle
    if (ratedDrivers.length > 0) { //Finds any driver that needs an assignment
      _.each(ratedDrivers, function (ratedDriver) {
        assignDriverVehiclesList.push({
          Name: ratedDriver.FirstName + ' ' + ratedDriver.LastName,
          HankIdField: ratedDriver.FirstName + ratedDriver.MiddleName + ratedDriver.LastName,
          PrimaryDriverID: ratedDriver.ID,
          PrimaryVehicleID: ratedDriver.PrimaryVehicleID
        });
      });
    }
    return assignDriverVehiclesList;
  }

  function saveAllAssignments(driverAssignments, quoteData) {
    _.each(driverAssignments, function (driverAssignment) {
      var driverModel = quoteData.getDriverById(driverAssignment.PrimaryDriverID);
      driverModel.PrimaryVehicleID = driverAssignment.PrimaryVehicleID;
      driverModel.save();
    });
  }

  function saveDrivers(drivers) {
    _.each(drivers, function (driver) {
      driver.save()
    });
  }

  return ['QuoteIntentModel', 'LookupDataService', function (quoteIntentModel, lookupDataService) {
    return {

      hasDriverAssignments: function () {
        var assignments = getDriverAssignments(quoteIntentModel);
        return assignments.length > 0;
      },

      getDriverAssignments: function () {
        return getDriverAssignments(quoteIntentModel);
      },

      saveAllAssignments: function (promiseEng, driverAssignments) {
        return saveAllAssignments(promiseEng, driverAssignments, quoteIntentModel);
      },

      saveDrivers: function (promiseEng, drivers) {
        return saveDrivers(promiseEng, drivers);
      },

      isAllowedStatus: function(state, licenseStatus){
        var licenseStatuses = lookupDataService.getLicenseStatusLookups();
        var licenseStatusItem =  _.findWhere(licenseStatuses, {Value: licenseStatus});
        if(licenseStatusItem){
          if(_.contains(licenseStatusItem.Meta.StopPHSession, state)){
            return false;
          }
        }
        return true;
      },

      showDriverAssignments: function(){
        var vehicles = quoteIntentModel.getVehicles();
        if (vehicles.length === 1) {
          var assignments = this.getDriverAssignments();
          //Set the PrimaryVehicleId
          _.each(assignments, function (assignment) {
            assignment.PrimaryVehicleID = vehicles[0].ID;
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

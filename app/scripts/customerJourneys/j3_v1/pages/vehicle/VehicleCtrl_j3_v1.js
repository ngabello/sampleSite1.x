/**
 * Created by gabello on 10/8/2014.
 */

function VehicleCtrl_j3_v1() {
  'use strict';

  var initialize = function (scopeInstance) {
    scopeInstance.vehicleMakes = [];
    scopeInstance.vehicleModels = [];
    scopeInstance.vehicleBodyStyles = [];
    scopeInstance.alerts = [];

    if (scopeInstance.vehicle) {
      scopeInstance.vehicle.Make = null;
      scopeInstance.vehicle.MakeID = null;
      scopeInstance.vehicle.Model = null;
      scopeInstance.vehicle.ModelID = null;
      scopeInstance.vehicle.YearStyleID = null;
      scopeInstance.vehicle.Vin = null;
    }
  };

  function GetNextUnprocessedVehicle($scope) {
    var vehicleId;
    var unProcessedLeadVehicles = $scope.vehicleCtrlState.quoteState.UnProcessedLeadVehicles;
    $scope.vehicleCtrlState.showAdditionalVehicle = unProcessedLeadVehicles.length <= 1;
    if (unProcessedLeadVehicles.length > 0) {
      vehicleId = unProcessedLeadVehicles[0];
      unProcessedLeadVehicles.splice(0, 1);
    }
    return vehicleId;
  }

  function SetDateOfAcquisition($scope, vehicle, vehicleService){
    $scope.vehicleCtrlState.vehicle = vehicle;
    $scope.vehicleCtrlState.yearsOwnedOptionList = vehicleService.getYearsOwned($scope.vehicleCtrlState.vehicle.Year);
    //Defaults the Residence Years and Residence Months
    if ($scope.vehicleCtrlState.vehicle.DateOfAcquisition) {
      var m = moment($scope.vehicleCtrlState.vehicle.DateOfAcquisition);
      if (m.isValid()) {
        var year = m.year();
        var month = m.month();
        if (year >= vehicleService.getMinYear($scope.vehicleCtrlState.vehicle.Year)) {
          $scope.vehicleCtrlState.withinXYears = true;
          $scope.vehicleCtrlState.vehicle.YearSelected = year;
          $scope.vehicleCtrlState.vehicle.MonthSelected = month;
        } else {
          $scope.vehicleCtrlState.withinXYears = false;
          $scope.vehicleCtrlState.vehicle.YearSelected = 1;
        }
      }
    }
  }
  function SetUpAdditionalVehicle($scope){
    $scope.vehicleCtrlState.vehicle = null;
    $scope.initializeScope();
    $scope.vehicleCtrlState.alerts.push({type: 'success', msg: 'Successfully added your vehicle'});
    $scope.$broadcast('updateView');
    $scope.vehicleCtrlState.formSubmitted = false;
  }

  return ['$scope', '$stateParams', '$q', '$log', 'QuoteIntentModel', 'ModelHelper', 'pachydermContactInfo', 'vinIsoDataService', 'VehicleService',
    'JourneyService', 'radioChoices', 'LookupDataService', 'DriverService', 'errorService',
    function ($scope, $stateParams, $q, $log, quoteIntentModel, modelHelper, pachydermContactInfo, vinIsoDataService, vehicleService,
              journeyService, radioChoices, lookupDataService, driverService, errorService) {

      journeyService.validatePolicyState();

      $scope.vehicleCtrlState = {
        showAdditionalVehicle: true,
        quoteState: quoteIntentModel.getQuoteState(),
        address: quoteIntentModel.getAddress(),
        vehicles: quoteIntentModel.getVehicles(),
        vehicleDNQs: [],
        yearsDisabled: true,
        withinXYears: false,
        maxYear: new Date().getFullYear(),
        formSubmitted: false,
        addVehicle: null,
        alerts: [],
        vehicle: null,
        drivers: quoteIntentModel.getRatedDrivers(),
        policyHolder: quoteIntentModel.getPolicyHolder(),
        radioChoices: radioChoices,
        vehicleMakes: [],
        vehicleModels: [],
        vehicleBodyStyles: [],
        yearsOwnedOptionList: [],
        currentYear: new Date().getFullYear()
      };

      //region ---------------- Local functions ----------------------------------------------------------------

      var editVehicle = function (vehicle) {
        $scope.vehicleCtrlState.vehicleMakes = [];
        $scope.vehicleCtrlState.vehicleModels = [];
        $scope.vehicleCtrlState.vehicleBodyStyles = [];
        //get the makes
        var manufacturedMake = vehicle.Make;
        vehicleService.fillMakes(vehicle.Year).then(function (vehicleMakes) {
          $scope.vehicleCtrlState.vehicleMakes = vehicleMakes;
          var makeObj = _.findWhere($scope.vehicleCtrlState.vehicleMakes, {MakeId: vehicle.MakeID});
          if (makeObj) {
            //Get the Models
            vehicleService.fillOtherStuff(makeObj.Links[0].Href).then(function (vehicleModels) {
              $scope.vehicleCtrlState.vehicleModels = vehicleModels;
              //Get the Body Styles
              var modelObj = _.findWhere($scope.vehicleCtrlState.vehicleModels, {ModelId: vehicle.ModelID});
              if (modelObj) {
                //get the body styles
                vehicleService.fillOtherStuff(modelObj.Links[0].Href).then(function (bodyStyles) {
                  $scope.vehicleCtrlState.vehicleBodyStyles = bodyStyles;
                  if ($scope.vehicleCtrlState.vehicleBodyStyles.length == 1) {
                    vehicle.YearStyleID = $scope.vehicleCtrlState.vehicleBodyStyles[0].YearStyleId;
                    vehicle.Style = $scope.vehicleCtrlState.vehicleBodyStyles[0].Links[0].Rel;
                  }
                  SetDateOfAcquisition($scope, vehicle, vehicleService);
                });
              } else {
                vehicle.Model = null;
                vehicle.ModelID = null;
                vehicle.YearStyleID = null;
                vehicle.Style = null;
                SetDateOfAcquisition($scope, vehicle, vehicleService);
              }
            });
          } else {
            SetDateOfAcquisition($scope, vehicle, vehicleService);
          }
        });
      };

      var navigateNextStep = function () {
        var vehicles = quoteIntentModel.getVehicles();
        if (vehicles.length === 1) {
          var assignments = driverService.getDriverAssignments();
          //Set the PrimaryVehicleId
          _.each(assignments, function (assignment) {
            assignment.PrimaryVehicleID = vehicles[0].ID;
          });
          driverService.saveAllAssignments(assignments, quoteIntentModel);
        }
        vehicles.length === 1 ? journeyService.getNextStep({AssignmentsNeeded: 0}, null) :
          journeyService.getNextStep({AssignmentsNeeded: driverService.hasDriverAssignments()}, null);
      };

      var validateVehicles = function (vehicles) {
        return  _.find(vehicles, function (vehicle) {
          return !vehicle.MakeID || !vehicle.ModelID || !vehicle.YearStyleID || !vehicle.PrimaryUse;
        });

      };
      //endregion

      //region ---------------- Initialization ----------------------------------------------------------------


      //Lead vehicles get loaded at start up and need to be forced completion
      var vehicleId = GetNextUnprocessedVehicle($scope);
      //If there is a vehicleId in the query string use that first if not there then see if there are any
      //in the vehicle list. This takes into account we could be in edit mode from the previous screen in the
      //journey.
      if(!vehicleId) {
        vehicleId = $stateParams.vehicleId;
      }

      if (!vehicleId) {
        var vehicles = quoteIntentModel.getVehicles();
        //We currently have vehicles grab the first one for edit
        if (vehicles && vehicles.length > 0) {
          editVehicle(vehicles[0]);
        } else {
          $scope.vehicleCtrlState.vehicle = modelHelper.createVehicle();
        }
      } else {
        if (vehicleId === '0') {
          //This is where the user clicks add vehicle from the nav bar
          $scope.vehicleCtrlState.vehicle = modelHelper.createVehicle();
        } else {
          //Edit the vehicle based on vehicleId
          var vehicle = quoteIntentModel.getVehicleById(vehicleId);
          editVehicle(vehicle);
        }
      }
      //endregion

      //region ---------------- Control events ----------------------------------------------------------------

      $scope.initializeScope = function () {
        initialize($scope.vehicleCtrlState);
      };

      $scope.closeAlert = function (index) {
        $scope.vehicleCtrlState.alerts.splice(index, 1);
      };

      $scope.closeVehicleDNQs = function (index) {
        $scope.vehicleCtrlState.vehicleDNQs.splice(index, 1);
      };

      $scope.saveVehicle = function (vehicleForm, action) {
        if (vehicleForm.$valid) {
          //default the vehicle PrimaryDriverID if only 1 vehicle
          if (!$scope.vehicleCtrlState.vehicle.PrimaryDriverID && $scope.vehicleCtrlState.drivers.length === 1) {
            $scope.vehicleCtrlState.vehicle.PrimaryDriverID = $scope.vehicleCtrlState.policyHolder.ID;
          }
          $scope.vehicleCtrlState.vehicle.save();
          //Gotta process any Lead vehicles not processed
          var vehicleId = GetNextUnprocessedVehicle($scope);
          if(vehicleId)
          {
            SetUpAdditionalVehicle($scope);
            //Edit the vehicle based on vehicleId
            var vehicle = quoteIntentModel.getVehicleById(vehicleId);
            editVehicle(vehicle);
            return;
          }

          //We currently have vehicles grab the first one for edit
          var invalidVehicle = validateVehicles(quoteIntentModel.getVehicles());
          if (invalidVehicle) {
            $scope.vehicleCtrlState.formSubmitted = false;
            $scope.vehicleCtrlState.vehicle = null;
            $scope.initializeScope();
            editVehicle(invalidVehicle);
            //$scope.vehicleCtrlState.formSubmitted = true;
            return;
          }

          if ($scope.vehicleCtrlState.addVehicle) {
            SetUpAdditionalVehicle($scope);
            $scope.vehicleCtrlState.vehicles = quoteIntentModel.getVehicles();
            $scope.vehicleCtrlState.vehicle = modelHelper.createVehicle();
            $scope.vehicleCtrlState.addVehicle = null;
            return;
          }
          //if only 1 vehicle make all the assignments
          journeyService.getNextStep(null, null);

        } else {
          $scope.vehicleCtrlState.formSubmitted = true;
          $log.log(vehicleForm);
          //prompt user to re-enter info if calls takes too long or for any other reason
          $scope.vehicleCtrlState.alerts = [{type: 'danger', msg: 'Please enter or re-enter vehicle information'}];
          $scope.$broadcast('scrollToTop');
        }
      };

      $scope.removeVehicle = function (vehicleId) {
        if (!vehicleId) {
          journeyService.getNextStep(null, null);
          return;
        }
        var currentVehicle = quoteIntentModel.getVehicleById(vehicleId);
        if (currentVehicle) {
          currentVehicle.remove();
          $scope.vehicleCtrlState.vehicles = quoteIntentModel.getVehicles();
          var nextVehicle = quoteIntentModel.getNextVehicle();
          $scope.vehicleCtrlState.vehicle = nextVehicle ? editVehicle(nextVehicle) : modelHelper.createVehicle();

        } else {
          $scope.vehicleCtrlState.vehicle = modelHelper.createVehicle();
        }
      };

      //endregion
    }
  ];
}

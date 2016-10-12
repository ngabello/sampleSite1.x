/**
 * Created by gabello on 10/16/2014.
 */
function AdditionalDriverCtrl() {
  'use strict';

  //function ShowAdditionalDriversBtn($scope) {
  //  var unProcessedLeadDrivers = $scope.addnlDriverState.quoteState.UnProcessedLeadDrivers;
  //  $scope.addnlDriverState.showAdditionalDriver = unProcessedLeadDrivers.length <= 1;
  //}

  function GetNextUnprocessedDriver($scope) {
    var driverId;
    var unProcessedLeadDrivers = $scope.addnlDriverState.quoteState.UnProcessedLeadDrivers;
    $scope.addnlDriverState.showAdditionalDriver = unProcessedLeadDrivers.length <= 1;
    if (unProcessedLeadDrivers.length > 0) {
      driverId = unProcessedLeadDrivers[0];
      unProcessedLeadDrivers.splice(0, 1);
    }
    return driverId;
  }

  function SetUpAdditionalDriver($scope) {
    $scope.addnlDriverState.alerts.push({
      type: 'success',
      msg: 'Successfully added ' + $scope.addnlDriverState.driver.FirstName
    });
    //Scroll to the top of the page
    $scope.$broadcast('updateView');
    //Clear the form of validation messages
 //   $scope.addnlDriverState.formSubmitted = false;
  }

  function setSpouse(quoteIntentModel, policyHolder, modelHelper) {
    //Set the driver to the spouse if one exists otherwise create a new driver
    var spouse = quoteIntentModel.getDriverByRelationship(EnumRelationshipToInsureds.Spouse);
    //if there is a spouse and it is in the unprocessed leads drivers array then remove it.
    var driver = spouse ? spouse : modelHelper.createDriver();

    //Default RelationshipToInsured and MaritalStatus
    driver.RelationshipToInsured = EnumRelationshipToInsureds.Spouse;
    if (policyHolder.MaritalStatus == EnumMaritalStatuses.Married) {
      driver.MaritalStatus = EnumMaritalStatuses.Married;
    } else {
      driver.MaritalStatus = EnumMaritalStatuses.CivilUnion;
    }
    return driver;
  }

  return ['$scope', '$stateParams', '$q', '$log', 'QuoteIntentModel', 'JourneyService', 'ModelHelper', 'EventService',
    function ($scope, $stateParams, $q, $log, quoteIntentModel, journeyService, modelHelper, eventService) {

      journeyService.validatePolicyState($scope);

      $scope.addnlDriverState = {
        showAdditionalDriver: true,
        addDriver: null,
        alerts: [],
//        formSubmitted: false,
        totalDrivers: quoteIntentModel.getDriverCount(),
        policyHolder: quoteIntentModel.getPolicyHolder(),
        policy: quoteIntentModel.getPolicy(),
        quoteState: quoteIntentModel.getQuoteState(),
        vehicles: quoteIntentModel.getVehicles(),
        driver: null
      };

      if (!driverId) {
        driverId = $stateParams.driverId;
      }
      if (!driverId) {
        //Lets first go to the spouse if there is one
        if ($scope.addnlDriverState.policyHolder.MaritalStatus == EnumMaritalStatuses.Married
          || $scope.addnlDriverState.policyHolder.MaritalStatus == EnumMaritalStatuses.CivilUnion) {
          $scope.addnlDriverState.driver = setSpouse(quoteIntentModel, $scope.addnlDriverState.policyHolder, modelHelper);
          //If this is the spouse and there is an additional unprocessed lead then don't show additional button
          var unProcessedLeadDrivers = $scope.addnlDriverState.quoteState.UnProcessedLeadDrivers;
          //Check to see if the spouse was in the unProcessedLeadDrivers if so remove it
          var spousalIndex = _.indexOf(unProcessedLeadDrivers, $scope.addnlDriverState.driver.ID);
          if (spousalIndex >= 0) {
            unProcessedLeadDrivers.splice(spousalIndex, 1);
          }
          $scope.addnlDriverState.showAdditionalDriver = unProcessedLeadDrivers.length < 1;
        } else if ($scope.addnlDriverState.quoteState.UnProcessedLeadDrivers.length > 0) {
          //Lead drivers get loaded at start up and need to be forced completion
          var driverId = GetNextUnprocessedDriver($scope);
          $scope.addnlDriverState.driver = quoteIntentModel.getDriverById(driverId);
        }
        else {
          //Get the next driver
          var nextDriver = quoteIntentModel.getNextDriver();
          $scope.addnlDriverState.driver = nextDriver ? nextDriver : modelHelper.createDriver();

          //If this is not a spouse do not give the user the option to select spouse
          $scope.relationShipCodes = _.filter($scope.relationShipCodes, function (item) {
            return item.Value !== EnumRelationshipToInsureds.Spouse;
          });
        }
      } else if (driverId === '0') {
        //User selected add new driver
        $scope.addnlDriverState.driver = modelHelper.createDriver();
      } else {
        //Edit specific driver
        $scope.addnlDriverState.driver = quoteIntentModel.getDriverById(driverId);
      }

      $scope.closeAlert = function (index) {
        $scope.addnlDriverState.alerts.splice(index, 1);
      };

      $scope.submitForm = function (form) {
 //       $scope.addnlDriverState.formSubmitted = true;
        //Fires all events in the queue
        eventService.updateMap();
        if (!form.$valid) {
          $log.log(form);
          return;
        }
        //form is valid save driver and policy
        $scope.addnlDriverState.policy.MVRClueCalled = false;
        $scope.addnlDriverState.driver.save();
        $scope.addnlDriverState.policy.save();

        var driverId = GetNextUnprocessedDriver($scope);
        if (driverId) {
          SetUpAdditionalDriver($scope);
          $scope.addnlDriverState.driver = quoteIntentModel.getDriverById(driverId);
        }
        else if ($scope.addnlDriverState.addDriver) {
          SetUpAdditionalDriver($scope);
          $scope.addnlDriverState.addDriver = null;
          $scope.addnlDriverState.driver = modelHelper.createDriver();
        } else {
          journeyService.getNextStep(null, $scope.addnlDriverState.policyHolder.ID);
        }
      };

      $scope.removeDriver = function (driverId) {
        if (!driverId) {
          journeyService.getNextStep(null, $scope.addnlDriverState.policyHolder.ID);
          return;
        }
        var currentDriver = quoteIntentModel.getDriverById(driverId);
        currentDriver.removeDriver();
        $scope.addnlDriverState.alerts.push({
          type: 'success',
          msg: 'Successfully removed ' + $scope.addnlDriverState.driver.FirstName
        });
        var nextDriver = quoteIntentModel.getNextDriver();
        if (nextDriver) {
          $scope.addnlDriverState.driver = nextDriver;
        } else {
          journeyService.getNextStep(null, $scope.addnlDriverState.policyHolder.ID);
        }
      };
    }
  ];
}

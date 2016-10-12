/**
 * Created by gabello on 10/8/2014.
 */
'use strict';

function DriverHistoryCtrl_j3_v1() {

  return ['$scope', '$stateParams', '$log', 'QuoteIntentModel', 'ModelHelper', 'JourneyService', 'radioChoices', 'segmentIoTrackingService', 'IncidentService','LookupDataService', 'VehicleService',
    function ($scope, $stateParams, $log, quoteIntentModel, modelHelper, journeyService, radioChoices, segmentIoTrackingService, incidentService, lookupDataService, vehicleService) {

      journeyService.validatePolicyState();

      $scope.driverHistoryCtrlState = {
        driver: quoteIntentModel.getDriverById($stateParams.driverId),
        listIncidents: lookupDataService.getIncidents(),
        radio: radioChoices,
        driverIncidents: quoteIntentModel.getIncidents(),
        drivers: quoteIntentModel.getRatedDrivers(),
        incident:null,
        formSubmitted:false,
        incidentSubmitted: false,
        addIncident:{selected: null},
        hasIncidents: quoteIntentModel.hasIncidents(),
        convictionQuestion: {HasConviction: quoteIntentModel.hasConvictions()}
      };

      $scope.$watch("driverHistoryCtrlState.hasIncidents", function (newValue) {
        quoteIntentModel.setHasIncidents(newValue);
        if (newValue) {
          $scope.driverHistoryCtrlState.incident = modelHelper.createIncident();
        } else {
          $scope.driverHistoryForm.driverIncidents.$setValidity('minimumRequired', true);
        }
      });

      var addIncident = function () {
        if ($scope.driverHistoryCtrlState.drivers.length == 1) {
          $scope.driverHistoryCtrlState.incident.DriverID = $scope.driverHistoryCtrlState.drivers[0].ID;
        }
        var driver = _.findWhere($scope.driverHistoryCtrlState.drivers, {ID: $scope.driverHistoryCtrlState.incident.DriverID});
        if (driver) {
          $scope.driverHistoryCtrlState.incident.Classification = lookupDataService.getIncidentClassification($scope.driverHistoryCtrlState.incident.IncidentTypeID);
          $scope.driverHistoryCtrlState.incident.DriverID = driver.ID;
          $scope.driverHistoryCtrlState.incident.saveIncident();
          $scope.driverHistoryCtrlState.driverIncidents = quoteIntentModel.getIncidents();
        }
      };

      var updateDriver = function () {
        quoteIntentModel.setHasConvictions($scope.driverHistoryCtrlState.convictionQuestion.HasConviction);
        if ($scope.driverHistoryCtrlState.addIncident.selected == true) {
          $scope.driverHistoryCtrlState.addIncident.selected = null;
          $scope.driverHistoryCtrlState.incident = modelHelper.createIncident();
          $scope.driverHistoryCtrlState.incidentSubmitted = false;
        } else {
          if (incidentService.validateIncidents()) {
            segmentIoTrackingService.trackCustomEvent('convictionsQuestion', [
              {key: 'HasConviction', value: $scope.driverHistoryCtrlState.convictionQuestion.HasConviction}
            ]);
            var testConditions = {
              AssignmentsNeeded: vehicleService.showVehicleAssignments(),
              HasConviction: $scope.driverHistoryCtrlState.convictionQuestion.HasConviction
            };
            journeyService.getNextStep(testConditions, null);
          } else {
            journeyService.terminateJourney(4018);
          }
        }
      };

      $scope.getDisplayName = function(id){
        var driver = quoteIntentModel.getDriverById(id);
        return driver.getFullName();
      };
      $scope.getDisplayIncidentType = function(id){
        return  _.findWhere(lookupDataService.getIncidents(), {Value: id}).Desc;
      };
      //Remove the specific incident by ID
      $scope.removeIncident = function (incidentData) {
        if (incidentData) {
          quoteIntentModel.removeIncident(incidentData);
          $scope.driverHistoryCtrlState.driverIncidents = quoteIntentModel.getIncidents();
        }
      };

      //Save the incident
      $scope.savePolicyHolder = function (driverHistoryForm) {
        $scope.driverHistoryCtrlState.formSubmitted = true;
        if (_.isBoolean($scope.driverHistoryCtrlState.hasIncidents)) {
          $scope.driverHistoryForm.driverIncidents.$setValidity('required', true);
          if ($scope.driverHistoryCtrlState.hasIncidents == false) {
            updateDriver();
          }
          else {
            $scope.driverHistoryCtrlState.incidentSubmitted = true;

            //IncidentClassification Required
            if (!$scope.driverHistoryCtrlState.incident.IncidentTypeID || $scope.driverHistoryCtrlState.incident.IncidentTypeID === '') {
              if ($scope.driverHistoryCtrlState.driverIncidents.length < 1 && $scope.driverHistoryCtrlState.incident.IncidentTypeID) {

              }
              $scope.driverHistoryForm.incidentType.$setValidity('required', false);
            } else {
              $scope.driverHistoryForm.incidentType.$setValidity('required', true);
            }

            if ($scope.driverHistoryCtrlState.driverIncidents.length > 0 && (!$scope.driverHistoryCtrlState.incident.Date || $scope.driverHistoryCtrlState.incident.Date === "")) {
              $scope.driverHistoryForm.incidentType.$setValidity('required', true);
            }
            //Driver Required
            if ($scope.driverHistoryCtrlState.drivers.length > 1) {
              if (!$scope.driverHistoryCtrlState.incident.DriverID) {
                $scope.driverHistoryForm.driver.$setValidity('required', false);
              } else {
                $scope.driverHistoryForm.driver.$setValidity('required', true);
              }
              if ($scope.driverHistoryCtrlState.driverIncidents.length > 0 && (!$scope.driverHistoryCtrlState.incident.IncidentTypeID || $scope.driverHistoryCtrlState.incident.IncidentTypeID === "")
                && (!$scope.driverHistoryCtrlState.incident.Date || $scope.driverHistoryCtrlState.incident.Date === "")) {
                $scope.driverHistoryForm.driver.$setValidity('required', true);
              }
            }
            //Date Required
            if (!$scope.driverHistoryCtrlState.incident.Date) {
              $scope.driverHistoryForm.incidentDate.$setValidity('required', false);
            } else {
              $scope.driverHistoryForm.incidentDate.$setValidity('required', true);
            }

            //Validate Date
            if ($scope.driverHistoryCtrlState.driverIncidents.length > 0 && (!$scope.driverHistoryCtrlState.incident.IncidentTypeID || $scope.driverHistoryCtrlState.incident.IncidentTypeID === "")) {
              $scope.driverHistoryForm.incidentDate.$setValidity('required', true);
            }
            else if ($scope.driverHistoryCtrlState.incident.Date) {
              var m = moment($scope.driverHistoryCtrlState.incident.Date.substring(0, 10), ['MMDDYYYY', 'MM-DD-YYYY'], true);
              var time = m.isValid();
              if (!time) {
                $scope.driverHistoryForm.incidentDate.$setValidity('datetime', false);
                return;
              } else {
                $scope.driverHistoryForm.incidentDate.$setValidity('datetime', true);
              }

              //FutureDate
              var cleanDate = $scope.driverHistoryCtrlState.incident.Date.trimRight('_');
              var currentDate = new Date();
              var incDate = new Date(cleanDate.replace(/-/g, "/"));
              var seconds = moment(currentDate).diff(incDate, 'seconds');
              if (!(seconds >= 0)) {
                $scope.driverHistoryForm.incidentDate.$setValidity('futureDate', false);
                return;
              } else {
                $scope.driverHistoryForm.incidentDate.$setValidity('futureDate', true);
              }

              //PastDate
              if (seconds <= 157871030) {
                $scope.driverHistoryForm.incidentDate.$setValidity('pastDate', true);
              } else {
                $scope.driverHistoryForm.incidentDate.$setValidity('pastDate', false);
              }
            }
            else {
              $log.log(driverHistoryForm);
              return;
            }

            if (!$scope.driverHistoryForm.$valid) {
              $log.log(driverHistoryForm);
              return;
            }

            if ($scope.driverHistoryCtrlState.incident.Date || $scope.driverHistoryCtrlState.incident.IncidentTypeID) {
              addIncident();
            }
            updateDriver();
          }
        } else {
          $scope.driverHistoryForm.driverIncidents.$setValidity('required', false);
        }
      };

    }
  ];
}

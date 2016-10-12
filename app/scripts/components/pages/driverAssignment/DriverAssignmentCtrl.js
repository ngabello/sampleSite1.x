/**
 * Created by gabello on 10/27/2014.
 */
'use strict';

function DriverAssignmentCtrl() {

  return ['$scope', 'QuoteIntentModel', 'JourneyService', 'DriverService',
    function ($scope, quoteIntentModel, journeyService, driverService) {

      journeyService.validatePolicyState($scope);

      $scope.driverAssignmentCtrlState = {
        vehicles: quoteIntentModel.getVehicles(),
        loadingMessage: 'loadingAssignments',
        getDriverFailedCalls: false,
        formSubmitted: false,
        assignDriverVehiclesList:null
      };

      $scope.driverAssignmentCtrlState.assignDriverVehiclesList = driverService.getDriverAssignments();

      if ($scope.driverAssignmentCtrlState.assignDriverVehiclesList.length < 1) {
        journeyService.getNextStep(null, null);
      }

      $scope.saveDriverAssignment = function (isValid) {
        $scope.driverAssignmentCtrlState.formSubmitted = true;
        if (isValid) {
          driverService.saveAllAssignments($scope.driverAssignmentCtrlState.assignDriverVehiclesList, quoteIntentModel);
          journeyService.getNextStep(null, null);
        }
      };
    }
  ];
}

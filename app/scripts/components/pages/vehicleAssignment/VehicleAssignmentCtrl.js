/**
 * Created by jholloman on 6/14/2016.
 */

'use strict';

function VehicleAssignmentCtrl() {

  return ['$scope', 'QuoteIntentModel', 'JourneyService', 'VehicleService',
    function ($scope, quoteIntentModel, journeyService, vehicleService) {

      journeyService.validatePolicyState($scope);

      $scope.vehicleAssignmentCtrlState = {
        vehicles: quoteIntentModel.getVehicles(),
        drivers: quoteIntentModel.getRatedDrivers(),
        loadingMessage: 'loadingAssignments',
        getDriverFailedCalls: false,
        formSubmitted: false
      };

      $scope.saveVehicleAssignment = function (isValid) {
        $scope.vehicleAssignmentCtrlState.formSubmitted = true;
        if (isValid) {
          vehicleService.saveVehicles($scope.vehicleAssignmentCtrlState.vehicles);
          journeyService.getNextStep(null, null);
        }
      };
    }
  ];
}

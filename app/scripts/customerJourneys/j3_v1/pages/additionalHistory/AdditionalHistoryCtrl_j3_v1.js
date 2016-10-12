/**
 * Created by jholloman on 2/16/2015.
 */
function AdditionalHistoryCtrl_j3_v1() {
  'use strict';
  return ['$scope', 'QuoteIntentModel', 'JourneyService', 'segmentIoTrackingService', 'VehicleService',
    function ($scope, quoteIntentModel, journeyService, segmentIoTrackingService, vehicleService) {

      journeyService.validatePolicyState($scope);

      $scope.additionalHistorySummary = {
        drivers: []
      };

      var drivers = quoteIntentModel.getDrivers();
      if (drivers) {
        _.forEach(drivers, function (item) {
          $scope.additionalHistorySummary.drivers.push({
            misdemeanors: '',
            felonies: '',
            id: item.ID,
            name: item.getFullName()
          });
        })
      }
      $scope.go = function () {
        var p = [];
        _.forEach($scope.additionalHistorySummary.drivers, function (item, index) {
          p.push({
            driver: [{key: 'misdemeanors', value: item.misdemeanors}, {
              key: 'felonies',
              value: item.felonies
            }, {key: 'id', value: item.id}, {key: 'name', value: item.name}]
          })
        });
        segmentIoTrackingService.trackCustomEvent('convictions', p);
        journeyService.getNextStep({AssignmentsNeeded: vehicleService.showVehicleAssignments()}, null);
      }
    }]
}

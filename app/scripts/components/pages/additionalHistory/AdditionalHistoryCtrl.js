/**
 * Created by jholloman on 2/16/2015.
 */
function AdditionalHistoryCtrl() {
  'use strict';
  return ['$scope', 'QuoteIntentModel', 'JourneyService','segmentIoTrackingService',
    function ($scope, quoteIntentModel, journeyService, segmentIoTrackingService) {

      journeyService.validatePolicyState($scope);

    $scope.additionalHistorySummary = {
      drivers: []
    };

      var drivers = quoteIntentModel.getDrivers();

    (function setDrivers() {
      if (drivers) {
        _.forEach(drivers, function (item) {
          $scope.additionalHistorySummary.drivers.push({misdemeanors: '', felonies: '', id: item.ID, name: item.getFullName()});
        })
      }
    })();

    $scope.go = function () {
      var p = [];
      _.forEach($scope.additionalHistorySummary.drivers, function(item, index){
        p.push({driver: [{key:'misdemeanors', value: item.misdemeanors}, {key:'felonies', value: item.felonies}, {key:'id', value: item.id}, {key:'name', value: item.name}]})
      });
      segmentIoTrackingService.trackCustomEvent('convictions', p);
      journeyService.getNextStep(null, null);
    }
  }]
}

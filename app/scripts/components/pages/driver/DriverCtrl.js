/**
 * Created by gabello on 10/8/2014.
 */
'use strict';

function DriverCtrl() {

  return ['$scope', '$stateParams','JourneyService', '$window', 'QuoteIntentModel',
    function ($scope, $stateParams, journeyService, $window, quoteIntentModel) {

      journeyService.validatePolicyState();

      var driverState = this;
      driverState.occupationTrigger = $window.occupationTrigger;
      driverState.driver = quoteIntentModel.getDriverById($stateParams.driverId);
      driverState.hasSpouse = quoteIntentModel.getSpouse() ? true : false;

      $scope.submitForm = function (form) {
        var saveResults = driverState.driver.save();
        journeyService.getNextStep(null, saveResults);
      };
    }
  ];
}

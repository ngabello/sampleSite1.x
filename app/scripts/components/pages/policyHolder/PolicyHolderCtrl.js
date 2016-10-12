'use strict';

function PolicyHolderCtrl() {

  return ['$scope', 'JourneyService', 'segmentIoTrackingService', 'QuoteIntentModel', 'ModelHelper',
    function ($scope, journeyService, segmentIoTrackingService, quoteIntentModel, modelHelper) {

      journeyService.validatePolicyState();

      var phs = this;
      phs.driver = null;
      phs.policy = quoteIntentModel.getPolicy();
      phs.address = quoteIntentModel.getAddress();
      phs.alerts = [];

      var driver = quoteIntentModel.getPolicyHolder();
      if (!driver) {
        driver = modelHelper.createDriver();
      }
      phs.driver = driver;

      segmentIoTrackingService.trackGeneralEvent('policy-holder page start');

      $scope.closeAlert = function (index) {
        phs.alerts.splice(index, 1);
      };

      $scope.submitForm = function (form) {
        var saveResults = phs.driver.save();
        journeyService.getNextStep(null, saveResults);
      };
    }
  ];
}


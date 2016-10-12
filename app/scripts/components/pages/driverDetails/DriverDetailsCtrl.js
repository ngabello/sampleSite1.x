/**
 * Created by gabello on 10/8/2014.
 */
'use strict';

function DriverDetailsCtrl() {
  return ['$scope', '$log', '$stateParams', 'JourneyService', 'QuoteIntentModel', 'ModelHelper','LookupDataService',
    function ($scope, $log, $stateParams, journeyService, quoteIntentModel, modelHelper, lookupDataService) {

      journeyService.validatePolicyState();
      var enums = getEnums();

      $scope.driverDetailsState = {
        alerts: [],
        policy: quoteIntentModel.getPolicy() ? quoteIntentModel.getPolicy() : modelHelper.createPolicy(),
        driver: $stateParams.driverId ? quoteIntentModel.getDriverById($stateParams.driverId) : quoteIntentModel.getPolicyHolder(),
        quoteState: quoteIntentModel.getQuoteState(),
        insuranceLapseStatus: []
      };

      $scope.$watchGroup(['driverDetailsState.driver.CurrentlyInsured', 'driverDetailsState.driver.CurrentInsuranceStatus' ], function (values) {
        if (!values[0] && values[1] == enums.EnumNoCurrentInsuranceReasons.MyPolicyExpired30daysAgoOrLess) {
          var filterArr = ['no_lapse'];
          $scope.driverDetailsState.insuranceLapseStatus = lookupDataService.getInsuranceLapseCodeLookups(filterArr);
        } else {
          $scope.driverDetailsState.insuranceLapseStatus = lookupDataService.getInsuranceLapseCodeLookups();
        }
      });

      $scope.submitForm = function (form) {
        $scope.driverDetailsState.policy.save();
        var saveResults = $scope.driverDetailsState.driver.save();
        journeyService.getNextStep($scope.driverDetailsState.quoteState, saveResults);
      };
    }
  ];
}

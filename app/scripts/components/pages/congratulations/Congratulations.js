/**
 * Created by gabello on 10/14/2014.
 */
function CongratulationsCtrl() {
  'use strict';
  return ['$scope', 'QuoteIntentModel', 'JourneyService', 'ancillaryDisplayService',
    function ($scope, quoteIntentModel, journeyService, ancillaryDisplayService) {

      journeyService.validatePaymentState();

      $scope.callgroup = "payment";
      $scope.congratulationsSummary = {
        paymentPlan: quoteIntentModel.getPayment(),
        drivers: quoteIntentModel.getDrivers(),
        policyHolder: quoteIntentModel.getPolicyHolder(),
        vehicles: quoteIntentModel.getVehicles(),
        policy: quoteIntentModel.getPolicy(),
        state: quoteIntentModel.getAddress().State,
        policyStartDate: {},
        policyEndDate: {},
        legalPlan: quoteIntentModel.getLegalPlan(),
        legalPlanResponse: quoteIntentModel.getAncillaryPlansResponse(),
        ancillaryDisplay: ancillaryDisplayService.getAncillaryDisplay()
      };
      var legalPlan = $scope.congratulationsSummary.legalPlan;
      if (legalPlan) {
        legalPlan.IndividualCost = legalPlan.PlanCost / legalPlan.Drivers.length;
      }

      var d = moment($scope.congratulationsSummary.policy.EffectiveDate);
      $scope.congratulationsSummary.policyStartDate = d.format('MM-DD-YYYY');
      d.add(1, 'years');
      $scope.congratulationsSummary.policyEndDate = d.format('MM-DD-YYYY');

      $scope.signUp = function () {
        journeyService.getNextStep(null, null);
      };
      $scope.ancillaryNav = function () {
        journeyService.redirectJourney($scope.congratulationsSummary.ancillaryDisplay.link);
      };

      $scope.viewLogic = function (number) {
        //view logic not working with grunt cdnify package for some
        // reason so its going here
        if (number === 1) {
          if ($scope.congratulationsSummary.ancillaryDisplay.name == 'Renters' || $scope.congratulationsSummary.ancillaryDisplay.name == 'RentBundle') {
            return 'Renters';
          } else {
            return 'Home';
          }
        }
        if (number === 2) {
          if ($scope.congratulationsSummary.ancillaryDisplay.name == 'Bundle' || $scope.congratulationsSummary.ancillaryDisplay.name == 'RentBundle')return true;
        }
      };


    }
  ];
}

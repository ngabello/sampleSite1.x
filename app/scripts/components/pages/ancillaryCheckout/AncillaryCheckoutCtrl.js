/**
 * Created by jholloman on 2/6/2015.
 */
function AncillaryCheckoutCtrl() {
  'use strict';
  return ['$scope', 'QuoteIntentModel', 'Restangular', 'JourneyService', '$log', 'AncillaryModel', 'errorService',
    function ($scope, quoteIntentModel, Restangular, journeyService, $log, ancillaryModel, errorService) {

      journeyService.validatePolicyState();

      var navigateNextStep = function () {
        journeyService.getNextStep(null, null);
      };

      $scope.ancillaryCheckoutSummary = {
        quoteIntent: quoteIntentModel.getQuoteIntent(),
        legalPlan: quoteIntentModel.getLegalPlan(),
        inquiry: {
          FirstName: null,
          LastName: null,
          CreditCard: {
            ExpirationDate: null,
            ExpirationYear: '',
            ExpirationMonth: '',
            Number: '',
            CardIssuer: '',
            NameOnCard: null
          },//CreditCard
          AncillaryPlanId: null
        }

      };

      (function() {
        var d = moment.utc($scope.ancillaryCheckoutSummary.legalPlan.EffectiveDate);
        $scope.ancillaryCheckoutSummary.legalPlan.EffectiveDate = d.format('MM-DD-YYYY');
        d.add(1, 'years');
        $scope.ancillaryCheckoutSummary.legalPlan.EndDate = d.format('MM-DD-YYYY');
      })();

      $scope.makePayment = function (isValid) {
        $scope.formSubmitted = true;
        var nameParts = $scope.ancillaryCheckoutSummary.inquiry.CreditCard.NameOnCard.trim().split(' ');
        if (nameParts.length < 2) {
          return $scope.ancillaryForm.billingCardholder.$setValidity('lastName', false);
        } else {
          $scope.ancillaryForm.billingCardholder.$setValidity('lastName', true);

          if (isValid) {
            $scope.ancillaryCheckoutSummary.inquiry.FirstName = nameParts[0];
            $scope.ancillaryCheckoutSummary.inquiry.LastName = nameParts[1];
            $scope.ancillaryCheckoutSummary.inquiry.AncillaryPlanId = $scope.ancillaryCheckoutSummary.legalPlan.PlanId;
            new ancillaryModel().make_payment($scope.ancillaryCheckoutSummary.quoteIntent.Id, $scope.ancillaryCheckoutSummary.inquiry).then(function (response) {
              quoteIntentModel.saveAncillaryPurchaseResponse(JSON.parse(JSON.stringify(response.data)));
              navigateNextStep();
            }, function (error) {
              errorService.showSystemError('AncillaryCheckoutCtrl: post to purchase legal plan failed with error', error);
            })
          }
        }
      };

      $scope.cancelPayment = function(){
        $scope.ancillaryCheckoutSummary.legalPlan.Denied = true;
        navigateNextStep();
      }

    }]
}

/**
 * Created by gabello on 10/9/2014.
 */
function DiscountsCtrl() {
  'use strict';
  return ['$scope', '$q', '$log', 'QuoteIntentModel', 'CoverageModel', 'goApiDataService', 'spinnerService', 'JourneyService',
    'ModalService', 'errorService', 'segmentIoTrackingService', 'generalTrackingService',
    function ($scope, $q, $log, quoteIntentModel, coverageModel, goApiDataService, spinnerService, journeyService, modalService,
              errorService, segmentIoTrackingService, trackingService) {

      journeyService.validatePolicyState();


      var policyHolder = quoteIntentModel.getPolicyHolder();
      $scope.policyHolder = policyHolder;
      if (!$scope.policyHolder.EmailAddress) {
        $scope.newEmail = true;
      }
      $scope.discountsSummary = {
        discounts: quoteIntentModel.getQuote().getDiscounts()
      };

      $scope.discountFilter = function (item) {
        return item.Name !== 'Channel/Affinity Discount';
      };

      $scope.editEmail = function(){
        $scope.newEmail = true;
      };

      $scope.savePolicyHolder = function (form) {
        $scope.formSubmitted = true;
        if (!form.$valid) {
          $log.log(form);
          return;
        }
        spinnerService.show('loadingSpinner');
        // Update the PolicyHolder email and ssn
        $scope.policyHolder.save();
        goApiDataService.getQuote().then(function () {
          var quote = quoteIntentModel.getQuote();
          trackingService.setChannel('QuoteComplete');
          // Marin tag event
          segmentIoTrackingService.trackCustomEvent('quoteComplete', [{key: 'totalPremium', value: quote.TotalPremium}], {
            'quoteId': quote.QuoteNumber,
            'totalPremium': quote.TotalPremium
          });
          journeyService.getNextStep(null, null);
        }, function (error) {
          errorService.showSystemError('DiscountCtrl: Failed to retrieve quote with error!', error);
        });
      }

    }
  ];
}

/**
 * Created by gabello on 10/14/2014.
 */
function BillingCtrl() {
  'use strict';
  return ['$scope', '$log', 'QuoteIntentModel', 'JourneyService', 'radioChoices', 'spinnerService', 'errorService', 'EventService',
    'goApiDataService', 'pachydermContactInfo', '$sce', 'AncillaryModel', 'ModelHelper', 'LookupDataService', 'segmentIoTrackingService', 'generalTrackingService',
    function ($scope, $log, quoteIntentModel, journeyService, radioChoices, spinnerService, errorService, eventService, goApiDataService,
              pachydermContactInfo, $sce, ancillaryModel, modelHelper, lookupDataService, segmentIoTrackingService, trackingService) {

      //journeyService.validatePolicyState();

      //---------------- Initialization ----------------------------------------------------------------
      $scope.billingSummary = {
        bindRequest: quoteIntentModel.getPayment(),
        paymentAlerts: [],
        phoneChanged: false,
        formSubmitted: null,
        bindCall: 'billingSummary',
        yesNoOptions: radioChoices.yesNo,
        policyHolder: quoteIntentModel.getPolicyHolder(),
        quote: quoteIntentModel.getQuote(),
        states: lookupDataService.getUSStates(),
        initials: null,
        accepted: null,
        sameAddress: null
      };

      $scope.billingSummary.bindRequest.PhoneNumber = $scope.billingSummary.policyHolder.PhoneNumber;
      $scope.billingSummary.bindRequest.BillingAddress = quoteIntentModel.getAddress();
      //---------------- End Initialization ------------------------------------------------------------

      $scope.closePaymentAlert = function (index) {
        $scope.billingSummary.paymentAlerts.splice(index, 1);
      };

      $scope.editBillingAddress = function () {
        $scope.billingSummary.sameAddress = "No";
      };

      //watch the phone number only save if it changes
      $scope.$watch("billingSummary.bindRequest.PhoneNumber", function (newValue) {
        if (newValue == null) {
          return;
        }
        if (newValue != $scope.billingSummary.policyHolder.PhoneNumber) {
          $scope.billingSummary.phoneChanged = true;
          $scope.billingSummary.policyHolder.PhoneNumber = newValue;
        }
      });

      //Validation logic for Initials
      $scope.checkInitials = function (initials) {
        if (!initials) {
          return;
        }

        var firstInitial = $scope.billingSummary.policyHolder.FirstName[0];
        var lastInitial = $scope.billingSummary.policyHolder.LastName[0];

        return initials.length == 2 && initials[0].toUpperCase() === firstInitial.toUpperCase()
          && initials[1].toUpperCase() === lastInitial.toUpperCase()
      };
      //endregion Validation Methods

      $scope.bindPolicy = function (form) {
        $scope.closePaymentAlert(0);
        $scope.billingSummary.formSubmitted = true;

        //Fires all events in the queue
        eventService.updateMap();

        if (form.$valid) {
          //The Luhn checker validated the credit card but we need to determine the name on the card
          if (!$scope.billingSummary.bindRequest.CreditCard.CardIssuer) {
            $scope.billingForm.billingCCNumber.$setValidity('notRecognized', false);
            return;
          } else {
            $scope.billingForm.billingCCNumber.$setValidity('notRecognized', true);
          }

          //Make a copy so we do not mess up validation
          var bind = $scope.billingSummary.bindRequest;

          //performance issue if we do not have to save phone don't it will cause
          //an update action on the policy center account
          if ($scope.billingSummary.phoneChanged) {
            //Policy Center requires phone number to have dashes, how stupid is that
            //even though the phone number doesn't contain '-' better check than blow up
            var phoneNumber = bind.PhoneNumber.replace(/-/g, '');
            bind.PhoneNumber = String.format('{0}-{1}-{2}', phoneNumber.substring(0, 3),
              phoneNumber.substring(3, 6), phoneNumber.substring(6, 10));
          }

          spinnerService.show('bindSpinner');
          bind.save();
          trackingService.trackAttempts('BindAttempts');
          goApiDataService.bindPolicy().then(function () {
            var quote = quoteIntentModel.getQuote();

            segmentIoTrackingService.trackCustomEvent('bindComplete', [{
              key: 'quoteIntentId',
              value: quoteIntentModel.getQuoteIntentId()
            }], {
              'quoteID': quote.QuoteNumber,
              'totalPremium': quote.TotalPremium
            });
            journeyService.getNextStep(null, null);
          }, function (errorMessage) {
            if (errorMessage) {
              $log.error('BillingCtrl: BindPolicy - failed attempting to bind with error message {0}', errorMessage);
              segmentIoTrackingService.trackCustomEvent('BindFailed', [
                {key: 'reason', value: errorMessage.data.errors.detail},
                {key: 'attempts', value: quoteIntentModel.getQuoteState().BindAttempts}]);
              if (errorMessage.status === 400) {
                var msg = lookupDataService.getPCErrorMessage(errorMessage.data.errors.detail);
                $scope.billingSummary.paymentAlerts.push({
                  type: 'danger',
                  msg: $sce.trustAsHtml(String.format(msg, pachydermContactInfo.quoteIssuePhone))
                });
              } else {
                errorService.showSystemError('Billing: payment failed with error', errorMessage);
              }
            }
            $scope.$broadcast('scrollToTop');
          })
        }
      };
    }
  ];
}

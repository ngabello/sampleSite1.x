/**
 * Created by gabello on 2/10/2015.
 */

function CompareNowLandingCtrl() {
  'use strict';

  return ['$q', '$scope', '$log', '$location', 'quoteRetrieveService', '$sce', 'pachydermContactInfo', 'spinnerService', '$controller', 'AddressService',
    'JourneyService', '$stateParams', 'errorService', 'QuoteIntentModel', 'segmentIoTrackingService', 'goApiDataService', 'generalTrackingService',
    function ($q, $scope, $log, $location, quoteRetrieveService, $sce, pachydermContactInfo, spinnerService, $controller, addressService,
              journeyService, $stateParams, errorService, quoteIntentModel, segmentIoTrackingService, goApiDataService, trackingService) {

      $scope.compareNowSummary = {
        formSubmitted: false,
        policyStartDateRequired: false,
        quoteRetrieved: false,
        dateOptions: {
          minDate: +1,
          maxDate: "+2M"
        },
        quoteNotFoundMsgs: [],
        activity: $stateParams.activity,
        quoteFound: true  //for comparenow we assume this to be true
      };

      var baseController = $controller('BaseLandingController', {$scope: $scope});
      baseController.doCommonStuff(true, 'CompareNow');

      $scope.search = {
        AccountNumber: String.getString($stateParams.account),
        JobNumber: String.getString($stateParams.job)
      };

      $scope.closeAlert = function (index) {
        $scope.compareNowSummary.quoteNotFoundMsgs.splice(index, 1);
      };

      var navigateTo = function (policyStatus) {
        journeyService.loadFlowState().then(function () {
          var policy = quoteIntentModel.getPolicy();
          var policyHolder = quoteIntentModel.getPolicyHolder();
          segmentIoTrackingService.trackGeneralEvent('QuoteRetrieve', {Source: 'Comparenow', PolicyStatus: policyStatus === 'Quoted' ? 'Quoted' : 'Draft'});
          journeyService.getNextStep(policy, policyStatus === 'Quoted' ? null : policyHolder.ID, function () {
            trackingService.init('compare-landing');
            trackingService.setChannel('QuoteRetrieve');
          });
        })
      };

      //region Navigation
      var nextStep = function () {
        //starts the watch timer
        var policy = quoteIntentModel.getPolicy();
        if ($scope.search.policyStartDate) {
          policy.EffectiveDate = $scope.search.policyStartDate;
          policy.save();
        }

        if (policy.PolicyStatus && policy.PolicyStatus === 'Quoted') {
          goApiDataService.getQuote().then(function () {
            navigateTo('Quoted');
          }, function (error) {
            errorService.showSystemError('QuoteRetrievalCtrl: Failed to quote with error', error);
          });
        } else {
          navigateTo(null);
        }
      };
      //endregion

      $q.when(quoteRetrieveService.getSubmission('comparenow-quote', $scope.search)).then(function (response) {
        var address = quoteIntentModel.getAddress();
        if (address && address.PostalCode) {
          addressService.getAddress(address.PostalCode, address.AddressLine1).then(function (address) {
            //I added this in case a postalcode is changed and we do not rate after someone has already quoted
            //and tries to retrieve it after the postal change
            if (!address.HasRatedLocations) {
              journeyService.terminateJourney(0);
              return;
            }
            $scope.compareNowSummary.quoteRetrieved = true;
            if (response.PolicyStatus && response.PolicyStatus == 'Bound') {
              var errorMsg = $sce.trustAsHtml(String.format('<hr> ' +
                '<span>Our records indicate that you have an active account with Elephant Insurance, please call {0} and an agent will be happy to assist you. </span>', pachydermContactInfo.quoteIssuePhone));
              $scope.compareNowSummary.quoteNotFoundMsgs.push({type: 'success', msg: errorMsg});
              return;
            }
            if (response.PolicyDateValid) {
              nextStep();
            } else {
              $scope.compareNowSummary.policyStartDateRequired = true;
              spinnerService.hideAll();
            }
          });
        }else{
          //Could find no valid address
          journeyService.terminateJourney(0);
          return;
        }
      }, function (error) {
        if (error.status != 404) {
          errorService.showSystemError('QuoteRetrievalCtrl: retrieving quote resulted with error', error);
        } else {
          $scope.compareNowSummary.quoteFound = false;
          var errorMsg = $sce.trustAsHtml(String.format('We could not find your quote at this time. <hr> ' +
            '<span>Please verify your information and try again. </span>' +
            'Need help?</br>' +
            '<span>We are happy to answer your questions, so please give us a call at <b>{0}</b></span><hr>', pachydermContactInfo.quoteIssuePhone));
          $scope.compareNowSummary.quoteNotFoundMsgs.push({type: 'danger', msg: errorMsg});
        }
      });


      $scope.retrieveQuote = function (isValid) {
        $scope.compareNowSummary.quoteNotFoundMsgs = [];
        $scope.compareNowSummary.formSubmitted = true;
        if (isValid) {
          //Has the quote been retrieved if not go get it
          if (!$scope.compareNowSummary.quoteRetrieved) {

            $q.when(quoteRetrieveService.getSubmission('comparenow-quote', $scope.search)).then(function (response) {
              $scope.compareNowSummary.quoteRetrieved = true;
              if (response.PolicyStatus && response.PolicyStatus == 'Bound') {
                var errorMsg = $sce.trustAsHtml(String.format('<hr> ' +
                  '<span>Our records indicate that you have an active account with Elephant Insurance, please call {0} and an agent will be happy to assist you. </span>', pachydermContactInfo.quoteIssuePhone));
                $scope.compareNowSummary.quoteNotFoundMsgs.push({type: 'success', msg: errorMsg});
                return;
              }
              if (response.PolicyDateValid) {
                nextStep();
              } else {
                $scope.compareNowSummary.policyStartDateRequired = true;
              }
            }, function (error) {
              if (error.status != 404) {
                errorService.showSystemError('CompareNowLandingCtrl: retrieving quote resulted with error', error);
              } else {
                var errorMsg = $sce.trustAsHtml(String.format('We could not find your quote at this time. <hr> ' +
                  '<span>Please verify your information and try again. </span>' +
                  'Need help?</br>' +
                  '<span>We are happy to answer your questions, so please give us a call at <b>{0}</b></span><hr>', pachydermContactInfo.quoteIssuePhone));
                $scope.compareNowSummary.quoteNotFoundMsgs.push({type: 'danger', msg: errorMsg});
              }
            });
          } else {
            nextStep();
          }
        }// if $valid
      }

    }
  ];
}

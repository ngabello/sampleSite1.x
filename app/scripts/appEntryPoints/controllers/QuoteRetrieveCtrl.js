/**
 * Created by gabello on 10/28/2014.
 */
function QuoteRetrieveCtrl() {
  'use strict';
  return ['$scope', '$q', 'quoteRetrieveService', 'QuoteIntentModel', 'JourneyService', '$location', 'goApiDataService', '$controller', 'AddressService',
    'errorService', 'pachydermContactInfo', '$sce', 'segmentIoTrackingService', '$window', 'generalTrackingService', 'spinnerService',
    function ($scope, $q, quoteRetrieveService, quoteIntentModel, journeyService, $location, goApiDataService, $controller, addressService,
              errorService, pachydermContactInfo, $sce, segmentIoTrackingService, $window, trackingService, spinnerService) {

      var baseController = $controller('BaseLandingController', {$scope: $scope});
      baseController.doCommonStuff(false, 'QuoteRetrieve');

      $scope.quoteRetrieveSummary = {
        route: 'quote-retrieve',
        formSubmitted: false,
        policyStartDateRequired: false,
        quoteRetrieved: false,
        attempts: 0,
        dateOptions: {
          minDate: +1,
          maxDate: "+2M"
        },
        quoteNotFoundMsgs: []
      };

      $scope.search = {
        lastName: null,
        email: null,
        dob: null,
        policyStartDate: null
      };

      $scope.closeAlert = function (index) {
        $scope.quoteRetrieveSummary.quoteNotFoundMsgs.splice(index, 1);
      };

      var navigateTo = function (policyStatus) {
        var policy = quoteIntentModel.getPolicy();
        segmentIoTrackingService.trackCustomEvent('QuoteRetrieveAttempt', [{key: 'status', value: 'success'},
          {key: 'reason', value: ''}, {key: 'attempts', value: $scope.quoteRetrieveSummary.attempts}]);
        $window.quotesJourneyId = quoteIntentModel.getClientData().Journey;
        journeyService.loadFlowState().then(function () {
          var policyHolder = quoteIntentModel.getPolicyHolder();
          segmentIoTrackingService.identifyEvent('QuoteRetrieve', [{key: 'Source', value: 'Organic'}, {key: 'PolicyStatus', value: policyStatus === 'Quoted' ? 'Quoted' : 'Draft'}]);
          journeyService.getNextStep(policy, null, function () {
            trackingService.init($scope.quoteRetrieveSummary.route);
            trackingService.setChannel('QuoteRetrieve');
          });
        })
      };


      //region Navigation
      var nextStep = function () {
        var policy = quoteIntentModel.getPolicy();
        if ($scope.search.policyStartDate) {
          policy.EffectiveDate = $scope.search.policyStartDate;
          policy.save();
        }
        var address = quoteIntentModel.getAddress();
        if (address.State === 'VA') {
          if (policy.PolicyStatus !== 'Quoted') {
            navigateTo('PolicyHolder');
          } else {
            goApiDataService.getQuote().then(function () {
              navigateTo('Quoted');
            }, function (error) {
              errorService.showSystemError('QuoteRetrievalCtrl: Failed to quote with error', error);
            });
          }
        } else {
          navigateTo(policy.PolicyStatus);
        }

      };
      //endregion


      $scope.retrieveQuote = function (isValid) {

        $scope.quoteRetrieveSummary.quoteNotFoundMsgs = [];
        $scope.quoteRetrieveSummary.formSubmitted = true;
        if (isValid) {
          spinnerService.show('loadingSpinner');
          //Has the quote been retrieved if not go get it
          if (!$scope.quoteRetrieveSummary.quoteRetrieved) {
            $scope.quoteRetrieveSummary.attempts++;
            $q.when(quoteRetrieveService.getSubmission('deep-quote-intent/', $scope.search)).then(function (response) {
              var currentAddress = quoteIntentModel.getAddress();
              if (currentAddress && currentAddress.PostalCode) {
                addressService.getAddress(currentAddress.PostalCode, currentAddress.AddressLine1).then(function (address) {
                  //I added this in case a postalcode is changed and we do not rate after someone has already quoted
                  //and tries to retrieve it after the postal change
                  if(!address.HasRatedLocations){
                    journeyService.terminateJourney(0);
                    return;
                  }
                  //Since this is a quote retrieve and the county has already been selected update the address with the
                  //retrieved county
                  if(currentAddress.County){
                    address.County = currentAddress.County;
                    address.save();
                  }
                  var policy = quoteIntentModel.getPolicy();
                  //This is a show stopper
                  if (policy && policy.IsUWPhotoReviewExist) {
                    journeyService.terminateJourney(1246);
                    return;
                  }
                  $scope.quoteRetrieveSummary.quoteRetrieved = true;
                  if (response.PolicyStatus && response.PolicyStatus == 'Bound') {
                    segmentIoTrackingService.trackCustomEvent('QuoteRetrieveAttempt', [{
                      key: 'status',
                      value: 'failure'
                    },
                      {key: 'reason', value: 'active policy'}, {
                        key: 'attempts',
                        value: $scope.quoteRetrieveSummary.attempts
                      }]);
                    var errorMsg = $sce.trustAsHtml(String.format('<hr> ' +
                      '<span>Our records indicate that you have an active account with Elephant Insurance, please call {0} and an agent will be happy to assist you. </span>', pachydermContactInfo.quoteIssuePhone));
                    $scope.quoteRetrieveSummary.quoteNotFoundMsgs.push({type: 'success', msg: errorMsg});
                    return;
                  }
                  if (response.PolicyDateValid) {
                    nextStep();
                  } else {
                    segmentIoTrackingService.trackCustomEvent('QuoteRetrieveAttempt', [{
                      key: 'status',
                      value: 'failure'
                    },
                      {key: 'reason', value: 'invalid effective date'}, {
                        key: 'attempts',
                        value: $scope.quoteRetrieveSummary.attempts
                      }]);
                    spinnerService.hideAll();
                    $scope.quoteRetrieveSummary.policyStartDateRequired = true;
                  }
                }, function (error) {
                    segmentIoTrackingService.trackCustomEvent('QuoteRetrieveAttempt', [{key: 'status', value: 'failure'},
                      {key: 'reason', value: 'not found'}, {key: 'attempts', value: $scope.quoteRetrieveSummary.attempts}]);
                    errorService.showSystemError('QuoteRetrievalCtrl: retrieving quote resulted with error', error);
                });
              }else{
                //Could find no valid address
                journeyService.terminateJourney(0);
                return;
              }
            }, function (error) {
              if (error.status != 404) {
                segmentIoTrackingService.trackCustomEvent('QuoteRetrieveAttempt', [{key: 'status', value: 'failure'},
                  {key: 'reason', value: 'unknown'}, {key: 'attempts', value: $scope.quoteRetrieveSummary.attempts}]);
                errorService.showSystemError('QuoteRetrievalCtrl: retrieving quote resulted with error', error);
              } else {
                segmentIoTrackingService.trackCustomEvent('QuoteRetrieveAttempt', [{key: 'status', value: 'failure'},
                  {key: 'reason', value: 'not found'}, {key: 'attempts', value: $scope.quoteRetrieveSummary.attempts}]);
                var errorMsg = $sce.trustAsHtml(String.format('We could not find your quote at this time. <hr> ' +
                  '<span>Please verify your information and try again. </span>' +
                  'Need help?</br>' +
                  '<span>We are happy to answer your questions, so please give us a call at <b>{0}</b></span><hr>', pachydermContactInfo.quoteIssuePhone));
                $scope.quoteRetrieveSummary.quoteNotFoundMsgs.push({type: 'danger', msg: errorMsg});
              }
            });
          } else {
            nextStep();
          }
        }// if $valid
      }
    }];
}

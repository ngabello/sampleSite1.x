/**
 * Created by gabello on 5/27/2015.
 */

function LeadCloudLandingCtrl() {
  'use strict';

  function GoToNextPage(journeyService, quoteIntentModel, trackingService, segmentIoTrackingService, $stateParams) {
    journeyService.loadFlowState().then(function () {
      journeyService.getNextStep(null, null, function () {
        var clientData = quoteIntentModel.getClientData();
        trackingService.init('leadcloud-landing');
        trackingService.setChannel('QuoteStart', clientData.IntegrationPartner, 'SuperClick', clientData.Origin, null, null);
        segmentIoTrackingService.trackGeneralEvent('LeadCloud landing', {
          Source: String.getString($stateParams.utm_source),
          RqUID: String.getString($stateParams.rqId)
        });
      });
    });
  }

  return ['$q', '$scope', 'QuoteIntentModel', 'externalAPIDataService', '$controller', 'errorService', 'AddressService',
    'JourneyService', '$stateParams', '$window', 'segmentIoTrackingService', 'spinnerService', 'generalTrackingService',
    function ($q, $scope, quoteIntentModel, externalAPIDataService, $controller, errorService, addressService,
              journeyService, $stateParams, $window, segmentIoTrackingService, spinnerService, trackingService) {

      var rqId = String.getString($stateParams.rqId);
      var state = String.getString($stateParams.state);
      var stateMap = function (state) {
        var newVal = {};
        switch (state) {
          case 'TX':
            newVal = 'Texas';
            break;
          case 'IL':
            newVal = 'Illinois';
            break;
          case 'VA':
            newVal = 'Virginia';
            break;
          case 'MD':
            newVal = 'Maryland';
            break;
          case 'IN':
            newVal = 'Indiana';
            break;
          case 'TN':
            newVal = 'Tennessee';
            break;
          default:
            break;
        }
        return newVal;
      };

      $scope.leadCloudSummary = {
        state: stateMap(state),
        continueEnabled: false
      };

      var baseController = $controller('BaseLandingController', {$scope: $scope});
      baseController.doCommonStuff(true, 'LeadCloudLanding');

      externalAPIDataService.getLeadCloudData(rqId).then(function () {
        $scope.leadCloudSummary.continueEnabled = true;
        spinnerService.hide('loadingSpinner');
      }, function (error) {
        errorService.showSystemError('LeadCloudLandingCtrl: retrieving lead resulted with error', error);
      });


      $scope.startQuote = function () {
        spinnerService.show('loadingSpinner');
        var address = quoteIntentModel.getAddress();
        if (address && address.PostalCode) {
          addressService.getAddress(address.PostalCode, address.AddressLine1).then(function () {
              GoToNextPage(journeyService, quoteIntentModel, trackingService, segmentIoTrackingService, $stateParams);
            },
            function () {
              //Call to address service failed
              GoToNextPage(journeyService, quoteIntentModel, trackingService, segmentIoTrackingService, $stateParams);
            });
        } else {
          GoToNextPage(journeyService, quoteIntentModel, trackingService, segmentIoTrackingService, $stateParams);
        }
      };

    }
  ];
}

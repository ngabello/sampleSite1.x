/**
 * Created by gabello on 1/19/2015.
 */

function PostalLandingCtrl() {
  'use strict';

  return ['$q', '$scope', '$log', 'AddressService', 'QuoteIntentModel', '$controller',
    'JourneyService', '$stateParams', '$window', 'segmentIoTrackingService', 'generalTrackingService',
    function ($q, $scope, $log, addressService, quoteIntentModel, $controller,
              journeyService, $stateParams, $window, segmentIoTrackingService, trackingService) {

      $scope.postalLandingSummary = {
        route: 'postal-landing'
      };

      var baseController = $controller('BaseLandingController', {$scope: $scope});
      baseController.doCommonStuff(true, 'PostalLanding');

      var postalCode = String.getString($stateParams.postalCode);

      //check zip if not valid then go to postal page
      if (!postalCode || isNaN(postalCode)) {
        $log.warn(String.format('PostalLandingCtrl: postal-codes api for zipcode {0} is not valid', postalCode));
        journeyService.goToAppStart();
      }

      $q.when(addressService.getAddress(postalCode)).then(function (address) {
          //redirect if its a POBox zip code because some zips have rated POBox location
          //sez obie
          //if (address.PostalCodeType == 'PoBox') {
          //  journeyService.redirectJourney('http://www.pachyderm.com/lp/retry-zip-code?zip=' + $scope.zipCode);
          //  return;
          //}
          if (address.HasRatedLocations) {
            journeyService.loadFlowState().then(function () {
              segmentIoTrackingService.trackGeneralEvent('QuoteRetrieve', {
                Source: 'PostalLanding',
                PolicyStatus: 'Draft'
              });
              journeyService.getNextStep(null, null, function(){
                trackingService.init($scope.postalLandingSummary.route);
                trackingService.setChannel('QuoteStart');
              });
            });
          }else if (!address.HasRatedLocations) {
            //Valid Zipcode but out of our territory
            trackingService.trackEvent('non-rated-postal-code', [{key: 'non-rated-postal-code', value: postalCode}]);
            if ($window.everquote) {
              journeyService.redirectJourney(String.format('https://everquote.com/auto_policies?id=594&subid=b&zip_code={0}', postalCode));
            } else {
              journeyService.redirectJourney(String.format('http://www.pachyderm.com/lp/out-of-state-quotes?zip={0}', postalCode));
            }
          } else {
            //Invalid ZipCode
            $log.warn(String.format('PostalLandingCtrl: postal-codes api for zipcode {0} found no rated locations', postalCode));
            journeyService.goToAppStart();
          }
        },
        function (error) {
          journeyService.goToAppStart();
        })


    }
  ];
}

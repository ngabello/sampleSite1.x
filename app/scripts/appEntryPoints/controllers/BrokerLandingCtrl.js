/**
 * Created by gabello on 1/22/2015.
 */

function BrokerLandingCtrl() {
  'use strict';

  return ['$q', '$scope', '$log', 'AddressService', 'spinnerService', 'DriverModel', 'VehicleModel',
    'JourneyService', 'AddressModel', '$stateParams', '$window', 'generalTrackingService', '$controller',
    function ($q, $scope, $log, addressService, spinnerService, driverModel, vehicleModel,
              journeyService, addressModel, $stateParams, $window, trackingService, $controller) {

      $scope.brokerLandingCtrlState = {
        route: 'brokers-landing'
      };

      var baseController = $controller('BaseLandingController', {$scope: $scope});
      baseController.doCommonStuff(true, 'BrokerLanding');

      var postalCode = String.getString($stateParams.zip);

      //check zip if not valid then go to postal page
      if (!postalCode || isNaN(postalCode) || postalCode == '') {
        $log.warn(String.format('BrokerLandingCtrl: postal-codes api for zipcode {0} is not valid', postalCode));
        journeyService.goToAppStart();
        return;
      }

      //I use this so I can trim everything
      var brokerData = {
        Zip: postalCode,
        FirstName: String.getString($stateParams.fwapsfirstname),
        LastName: String.getString($stateParams.fwapslastname),
        AddressLine1 : String.getString($stateParams.fwapsaddress1)
      };

      addressService.getAddress(postalCode).then(function(address){
          if (address.HasRatedLocations) {
            if(brokerData.AddressLine1){
              address.AddressLine1 = brokerData.AddressLine1;
              address.save();
            }

            //Check for driver info
            if(brokerData.FirstName || brokerData.LastName){
              var driver = new driverModel();
              if(brokerData.FirstName){
                driver.FirstName = brokerData.FirstName;
              }
              if(brokerData.LastName){
                driver.LastName = brokerData.LastName;
              }
              driver.save();
            }

            journeyService.loadFlowState().then(function () {
              journeyService.getNextStep(null, null, function(){
                trackingService.init($scope.brokerLandingCtrlState.route);
                trackingService.setChannel('QuoteStart');
              });
            });

          } else if (!address.HasRatedLocations) {
            //Valid Zipcode but out of our territory
            trackingService.trackEvent('non-rated-postal-code', [{key: 'non-rated-postal-code', value: postalCode}]);
            spinnerService.hide('loadingSpinner');
            if ($window.everquote) {
              journeyService.redirectJourney(String.format('https://everquote.com/auto_policies?id=594&subid=a&zip_code={0}', postalCode));
            } else {
              journeyService.redirectJourney(String.format('http://www.pachyderm.com/lp/out-of-state-quotes?zip={0}', postalCode));
            }
          } else {
            journeyService.goToAppStart();
          }
        },
        function (error) {
          journeyService.goToAppStart();
        });


    }
  ];
}

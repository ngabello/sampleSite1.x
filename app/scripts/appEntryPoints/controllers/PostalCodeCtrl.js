'use strict';

function PostalCodeCtrl() {

  function StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, jsonFile, overrideLastName) {

    function ProcessJson(jsonData, overrideLastName) {
      if (overrideLastName) {
        var lastName = String.randomString(9);
        _.each(jsonData.data.data.attributes['quote-intent'].Drivers, function (driverItem) {
          driverItem.LastName = lastName;
        });
      }
      //Set the policy start date to tomorrow
      jsonData.data.data.attributes['quote-intent'].Policy.EffectiveDate = moment(new Date()).add(1, 'days').format('L');
      quoteIntentMapper.updateQuoteIntent(jsonData.data);
      journeyService.loadFlowState().then(function () {
        journeyService.getNextStep();
      });
    }

    //check template cache before getting json file
    var cache = $templateCache.get('../' + jsonFile);
    if (cache) {
      return ProcessJson({data: JSON.parse(cache)}, overrideLastName);
    } else {
      $http.get(jsonFile).then(function (jsonData) {
        return ProcessJson(jsonData, overrideLastName);
      });
    }
  }

  return ['$scope', '$log', '$http', 'AddressService', 'QuoteIntentModel', 'spinnerService', '$controller', 'postalCodeTypeConst',
    'ModalService', '$window', 'coveredStates', 'JourneyService', 'QuoteIntentMapper', '$templateCache', 'generalTrackingService',
    function ($scope, $log, $http, addressService, quoteIntentModel, spinnerService, $controller, postalCodeTypeConst,
              ModalService, $window, coveredStates, journeyService, quoteIntentMapper, $templateCache, trackingService) {

      $scope.postalCodeSummary = {
        route: 'postal-code'
      };

      var baseController = $controller('BaseLandingController', {$scope: $scope});
      baseController.doCommonStuff(true, 'Organic');

      $scope.classicJourney1Driver1VehicleIL = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/OneVehicleOneDriverIL.json', true);
      };

      $scope.classicJourney1Driver1VehicleIN = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/OneVehicleOneDriverIN.json', true);
      };

      $scope.classicJourney1Driver1VehicleMD = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/OneVehicleOneDriverMD.json', true);
      };

      $scope.classicJourney1Driver1VehicleTN = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/OneVehicleOneDriverTN.json', true);
      };

      $scope.classicJourney1Driver1VehicleTX = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/OneVehicleOneDriverTX.json', true);
      };

      $scope.classicJourney1Driver1VehicleVA = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/OneVehicleOneDriverVA.json', true);
      };

      $scope.classicJourney2Driver2Vehicle = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/TwoDrivers2Vehicles.json', true);
      };

      $scope.classicJourney3Driver3Vehicle = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/ThreeDriversThreeVehicles.json', true);
      };

      $scope.classicJourney4Driver4Vehicle = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/FourDriversFourVehicles.json', true);
      };

      $scope.classicJourney_2 = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/ThreeDriversTwoVehicles.json', true);
      };

      $scope.classicJourneyDMSPrefill = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/DMS_OneVehicleOneDriverVA.json', false);
      };

      $scope.classicJourneyDMS42Prefill = function () {
        StartJourney($http, $templateCache, quoteIntentMapper, journeyService, quoteIntentModel, 'scripts/Utilities/sampleData/DMS_FourVehicleTwoDriverVA.json', false);
      };

      //Member of the Marin tags
      analytics.track('quoteStart');

      spinnerService.hideAll();

      $scope.getZipCode = function (postalForm) {
        $scope.formSubmitted = true;
        $scope.autoZipForm.customerZip.$setValidity('invalidCode', true);
        if (postalForm.$valid) {
          spinnerService.show('loadingSpinner');

          addressService.getAddress($scope.zipCode.toString()).then(function (address) {
              if (address.HasRatedLocations) {
                $scope.autoZipForm.customerZip.$setValidity('invalidCode', true);
                journeyService.loadFlowState().then(function () {
                  journeyService.getNextStep(null, null, function () {
                    trackingService.init($scope.postalCodeSummary.route);
                    trackingService.setChannel('QuoteStart');
                  });
                });
              } else {
                trackingService.trackEvent('non-rated-postal-code', [{
                  key: 'non-rated-postal-code',
                  value: $scope.zipCode
                }]);
                spinnerService.hide('loadingSpinner');
                $scope.autoZipForm.customerZip.$setValidity('invalidCode', false);
                //Valid Zipcode but out of our territory
                ModalService.showMediaAlpha('We\'re not in your area yet', $scope.zipCode, 'Zip', 'Check out rates from these great companies')
              }
            },
            function () {
              spinnerService.hideAll();
              $scope.autoZipForm.customerZip.$setValidity('invalidCode', false);
            });
        }
      }
    }
  ];
}

/**
 * Created by gabello on 10/14/2014.
 */
function ConfirmDriverCtrl() {
  'use strict';

  return ['$scope', '$q', 'QuoteIntentModel', 'JourneyService', 'segmentIoTrackingService', 'DriverService', 'LookupDataService',
    function ($scope, $q, quoteIntentModel, journeyService, segmentIoTrackingService, driverService, lookupDataService) {

      journeyService.validatePolicyState();

      var addressState = quoteIntentModel.getAddress().State;

      $scope.confirmDriverCtrlState = {
        ratedDrivers: quoteIntentModel.getRatedDrivers(),
        quoteIntent: quoteIntentModel.getQuoteIntent(),
        quote: quoteIntentModel.getQuote(),
        formSubmitted: null,
        customFormItems: [],
        addressState: addressState
      };

      $scope.confirmDriverCtrlState.states = lookupDataService.getUSStates(addressState);


      //Default the drivers License State
      _.each($scope.confirmDriverCtrlState.ratedDrivers, function (driver) {
        if (!driver.LicenseState || driver.LicenseState.length == 0) {
          driver.LicenseState = addressState;
        }
      });


      var checkDupLicenseNumbers = function () {
        //check each drivers license to make sure we have no duplicates
        var licenseGroups = _.groupBy($scope.confirmDriverCtrlState.customFormItems, function (item) {
          return item.formItem.driverForm.driverLicense.$modelValue
        });
        //check each group to see if there are dups
        _.each(licenseGroups, function (licenseGroup) {
          if (licenseGroup.length > 1) {
            _.each(licenseGroup, function (item) {
              //Find the form based on index then invalidate it
              var formItem = _.findWhere($scope.confirmDriverCtrlState.customFormItems, {index: item.index});
              formItem.formItem.driverForm.driverLicense.$setValidity('duplicate', false);
            })
          } else {
            //There exists only one in this group so validate it
            var formItem = _.findWhere($scope.confirmDriverCtrlState.customFormItems, {index: licenseGroup[0].index});
            formItem.formItem.driverForm.driverLicense.$setValidity('duplicate', true);
          }
        });
      };

      $scope.validateDL = function (scope, index) {
        var driver = $scope.confirmDriverCtrlState.ratedDrivers[index];
        if (!driver.LicenseNumber) {
          return;
        }
        var testResult = driver.validateDriversLicense();
        scope.driverForm.driverLicense.$setValidity('license', testResult);
        checkDupLicenseNumbers();
      };

      //This is called from the linecoverages repeater when constructing
      $scope.addForm = function (scope, index) {
        $scope.confirmDriverCtrlState.customFormItems.push({index: index, formItem: scope});
      };

      $scope.saveConfirmedDrivers = function (form) {
        $scope.confirmDriverCtrlState.formSubmitted = true;
        if (form.$valid) {
          driverService.saveDrivers($scope.confirmDriverCtrlState.ratedDrivers);
          journeyService.getNextStep(null, null);
        }// if form.$valid
      }
    }
  ];
}

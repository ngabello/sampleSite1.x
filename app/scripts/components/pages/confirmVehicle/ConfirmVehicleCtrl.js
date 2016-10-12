/**
 * Created by gabello on 10/14/2014.
 */
function ConfirmVehicleCtrl() {
  'use strict';

  return ['$scope', '$q', '$log', 'QuoteIntentModel', 'JourneyService', 'radioChoices', 'vinIsoDataService', 'spinnerService',
    'errorService', 'goApiDataService', 'segmentIoTrackingService', 'pachydermContactInfo', 'DmsModel', 'VehicleService', 'LookupDataService',
    function ($scope, $q, $log, quoteIntentModel, journeyService, radioChoices, vinIsoDataService, spinnerService,
              errorService, goApiDataService, segmentIoTrackingService, pachydermContactInfo, DmsModel, vehicleService) {

      journeyService.validatePolicyState();

      $scope.confirmVehicleSummary = {
        enums: getEnums(),
        radioChoices: radioChoices,
        contactPhone: pachydermContactInfo.phone,
        vehicles: quoteIntentModel.getVehicles(),
        loadingCall: 'loadingVehicles',
        quoteIntent: quoteIntentModel.getQuoteIntent(),
        quote: quoteIntentModel.getQuote(),
        formSubmitted: null,
        customFormItems: [],
        lienHolders: [],
        vehicleAlerts: [],
        quoteState: quoteIntentModel.getQuoteState()
      };

      //At this point we must clear any VIN Stubs from the vehicles as they are not valid
      _.each($scope.confirmVehicleSummary.vehicles, function(vehicle){
        if(vehicle.Vin && vehicle.Vin.length < 15){
          vehicle.Vin = null;
        }
      });

      //region ---------------- Local functions ----------------------------------------------------------------

      //Prefill Vehicles if matches exist
      var prefillVehicle = function () {
        //skip if weve already shown the modal
        if ($scope.confirmVehicleSummary.quoteState.DmsConfirmation) return;

        var dms = new DmsModel();
        var matches = dms.collectMatchedVehicles();
        if (matches && matches.length > 0) {
          $scope.confirmVehicleSummary.quoteState.DmsConfirmation = true;
          $scope.confirmVehicleSummary.quoteState.saveQuoteState();
          errorService.showDmsConfirmation(matches);
        }
        $scope.$on('vehicles updated', function () {
          $scope.confirmVehicleSummary.vehicles = quoteIntentModel.getVehicles();
        });
      };

      var isDupVins = function () {
        var retValue = false;
        //check each VIN to make sure we have no duplicates
        var vinGroups = _.groupBy($scope.confirmVehicleSummary.customFormItems, function (item) {
          return item.formItem.vehicleForm.vin.$modelValue
        });
        //check each group to see if there are dups
        _.each(vinGroups, function (vinGroup) {
          if (vinGroup.length > 1) {
            retValue = true;
            _.each(vinGroup, function (item) {
              //Find the form based on index then invalidate it
              var formItem = _.findWhere($scope.confirmVehicleSummary.customFormItems, {index: item.index});
              formItem.formItem.vehicleForm.vin.$setValidity('duplicate', false);
            })
          } else {
            //There exists only one in this group so validate it
            var formItem = _.findWhere($scope.confirmVehicleSummary.customFormItems, {index: vinGroup[0].index});
            formItem.formItem.vehicleForm.vin.$setValidity('duplicate', true);
          }
        });
      };

      var callIncidentReport = function () {
        var callPromise = $q.defer();
        if ($scope.confirmVehicleSummary.quoteState.MVRClueCalled) {
          callPromise.resolve('Already Called');
        } else {
          goApiDataService.generateIncidentReport().then(function () {
            $scope.confirmVehicleSummary.quoteState.MVRClueCalled = true;
            $scope.confirmVehicleSummary.quoteState.saveQuoteState();
            callPromise.resolve('Quote completed');
          }, function (error) {
            callPromise.reject(error)
          });
        }
        return callPromise.promise;
      };
      //endregion

      vehicleService.getLienHolderList().then(function (lienHolders) {
        $scope.confirmVehicleSummary.lienHolders = lienHolders;
      });

      prefillVehicle();

      //Validates the Vin by first checking checkdigit calculation if that is successfull we call
      //the manufactured vehicle service with the Vin
      $scope.validateVIN = function (form, vehicle) {
        if (form.vehicleForm.vin.$dirty && _.isObject(vehicle) && vehicle.Vin) {
          if (vehicle.Vin.length != 17) {
            return;
          }
          form.vehicleForm.vin.$setValidity('validating', false);
          if (valid_vin(vehicle.Vin)) {
            form.vehicleForm.vin.$setValidity('badVIN', true);

            vinIsoDataService.getVehicleRatings(vehicle).then(function (ratings) {
              var vehicleData = {
                Year: vehicle.Year,
                Make: vehicle.Make,
                Model: vehicle.Model,
                Style: vehicle.YearStyleID,
                VIN: vehicle.Vin
              };

              if (!ratings || ratings.length == 0) {
                segmentIoTrackingService.trackGeneralEvent('NoRatingsVIN', vehicleData);
                vehicle.hasNoRatings = true;
                form.vehicleForm.vin.$setValidity('noMatch', false);
                return;
              }
              if (ratings[0].DoNotInsure) {
                segmentIoTrackingService.trackGeneralEvent('DoNotInsureVIN', vehicleData);
                vehicle.hasNoRatings = true;
                form.vehicleForm.vin.$setValidity('noMatch', false);
                return;
              }
              //clear the no match flag
              form.vehicleForm.vin.$setValidity('noMatch', true);
              //find a matching vehicleRating by Year and MakeID
              var validRating = _.findWhere(ratings, function (v) {
                return v.ModelYear == vehicle.Year && v.MakeId == vehicle.MakeID
              });
              //If no rating found then invalid vehicle
              if (!validRating) {
                form.vehicleForm.vin.$setValidity('noMatch', false);
                return;
              } else {
                form.vehicleForm.vin.$setValidity('validating', true);
                form.vehicleForm.vin.$setValidity('noMatch', true);
              }
              if (!isDupVins()) {
                //check the model and yearstyle and make sure they match up
                if (validRating.ModelId != vehicle.ModelID) {
                  vehicle.ModelID = validRating.ModelId;
                  //future use when YearStyleID is available
                  vehicle.YearStyleID = validRating.YearStyleId;
                  vehicle.Model = validRating.ModelName;
                }
              }
            }, function (error) {
              form.vehicleForm.vin.$setValidity('badVIN', false);
              errorService.showSystemError('ConfirmVehicleCtrl: Vehicle data service call to validate vehicles failed with error', error);
            });
          } else {
            form.vehicleForm.vin.$setValidity('badVIN', false);
          }
        }
      };

      //This is called from the linecoverages repeater when constructing
      $scope.addForm = function (scope, index) {
        //To keep from creating multiples. Angular fires this weird
        if ($scope.confirmVehicleSummary.customFormItems[index]) {
          $scope.confirmVehicleSummary.customFormItems[index] = {index: index, formItem: scope}
        } else {
          $scope.confirmVehicleSummary.customFormItems.push({index: index, formItem: scope});
        }
      };

      $scope.closeVehicleAlert = function (index) {
        $scope.confirmVehicleSummary.vehicleAlerts.splice(index, 1);
      };

      $scope.saveConfirmedVehicles = function (form) {
        $scope.confirmVehicleSummary.formSubmitted = true;

        //populate any lienholder addresses that are required
        _.each($scope.confirmVehicleSummary.customFormItems, function(form){
          var vehicle = form.formItem.vehicle;
          var vehicleForm = form.formItem.vehicleForm;
          if (vehicle.Lienholder && vehicle.Lienholder.Name && vehicle.Ownership == getEnums().EnumVehicleOwnerships.MakePayments) {
            var lienHolder = vehicleService.getLienHolder(vehicle.Lienholder.Name);
            if (lienHolder) {
              vehicle.Lienholder.AddressLine1 = lienHolder.Address;
              vehicle.Lienholder.City = lienHolder.City;
              vehicle.Lienholder.State = lienHolder.State;
              vehicle.Lienholder.PostalCode = lienHolder.ZipCode.toString();
            }else{
              vehicle.Lienholder.Name = 'I don\'t know but can provide later';
              vehicle.Lienholder.AddressLine1 = null;
              vehicle.Lienholder.City = null;
              vehicle.Lienholder.State = null;
              vehicle.Lienholder.PostalCode = null;
            }
          }
        });

        if (form.$valid) {
          vehicleService.saveVehicles($scope.confirmVehicleSummary.vehicles);
          spinnerService.show('confirmVehicleSpinner');
          //Call Incident report
          callIncidentReport().then(function () {
            var vehicles = quoteIntentModel.getVehicles();
            var brandedVehicle = _.findWhere(vehicles, {BrandedTitle: true});
            if (brandedVehicle) {
              journeyService.terminateJourney(5024);
              return;
            }
            goApiDataService.getQuote().then(function () {
              var quote = quoteIntentModel.getQuote();
              segmentIoTrackingService.trackCustomEvent('Requote', [{key: 'totalPremium', value: quote.TotalPremium}]);
              journeyService.getNextStep(null, null);
            }, function (error) {
              errorService.showSystemError('ConfirmVehicleCtrl: Failed to retrieve quote with error!', error);
            });
          }, function (error) {
            errorService.showSystemError('ConfirmVehicleCtrl: Retrieving incident report resulted with error ', error);
          });
        }//if form $valid
      };

    }
  ];
}

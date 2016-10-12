/**
 * Created by gabello on 10/9/2014.
 */
function QuoteCtrl() {
  'use strict';
  return ['$scope', '$log', 'QuoteIntentModel', 'pachydermContactInfo', 'JourneyService', 'DmsModel', 'DriverService', 'VehicleService', 'goApiDataService', 'generalTrackingService', 'segmentIoTrackingService',
    'spinnerService', 'coverageValidationService', 'errorService', 'messageService', '$rootScope', 'constDataPrefill', '$window', 'radioChoices', 'legalAssistService', 'DiminishingDeductibleService',
    function ($scope, $log, quoteIntentModel, pachydermContactInfo, journeyService, dmsModel, driverService, vehicleService, goApiDataService, generalTrackingService, segmentIoTrackingService,
              spinnerService, coverageValidationService, errorService, messageService, $rootScope, constDataPrefill, $window, radioChoices, legalAssistService, ddeductibleService) {

      journeyService.validatePolicyState();

      var continueText = 'Continue';
      var creatingMsg = 'Creating your quote';
      var updateMsg = 'Updating';
      var updateText = 'Update';
      $scope.salesNumber = pachydermContactInfo.phone;
      $scope.agreeDisagreeOption = radioChoices.agreeDisagree;
      $scope.addons = {open: false};

      $scope.addonModels = {
        diminishingDeductible: {
          selectedValue: null,
          eligible: null,
          eligibleVehicles: [],
          collection: [],
          fees: null
        },
        legalAssist: {
          drivers: quoteIntentModel.getDrivers(),
          obj: null,
          displayMessage: null,
          displayChangeMessage: null,
          defaultText: legalAssistService.getDefaultText(),
          ShowPlanNames: function(input){
            var coverage = _.find($scope.quoteCtrlState.policy.AvailableCoverages, {Name: "EISPALegalPlanCov"});
            var drivers = quoteIntentModel.getDrivers();
            if(input === coverage.Items[1].Desc){
              if(drivers.length === 1){
                return drivers[0].getFullName()
              }else{
                return 'Family Plan - All Drivers'
              }
            }
            else{
              return input;
            }
          }
        }
      };

      var init = function () {
        $scope.quoteCtrlState = {
          buttonText: continueText,
          waitMsg: creatingMsg,
          vehiclesCoverages: [],
          vehiclesChanged: [],
          groups: [],
          paymentPlan: null,
          policyCoverageForms: [],
          vehicleCoverageForms: [],
          policy: quoteIntentModel.getPolicy(),
          vehicles: quoteIntentModel.getVehicles(),
          quote: quoteIntentModel.getQuote(),
          address: quoteIntentModel.getAddress(),
          policyHolder: quoteIntentModel.getPolicyHolder(),
          quoteState: quoteIntentModel.getQuoteState()
        };


        //---------------- initialization ----------------------------------------------------------------

        //set up vehicle accordian groups
        _.forEach($scope.quoteCtrlState.vehicles, function(){
          $scope.quoteCtrlState.groups.push({open: false})
        });
        //set up add ons
        $scope.addonModels.legalAssist.obj = _.find($scope.quoteCtrlState.policy.AvailableCoverages, {Name: 'EISPALegalPlanCov'});
        $scope.addonModels.diminishingDeductible.collection = ddeductibleService.checkValues($scope.quoteCtrlState.vehicles);
        legalAssistService.checkCoverage(quoteIntentModel.getDrivers(), $scope.addonModels.legalAssist.obj);
        legalAssistService.setDisclaimer($scope.addonModels.legalAssist, $scope.addonModels.legalAssist.obj);


        //Get the least expensive payment plan
        //Monthly, 2 months down, 1 month down
        $scope.quoteCtrlState.paymentPlan = _.min($scope.quoteCtrlState.quote.PayPlans, function (paymentPlan) {
          return parseFloat(paymentPlan.DownPaymentAmount);
        })
      }; //init()

      init();
      ddeductibleService.init($scope.addonModels.diminishingDeductible);
      ddeductibleService.getFees($scope.addonModels.diminishingDeductible, $scope.quoteCtrlState.vehicles);
      //---------------- end initialization ----------------------------------------------------------------

      //-------------------------------- Policy Coverage Validation logic --------------------------------------

      //This is called from the linecoverages repeater when constructing
      $scope.addForm = function (scope, index) {
        $scope.quoteCtrlState.policyCoverageForms.push({index: index, policyFormItem: scope});
      };

      $scope.policyCoverageChanged = function (scope, index) {
        //check for diminishing deductible change
        if (index === 'diminishingDeductible') {
          //save diminishing deductible settings
          ddeductibleService.setValue($scope.quoteCtrlState, $scope.addonModels.diminishingDeductible);
          $scope.quoteCtrlState.buttonText = updateText;
          return $scope.quoteCtrlState.waitMsg = updateMsg;
        }
        if(index === 'legalPlan'){
          $scope.quoteCtrlState.buttonText = updateText;
          return $scope.quoteCtrlState.waitMsg = updateMsg;
        }
        //scope.coverage.Selected = scope.coverage.SelectedValue != null;

        //We need to find the corresponding index because policy.AvailableCoverages is an unfiltered list
        var customLineCode = $scope.quoteCtrlState.policyCoverageForms[index].policyFormItem.coverage.Name;
        var coverageToValidateIndex = _.findIndex($scope.quoteCtrlState.policy.AvailableCoverages, {Name: customLineCode});

        var validationResponseItems = coverageValidationService.validatePolicyCoverages(coverageToValidateIndex, $scope.quoteCtrlState.policy.AvailableCoverages, $scope.quoteCtrlState.address.State);
        if (validationResponseItems.length > 0) {
          _.each(validationResponseItems, function (validationResponse) {
            var policyForm = _.find($scope.quoteCtrlState.policyCoverageForms, function (policyCoverageForm) {
              return policyCoverageForm.policyFormItem.coverage.Name == validationResponse.errorElement;
            });
            if (policyForm && validationResponse.errorIdentifier) {
              policyForm.policyFormItem.policyCoverageForm.policyCoverageItem.$setValidity(validationResponse.errorIdentifier, validationResponse.isValid);
            }
          })
        }

        $scope.quoteCtrlState.buttonText = updateText;
        $scope.quoteCtrlState.waitMsg = updateMsg;
      };
      //-------------------------------- End Policy Coverage Validation logic ----------------------------------

      //-------------------------------- Vehicle Coverage Validation logic --------------------------------------


      //This is called from the vehiclecoverages repeater when constructing
      $scope.addVehicleForm = function (scope, index, vehicleId) {
        $scope.quoteCtrlState.vehicleCoverageForms.push({
          index: index,
          vehicleFormItem: scope,
          vehicleId: vehicleId
        });
      };

      $scope.vehicleCoverageChanged = function (scope, index, vehicleId) {
        //scope.coverage.Selected = scope.coverage.Value != null;
        var vehicle = _.findWhere($scope.quoteCtrlState.vehicles, {ID: vehicleId});

        var validationResponseItems = coverageValidationService.validateVehicleCoverages(scope, vehicle.AvailableCoverages, $scope.quoteCtrlState.address.State);
        if (validationResponseItems.length > 0) {
          _.each(validationResponseItems, function (validationResponse) {
            var vehicleForm = _.find($scope.quoteCtrlState.vehicleCoverageForms, function (customVehicleCoverageForm) {
              return customVehicleCoverageForm.vehicleFormItem.coverage.Name == validationResponse.errorElement && customVehicleCoverageForm.vehicleId == vehicleId;
            });
            if (vehicleForm && validationResponse.errorIdentifier) {
              vehicleForm.vehicleFormItem.vehicleCoverageForm.vehicleCoverageItem.$setValidity(validationResponse.errorIdentifier, validationResponse.isValid);
            }
            //find diminishing deductible response and add it to the collection
            if (validationResponse['DDTriggered']) {
              $scope.addonModels.diminishingDeductible.SelectedValue = null;
              _.extend(validationResponse, {vehicleId: vehicleId});
              var currentVehicle = _.findIndex($scope.addonModels.diminishingDeductible.collection, {vehicleId: validationResponse.vehicleId});
              if (currentVehicle >= 0) {
                $scope.addonModels.diminishingDeductible.collection[currentVehicle] = validationResponse;
              } else {
                $scope.addonModels.diminishingDeductible.collection.push(validationResponse);
              }
            }
          })
        }

        $scope.quoteCtrlState.buttonText = updateText;
        $scope.quoteCtrlState.waitMsg = updateMsg;
        $scope.quoteCtrlState.vehiclesChanged.push(scope.coverage.VehicleId);
        ddeductibleService.init($scope.addonModels.diminishingDeductible);
      };

      //-------------------------------- End Vehicle Coverage Validation logic ----------------------------------
      //-------------------------------- Addon change logic -----------------------------------------------------
      //remove legal plan from top coverage section
      $scope.lineCoverageFilter = function(item){
        return item.Name !== 'EISPALegalPlanCov';
      };

      $scope.legalChange = function (value) {
        $scope.quoteCtrlState.buttonText = updateText;
        return legalAssistService.addLegalCoverage(value, $scope.addonModels.legalAssist.drivers, $scope.quoteCtrlState.policy.AvailableCoverages);
      };

      //---------------------------------End Addon change logic -------------------------------------------------


      var coverageListener = $rootScope.$on('coverageWarning', function (event, addCoverage, invalidVehicles) {
        if (!addCoverage) {
          runDms();
          $rootScope.coverageWarningViewed = true;
        }
        else {
          //opens the accordian
          $scope.coverageGroup.open = true;
          _.forEach(invalidVehicles, function (list) {
            _.forEach($scope.quoteCtrlState.vehicles, function (vehicle, index) {
              if (list.VehicleId === vehicle.ID) {
                $scope.quoteCtrlState.groups[index].open = true;
              }
            })
          });
          //event to coverageWarning directive
          $scope.$broadcast('addCoverage');
        }
      });

      $scope.$on('$destroy', function () {
        coverageListener();
      });

      //Data-Prefill logic calls the ancillary service to lookup based on policyholder data
      //Prefills DriversLicense Number and State if matches on FirstName, LastName and BirthDate
      //Prefills Vin and Lienholder data if Year, make and model matches
      //|| !$window.dataPrefillTrigger
      var runDms = function () {
        if (!constDataPrefill.enabled || $scope.quoteCtrlState.quoteState.HasDmsRun || !$window.dataPrefillTrigger) {
          journeyService.getNextStep({LicenseNumberNeeded: true}, null);
          return;
        }
        spinnerService.show('quoteSpinner');
        new dmsModel().prefillDmsData().then(function (matchedDrivers) {
          $scope.quoteCtrlState.quoteState.HasDmsRun = true;
          $scope.quoteCtrlState.quoteState.saveQuoteState();
          //If all drivers are valid and all are matched then save and go to confirmVehicle page
          if (matchedDrivers.length == quoteIntentModel.getRatedDrivers().length) {
            driverService.saveDrivers(matchedDrivers);
            journeyService.getNextStep({LicenseNumberNeeded: false}, null);

          } else {
            journeyService.getNextStep({LicenseNumberNeeded: true}, null);
          }
        }, function (error) {
          //At this point if something fails just move on anyway
          $log.error('QuoteCtrl: DataPrefill call failed with error', error);
          journeyService.getNextStep({LicenseNumberNeeded: true}, null);
        });
      };

      var validateLineHolderData = function () {
        var invalidVehicles = $scope.invalidVehicles = [];
        _.each(quoteIntentModel.getVehicles(), function (vehicle) {
          if (vehicle.Ownership == 'Other') {
            var comprehensiveCov = _.findWhere(vehicle.AvailableCoverages, function (val) {
              return (val.SelectedValue != 'false' && val.SelectedValue != 'none') && val.Name == 'PAComprehensiveCov'
            });
            var collisionCov = _.findWhere(vehicle.AvailableCoverages, function (val) {
              return (val.SelectedValue != 'false' && val.SelectedValue != 'none') && val.Name == 'PACollisionCov'
            });

            if (!comprehensiveCov || !collisionCov) {
              invalidVehicles.push({
                Year: vehicle.Year,
                Make: vehicle.Make,
                Model: vehicle.Model,
                VehicleId: vehicle.ID,
                CompCode: 'PAComprehensiveCov',
                CollCode: 'PACollisionCov'
              })
            }
          }
        });
        if (invalidVehicles.length == 0) {
          $rootScope.coverageWarningViewed = true;
          runDms()
        } else {
          errorService.showCoverageWarning(invalidVehicles);
        }
      };

      $scope.continueQuote = function (isValid) {
        $scope.formSubmitted = true;
        if (isValid) {
          ddeductibleService.setValue($scope.quoteCtrlState, $scope.addonModels.diminishingDeductible);
          //Save any changes to policy coverages
          $scope.quoteCtrlState.policy.save();

          //Save any changes to vehicle coverages
          vehicleService.saveVehicles($scope.quoteCtrlState.vehicles);
          //is this an update or continue action
          if ($scope.quoteCtrlState.buttonText === continueText) {

            if ($scope.quoteCtrlState.policy.TerritoryRestriction) {
              journeyService.terminateJourney(9018);
              return;
            }
            if ($rootScope.coverageWarningViewed) {
              runDms();
            } else {
              validateLineHolderData();
            }
          } else {
            spinnerService.show('quoteSpinner');
            //Get the quote
            goApiDataService.getQuote().then(function () {
              var quote = quoteIntentModel.getQuote();
              generalTrackingService.setChannel('ReQuoteComplete');
              segmentIoTrackingService.trackCustomEvent('requoteCoverages', [{key: 'totalPremium', value: quote.TotalPremium}], {
                'quoteId': quote.QuoteNumber,
                'totalPremium': quote.TotalPremium
              });
              $scope.updatedVehicles = true;
              ddeductibleService.getFees($scope.addonModels.diminishingDeductible, quoteIntentModel.getVehicles());
              init();
              spinnerService.hide('quoteSpinner');
              //event to mobileScrollTop directive
              $scope.$broadcast('updateView');
            }, function (error) {
              errorService.showSystemError('QuoteCtrl: Failed to retrieve quote with error', error);
            });
          }
        }
      };
      //Compare add
      $scope.mediaAlphaUrl = 'views/quotes/directives/media-alpha.html?'
        + 'zip=' + $scope.quoteCtrlState.address.PostalCode
        + '&insured=' + $scope.quoteCtrlState.policyHolder.CurrentlyInsured
        + '&dob=' + $scope.quoteCtrlState.policyHolder.DateOfBirth
        + '&homeowner=' + $scope.quoteCtrlState.policyHolder.ResidenceOwnership
        + '&gender=' + $scope.quoteCtrlState.policyHolder.Gender
        + '&ageFL=' + $scope.quoteCtrlState.policyHolder.AgeFirstLicensed;

      $scope.showCompareBanner = $window.showCompareBanner;
      $scope.noBanner = $window.noBanner;

      $scope.information = function (item) {
        messageService.showQuoteMessage(item, quoteIntentModel.getAddress().State);
      };


      $scope.fraudStatement = function () {
        messageService.showFraudStatement();
      };

      $scope.policyStatement = function () {
        messageService.showPrivacyPolicy();
      };

    }
  ];
}

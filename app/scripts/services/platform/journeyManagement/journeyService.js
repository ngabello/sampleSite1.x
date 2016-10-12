function GetTerminationCode(quoteIntent, driverService) {
//check the flags and see if we need to terminate the quote process
  var policy = quoteIntent.getPolicy();
  if (policy.TerritoryRestriction) {
    return 9018;
  }
  if (policy.IsUWPhotoReviewExist) {
    return 1246;
  }
  if (policy.MaterialMisrep) {
    return 1348;
  }
  if (policy.BadDebtsFlag) {
    return 1011
  }
  if (policy.HasActivePolicy) {
    return 9031
  }
  if (policy.HasSR22) {
    return 2222
  }
  if (policy.HasFR44) {
    return 2222
  }
  if (policy.HasExcludedDriver) {
    return 2222
  }
  if (policy.HasInvalidLicense){
    return 9030
  }

  var addressState = quoteIntent.getAddress().State;
  var policyHolder = quoteIntent.getPolicyHolder();
  //Restrict Policyholder to specific LicenseStatus
  if (policyHolder && policyHolder.LicenseStatus && !driverService.isAllowedStatus(addressState, policyHolder.LicenseStatus)) {
    var errorId = policyHolder.LicenseStatus == getEnums().EnumLicenseStatuses.Suspended ? 9030 : 9040;
    return errorId;
  }

  var drivers = quoteIntent.getDrivers();
  //No driver in VA can have a foreign license
  if (addressState == 'VA') {
    var driver = _.findWhere(drivers, {LicenseStatus: getEnums().EnumLicenseStatuses.NonUS});
    if (driver) {
      return 9040
    }
  }

  //If any additional driver is unlicensed and answers “YES” to “Do they drive any of your vehicles twice a month or more?” the policy is ineligible
  var driver = _.findWhere(drivers, {
    LicenseStatus: getEnums().EnumLicenseStatuses.NonLicensed,
    DrivesAnyListedVehicles: true
  });
  if (driver) {
    return 1234
  }

  return 0;
}
/**
 * Created by gabello on 12/4/2015.
 */
function JourneyService() {
  'use strict';

  var journeyPrefixIdentifier = '';
  var journeyStates = [];

  function FillJourneyStates(response, journeyIdentifier) {
    if (!response || !response.data) {
      throw 'JourneyService: No Journey states found'
    }
    _.values(response.data).forEach(function (journeyItem) {
      if(!journeyItem.landingPage) {
        journeyItem.pageUrl = journeyItem.pageUrl.replace('/', '/' + journeyIdentifier);
      }
      journeyStates.push(journeyItem);
    });
  }

  function FillJourneyRoutes(response, $state, journeyRouteService, journeyIdentifier) {
    FillJourneyStates(response, journeyIdentifier);

    var currentStates = $state.get();
    if (!currentStates) {
      throw String.format('JourneyService: No Routes found check the config for journey identifier {0}', journeyIdentifier);
    }
    //Before we add a new route make sure it does not already exist
    _.values(response.data).forEach(function (stateItem) {
      var existingState = _.findWhere(currentStates, {name: stateItem.pageName});
      if (!existingState && stateItem.templateUrl) {
        journeyRouteService.addState(stateItem, journeyIdentifier);
      }
    });
  }

  function GetJson($templateCache, $http, pathToJson, $q) {
    //check the ng-template cache before making a request
    return $q(function (res, rej) {
      var json = $templateCache.get('../' + pathToJson);
      if (json) {
        return res({data: JSON.parse(json)});
      } else {
        return $http.get(pathToJson).then(function (temp) {
          res(temp)
        });
      }
    })
  }


  return ['$q', '$location', '$http', '$log', '$state', 'JourneyRouteService', 'journeyInfo', 'QuoteIntentModel', 'ClientDataModel', 'spinnerService', '$window', 'goApiDataService',
    'VehicleService', '$templateCache', 'sessionKeys', 'localStorageService', 'DriverService', 'errorService', 'segmentIoTrackingService', 'optimizelyTrackingService',
    function ($q, $location, $http, $log, $state, journeyRouteService, journeyInfo, quoteIntent, clientDataModel, spinnerService, $window, goApiDataService,
              vehicleService, $templateCache, sessionKeys, localStorageService, driverService, errorService, segmentIoTrackingService, optimizely) {
      return {

        getJourneyIdentifier: function () {
          return journeyPrefixIdentifier;
        },

        redirectJourney: function (route) {
          spinnerService.hideAll();
          $window.location.href = route;
        },

        goToAppStart: function () {
          spinnerService.hideAll();
          $location.path('/postal-code')
        },

        terminateJourney: function (errorId) {
          spinnerService.hideAll();
          var state = null;
          var address = quoteIntent.getAddress();
          if (address) {
            state = address.State;
          }
          var errorIdentifier = !errorId ? 0 : errorId;
          goApiDataService.saveDocumentData().then(function () {
              //track error reason
              segmentIoTrackingService.trackCustomEvent('quoteTermination', [{key: 'reason', value: errorIdentifier}]);
              spinnerService.hideAll();
              // transition to the next view
              $location.path('/quote-termination').search({state: state, id: errorIdentifier});
            },
            function (error) {
              $log.error('JourneyService: saving document failed with error ', error);
              $location.path('/quote-termination').search({state: state, id: errorIdentifier});
            });
        },

        validatePolicyState: function () {
          var quoteIntentId = quoteIntent.getQuoteIntentId();
          var policy = quoteIntent.getPolicy();
          //If we have no quoteIntentId or we have a policyNumber then start over
          if (!quoteIntentId) {
            spinnerService.hideAll();
            return $location.path('/postal-code');
          } else if ((policy && policy.PolicyNumber)) {
            spinnerService.hideAll();
            this.redirectJourney('https://mypolicy.pachyderm.com')
          }
        },
        validatePaymentState: function () {
          var quoteIntentId = quoteIntent.getQuoteIntentId();
          //If we have no quoteIntentId or we have a policyNumber then start over
          if (!quoteIntentId) {
            spinnerService.hideAll();
            return $location.path('/postal-code');
          }
        },

        loadFlowState: function () {
          var deferred = $q.defer();
          var journeyIdentifier = optimizely.setJourney();
          var journeyParms = journeyInfo[journeyIdentifier];
          if (!journeyParms) {
            $log.error('JourneyService: loading flow state requires configuration items');
            deferred.reject('boom');
            return deferred.promise;
          }
          journeyPrefixIdentifier = journeyParms.identifier;
          localStorageService.set(sessionKeys.journey, journeyIdentifier);
          //var getRouteJsonPromise = GetJson($templateCache, $http, journeyParms.journeyRoutePath, $q);
          var getJourneyJsonPromise = GetJson($templateCache, $http, journeyParms.journeyPath, $q);
          $q.when(getJourneyJsonPromise).then(function (response) {
            FillJourneyRoutes(response, $state, journeyRouteService, journeyParms.identifier);
            deferred.resolve();
          }, function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
        },

        getCurrentPath: function () {
          var urlPath = $location.path();
          var currentPath = '';

          var items = urlPath.split('/');
          if (items.length > 2) {
            var index = urlPath.lastIndexOf("/");
            currentPath = urlPath.substring(0, index + 1);
          } else {
            currentPath = urlPath;
          }
          return currentPath;
        },

        getAllStates: function () {
          return journeyStates;
        },
        processStateChange: function (ev, t, f) {
          //handle any specific page transitions
          if (f) {
            var journeyData = _.findWhere(journeyStates, {pageName: f.name});
            if (journeyData && journeyData.lastPage) {
              ev.preventDefault();
              return $window.location.href = 'https://mypolicy.pachyderm.com';
            }
          }
        },

        getNextStep: function (modelData, args, callback) {
          var nextPage;
          var currentPath = this.getCurrentPath();

          try {
            var currentState = _.findWhere(journeyStates, {pageUrl: currentPath});
            nextPage = currentState.nextPage;
            if (currentState.conditions.length > 0) {
              if (!modelData) {
                //We need to throw an exception here cause we have conditions but no modelDatas to test
                throw String.format('JourneyService: navigating from {0} we have conditions but no modelDatas to test', currentPath);
              }

              var orderedConditions = _.sortBy(currentState.conditions, function(cond) {return cond.priority});
              var nextCondition = _.find(orderedConditions, function(condItem){
                if(_.isObject(modelData)){
                  if (_.has(modelData, condItem.test)) {
                    var testProp = modelData[condItem.test];
                    if (testProp == condItem.expected) {
                      if (_.isBoolean(condItem.includeArgs) && !condItem.includeArgs) {
                        args = null;
                      }
                      return true;
                    }
                  }
                }
              });

              if(!nextCondition){
                throw String.format('JourneyService: navigating from {0} we have conditions but no modelDatas to test', currentPath);
              }else{
                nextPage = nextCondition.nextPage;
              }
            }
            if (nextPage) {
              var nextState = _.findWhere(journeyStates, {pageName: nextPage}).pageUrl;
              if (args != null) {
                nextState += args;
              }

              var clientData = quoteIntent.getClientData();
              if (!clientData) {
                clientData = new clientDataModel();
              }
              clientData.NextView = nextState;
              if (!clientData.ViewedPages) {
                clientData.ViewPages = [];
              }
              clientData.ViewedPages.push($location.path());
              clientData.CurrentView = nextState;
              clientData.Journey = localStorageService.get(sessionKeys.journey);
              clientData.save();

              var journeyService = this;
              //saves the document
              goApiDataService.saveDocumentData().then(function () {
                  if (callback && typeof callback == 'function') {
                    callback();
                  }
                  spinnerService.hideAll();
                  //Determine if we need to bail because of a bad scenario
                  var errorCode = GetTerminationCode.call(this, quoteIntent, driverService);
                  if (errorCode > 0) {
                    journeyService.terminateJourney(errorCode);
                    return;
                  }
                   // transition to the next view
                  $location.path(nextState);
                },
                function (error) {
                  errorService.showSystemError('JourneyService: saving document failed with error ', error);
                });
            } else {
              $log.error(String.format('JourneyService: navigating from {0} there was no nextPage defined', currentPath));
            }
          }
          catch (e) {
            $log.error('JourneyService: exception caught', e);
            //TODO we need to navigate to an error screen
          }
        },

        getQuoteIntentData: function (param) {
          return goApiDataService.getQuoteIntentData(param);
        }
      };
    }];
}

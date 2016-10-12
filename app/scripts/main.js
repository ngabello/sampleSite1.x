'use strict';

var modules = [
  'ui.router',
  'ngAnimate',
  'entry.points.app',
  'journey.classic.app',
  'journey.classic.2.app',
  'LocalStorageModule',
  'angularSpinners'
];

angular.module('consumerWeb.App', modules)
  .controller('mainController', ['$scope', 'spinnerService', function ($scope, spinnerService) {
    $scope.spinnerLoaded = function (mySpinner) {
      spinnerService.show('loadingSpinner');
    };
  }])
  .directive('breadCrumbs', BreadCrumbs())
  .directive('navSummary', NavSummary())
  .directive('ngOptimizely', ngOptimizely())
  .directive('buttonsRadio', buttonsRadio())
  .directive('validDate', ValidDateFormatter())
  .directive("compareTo", compareTo())
  .directive("mediaAlpha", mediaAlpha())
  .directive('header', header())
  .directive('planSummary', planSummary())
  .directive('onlyDigits', DigitsOnly())
  .directive('validCreditCard', CreditCardValidator())
  .directive('ssnMask', ssnMask())
  .directive('refresh', Refresh())
  .directive('capitalizeFirst', CapitalizeFirst())
  .directive('mobileNavSummary', mobileNavSummary())
  .directive('mobilePlanSummary', mobilePlanSummary())
  .directive('mobileBillingPayment', mobileBillingPayment())
  .directive('mobileScrollTop', mobileScrollTop())
  .directive('legalPlanSummary', legalPlanSummary())
  .directive('coverageWarning', coverageWarning())
  .directive('analyticsOn', eventTracking())
  .filter('lienholderTypeAheadEdit', lienholderTypeAheadEdit())
  .directive('diminishingDeductible', diminishingDeductible())
  .directive('errorScroll', errorScroll())
  .directive('singleClick', SingleClick())
  .directive('singleEnterKey', SingleEnterKey())
  .directive('optimizelyEasteregg', OptimizelyEasteregg())
  .directive('everQuote', EverQuote())
  .directive('trackOccupation', TrackOccupation())
  .directive('occupationDirective', OccupationDirective())
  .directive('billingUtility', BillingUtility())
  .directive('compareBanner', CompareBanner())
  .directive('validateSubmit', ValidateSubmit())

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.when('', '/postal-code');
      $urlRouterProvider.when('/postal-landing/{postalCode}', '/postal-landing/{postalCode:int}');
      $urlRouterProvider.when('/lc-landing/{rqId}', '/lc-landing/{rqId:int}');
      $urlRouterProvider.when('/comparenow-landing/{account}{job}{activity}', '/comparenow-landing/{account:int}{job:int}{activity}');
      $urlRouterProvider.otherwise('/postal-code');
      $urlRouterProvider.when('/quote-termination/{Id}', '/quote-termination/{state:int}{id:int}');

      $stateProvider
        .state('root', {
          abstract: true,
          url: '',
          template: '<div><div ui-view></div></div>'
        })
        .state('quoteTermination', {
        url: '/quote-termination?state&id',
        templateUrl: '../scripts/components/pages/quoteTermination/quote-termination.tpl.html',
        controller: QuoteTerminationCtrl()
      })
      ;
    }])
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('quotes.pachyderm');
    localStorageServiceProvider.setStorageType('sessionStorage');
  }])
  .config(['$httpProvider', function ($httpProvider) {

    var httpInterceptor = ['$q', '$log', 'spinnerService', 'snackbar', function ($q, $log, spinnerService, snackbar) {
      var service = {

        // run this function before making requests
        'request': function (config) {
          // Return the config or wrap it in a promise if blank.
          return config || $q.when(config);
        },

        // On request failure
        requestError: function (rejection) {
          spinnerService.hideAll();
          // Return the promise rejection.
          return $q.reject(rejection);
        },
        // On response success
        response: function (response) {
          // Return the response or promise.
          return response || $q.when(response);
        },

        // On response failure
        responseError: function (rejection) {
          spinnerService.hideAll();
          if (rejection.hasOwnProperty('status') && rejection.status == -1) {
            snackbar.create(null, 1);
          }
          // Return the promise rejection.
          return $q.reject(rejection);
        }
      };

      return service;
    }
    ];
    $httpProvider.interceptors.push(httpInterceptor);
  }


  ])
;

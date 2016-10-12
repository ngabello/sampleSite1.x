/**
 * Created by gabello on 12/2/2015.
 */
'use strict';
angular.module('journey.classic.2.app', [
  'ui.router',
  'ui.bootstrap',
  'ui.validate',
  'ui.mask',
  'ui.date',
  'quotes.config',
  'platform.apiServices',
  'platform.lookupDataService',
  'platform.logging',
  'platform.modal',
  'platform.eventTracking',
  'quotes.services',
  'platform.loadingMsg',
  'platform.journeyNavigation',
  'quotes.models',
  'ngMessages',
  'environment.config',
  'templates',
  'components.field',
  'LocalStorageModule',
  'angularSpinners'
])


  .factory('coverageValidationService', CoverageValidationService())
  .factory('messageService', MessageService())
  .factory('ancillaryDisplayService', AncillaryDisplayService())
  .factory('legalAssistService', LegalAssistService())

  //.config(['$stateProvider', 'journeyInfo', function ($stateProvider, journeyInfo) {
  //  var states = new getClassic2RouteState();
  //  _.values(states).forEach(function (state) {
  //    state.url = state.url.replace('/','/' + journeyInfo.classicJourney_2.identifier);
  //    state.name = journeyInfo.classicJourney_2.identifier + state.name;
  //    $stateProvider.state(state);
  //  });
  //}])

  //.directive('breadCrumb', breadcrumb())
  //.directive('navSummary', NavSummary())
  //.directive('ngOptimizely', ngOptimizely())
  //.directive('buttonsRadio', buttonsRadio())
  //.directive('validDate', ValidDateFormatter())
  //.directive("compareTo", compareTo())
  //.directive("mediaAlpha", mediaAlpha())
  //.directive('header', header())
  //.directive('planSummary', planSummary())
  //.directive('onlyDigits', DigitsOnly())
  //.directive('validCreditCard', CreditCardValidator())
  //.directive('ssnMask', ssnMask())
  //.directive('refresh', Refresh())
  //.directive('capitalizeFirst', CapitalizeFirst())
  //.directive('mobileNavSummary', mobileNavSummary())
  //.directive('mobilePlanSummary', mobilePlanSummary())
  //.directive('mobileBillingPayment', mobileBillingPayment())
  //.directive('mobileScrollTop', mobileScrollTop())
  //.directive('legalPlanSummary', legalPlanSummary())
  //.directive('coverageWarning', coverageWarning())
  //.directive('billingUtilities', billingUtilities())
  //.directive('analyticsOn', eventTracking())
  //.filter('lienholderTypeAheadEdit', lienholderTypeAheadEdit())
  //.directive('diminishingDeductible', diminishingDeductible())
  //.directive('errorScroll', errorScroll())
  //.directive('singleClick', SingleClick())
  //.directive('singleEnterKey', SingleEnterKey())
  //.directive('optimizelyEasteregg', OptimizelyEasteregg())
  //.directive('everQuote', EverQuote())
  //.directive('trackOccupation', TrackOccupation())

;

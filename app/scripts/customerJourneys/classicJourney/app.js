/**
 * Created by gabello on 12/2/2015.
 */
'use strict';
angular.module('journey.classic.app', [
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
  'platform.event',
  'quotes.services',
  'platform.loadingMsg',
  'platform.journeyNavigation',
  'quotes.models',
  'ngMessages',
  'environment.config',
  'templates',
  'components.field',
  'LocalStorageModule',
  'angularSpinners',
  'angular.snackbar'
])

  .factory('coverageValidationService', CoverageValidationService())
  .factory('messageService', MessageService())
  .factory('ancillaryDisplayService', AncillaryDisplayService())
  .factory('legalAssistService', LegalAssistService())


  .component('aDRatingsFactors', ADRatingsFactors())

;

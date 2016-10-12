/**
 * Created by gabello on 12/14/2015.
 */
angular.module('quotes.services', ['quotes.models', 'LocalStorageModule'])
  .factory('QuoteIntentMapper', QuoteIntentMappingService())
  .factory('VehicleService', VehicleService())
  .factory('IncidentService', IncidentService())
  .factory('DriverService', DriverService())
  .factory('AddressService', AddressService())
  .factory('LeadCloudMapper', LeadCloudMappingService())
  .factory('errorService', ErrorService())
  .factory('DiminishingDeductibleService', DiminishingDeductService())
;

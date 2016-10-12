/**
 * Created by gabello on 12/10/2015.
 */
angular.module('quotes.models', [])
  .factory('AddressModel', AddressModelService())
  .factory('DriverModel', DriverModelService())
  .factory('QuoteStateModel', QuoteStateModelService())
  .factory('PolicyModel', PolicyModelService())
  .factory('IncidentModel', IncidentModelService())
  .factory('AncillaryModel', AncillaryModelService())
  .factory('CoverageModel', CoverageModelService())
  .factory('DmsModel', DmsModelService())
  .factory('LeadModel', LeadModelService())
  .factory('VehicleModel', VehicleModelService())
  .factory('QuoteModel', QuoteModelService())
  .factory('ClientDataModel', ClientDataModelService())
  .factory('PaymentModel', PaymentModelService())
  .factory('ModelHelper', ModelHelperService())
  .factory('ChannelSourceModel', ChannelSourceModel())
  .service('QuoteIntentModel', QuoteIntentModelService());

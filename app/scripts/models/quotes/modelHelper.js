/**
 * Created by gabello on 1/15/2016.
 */
'use strict';
function ModelHelperService() {

  return ['QuoteIntentModel', 'PaymentModel', 'DriverModel', 'AddressModel', 'VehicleModel', 'IncidentModel', 'QuoteStateModel', 'PolicyModel', 'QuoteModel', 'ClientDataModel',
    function (quoteIntentModel, paymentModel, driverModel, addressModel, vehicleModel, incidentModel, quoteStateModel, policyModel, quoteModel, clientDataModel) {
      return {

        createDriver: function(){
          return new driverModel();
        },

        createPolicy: function(){
          return new policyModel();
        },

        createIncident: function(){
          return new incidentModel();
        },

        createVehicle: function(){
          return new vehicleModel();
        },

        createQuoteState: function(){
          return new quoteStateModel();
        },

        createQuote: function(){
          return new quoteModel;
        },

        createPayment: function(){
          return new paymentModel();
        },

        createAddress: function(){
          return new addressModel();
        },

        createClientData: function(){
          return new clientDataModel();
        }
      }
    }];
}

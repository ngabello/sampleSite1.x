/**
 * Created by gabello on 1/14/2016.
 */
function PaymentModelService() {
  'use strict';
  return ['QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
            BillingAddress: {
              AddressLine1: null,
              City: null,
              State: null,
              PostalCode: null
            },
            PayPlan:{},
            Method: 'CreditCard',
            PhoneNumber: null,
            CreditCard: {
              ExpirationYear: null,
              ExpirationMonth: null,
              Number: null,
              CardIssuer: null,
              NameOnCard: null
            }
        };
        _.extend(this, defaults, attributes);
      };

      // Class Methods
      _.extend(clazz.prototype, {

        save: function () {
          quoteIntentModel.savePayment(this);
        },

        populateData: function (data) {
          _.extend(this, data);
        }

      });

      return clazz;
    }];
}

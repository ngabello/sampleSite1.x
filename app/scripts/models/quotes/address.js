/**
 * Created by gabello on 10/29/2014.
 */
'use strict';
function AddressModelService() {

  return ['QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          AddressLine1: null,
          AddressLine2: null,
          AddressType: null,
          City: null,
          Country: null,
          Counties: [],
          County: null,
          ID: null,
          PostalCode: null,
          State: null,
          IsValidated: null,
          PostalCodeType: null,
          HasRatedLocations: null
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        buildAddress: function (addressData, addressLine1) {
          this.PostalCodeType = addressData.postalCodeType;
          this.HasRatedLocations = addressData.hasRatedLocations;
          //Save the counties by selecting unique names
          var counties = _.uniq(addressData.counties, function (county) {
            return county.name;
          });
          this.AddressLine1 = addressLine1;
          this.City = addressData.city;
          this.State = addressData.state;
          this.PostalCode = addressData.value;
          this.IsValidated = true;
          var instance = this;
          _.each(counties, function (county) {
            instance.Counties.push({
              Name: county.name,
              StateAbbreviation: county.state
            })
          });

          this.save();

        },

        save: function () {
          if (!this.ID) {
            this.ID = createGuid();
          }
          quoteIntentModel.saveAddress(this);
        },

        populateData: function (data) {
          _.extend(this, data);
        }
      });

      return clazz;
    }
  ];
}

/**
 * Created by gabello on 10/9/2014.
 */
function PolicyModelService() {
  'use strict';
  return ['QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          IsUWPhotoReviewExist: null,
          EffectiveDate: null,
          OrigPolicyStartDate: null,
          PolicyStatus: null,
          MVRClueCalled: false,
          WrittenDate: null,
          BadDebtsFlag: null,
          HasActivePolicy: null,
          MaterialMisrep: null,
          HasMotorcycle: null,
          TerritoryRestriction: false,
          PolicyNumber: null,
          CurrentInsuranceLimits: null,
          AvailableCoverages: [],
          HasSR22: false,
          HasFR44:false,
          HasExcludedDriver:false,
          HasInvalidLicense: null
        };
        _.extend(this, defaults, attributes);
      };

      // Class Methods
      _.extend(clazz.prototype, {

          save: function () {
            quoteIntentModel.savePolicy(this);
          },
          addCoverage: function(items){
            var current = this;
            if(Array.isArray(items) && items.length){
              _.forEach(items, function(item){
                current.push(item)
              })
            }
          },
          removeCoverage: function(items){

        },
        populateData: function (data) {
          _.extend(this, data);

          //convert effective date to slashes
          if(this.EffectiveDate) this.EffectiveDate = this.EffectiveDate.replace(/-/g, '/');
          this.save();
        }

      });

      return clazz;
    }];
}

/**
 * Created by gabello on 12/10/2015.
 */
function QuoteStateModelService() {
  'use strict';
  return ['QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          AdditionalDrivers: null,
          HasRatedLocations:false,
          HasIncidents: null,
          HasConvictions: null,
          HasDmsRun:false,
          DmsConfirmation: false,
          MVRClueCalled: false,
          DriverConvictions:[],
          BindAttempts: 0,
          PreviousTotalPremiumWithFees: null,
          QuoteHistory:[],
          UnProcessedLeadDrivers:[],
          UnProcessedLeadVehicles:[]
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        saveQuoteHistory: function(totalPremium){
          this.QuoteHistory.push({TotalPremium : totalPremium, QuoteDate: moment(new Date()).format('MM-DD-YYYY h:mm:ss a') });
          this.saveQuoteState();
        },

        saveQuoteState: function () {
            quoteIntentModel.saveQuoteState(this);
        },

        populateData: function (data) {
          _.extend(this, data);

          this.saveQuoteState();
        }
      });

      return clazz;
    }
  ];
}

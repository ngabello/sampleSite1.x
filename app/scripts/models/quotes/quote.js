/**
 * Created by gabello on 10/14/2014.
 */
function QuoteModelService() {
  'use strict';
return ['$q', 'QuoteIntentModel',
    function ($q, quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          Discounts: [],
          PayPlans: [{
            DownPaymentAmount: null,
            InstallmentAmount: null,
            InstallmentAmountWithoutInstallmentFee:null,
            InstallmentFee:null,
            NumberOfInstallments: null,
            NumberOfPayments: null,
            ID: null,
            TotalCostWithFees:null,
            Desc:null,
            IsSelected:false
          }],
          PremiumFees: [{
            Desc:null,
            Amount:null
          }],
          QuoteNumber: null,
          TotalFees: null,
          TotalPremium: null,
          TotalPremiumWithFees:null,
          PreviousTotalPremiumWithFees:null
        };
        _.extend(this, defaults, attributes);
      };

      // Class Methods
      _.extend(clazz.prototype, {

        saveQuote: function () {
          quoteIntentModel.saveQuote(this);
        },
        getDiscounts: function(){
          return this.Discounts;
        },

        populateData: function (data) {
          //We need to maintain the previous TotalPremium to determine if the value

         //Repopulate the model with the quote from API
          _.extend(this, data);

          this.saveQuote();
        }

      });

      return clazz;
    }
  ];
}

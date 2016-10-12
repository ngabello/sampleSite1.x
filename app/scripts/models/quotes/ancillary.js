/**
 * Created by gabello on 3/25/2015.
 */
function AncillaryModelService() {
  return ['$q', 'ancillaryAPIDataService', 'QuoteIntentModel',
    function ($q, ancillaryAPIDataService, quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          Plans: [{
            PlanCost: null,
            TotalPlanCost: null,
            PlanId: null,
            PlanType: null,
            Name: null,
            Drivers: [],
            EffectiveDate: null,
            Description: null,
            HideInPolicyCenter: null,
            Denied: null,
            Links: [
              {
                Href: null,
                Rel: null
              }]
          }]
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        check_eligibility: function (quoteIntentId) {
          var deferred = $q.defer();
          var currentPlans = this;
          ancillaryAPIDataService.checkEligibility(quoteIntentId).then(function (response) {
            var planResults = JSON.parse(JSON.stringify(response.data));
            currentPlans.populateData(planResults);
            quoteIntentModel.saveAncillaryPlans(currentPlans);
            deferred.resolve("Success");
          }, function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
        },

        make_payment: function (quoteIntentId, data) {
          return ancillaryAPIDataService.makePayment(quoteIntentId, data);
        },

        populateData: function (data) {
          _.extend(this, data);
        }
      });

      return clazz;
    }
  ];
}

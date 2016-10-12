/**
 * Created by jholloman on 11/17/2015.
 */
'use strict';
function LegalAssistService() {
  return ['QuoteIntentModel', '$q', '$sce', '$http', '$log', function (quoteIntentModel, $q, $sce, $http, $log) {
    var LEGAL_DATA_URL = 'http://d1pvkh5g3u3d4w.cloudfront.net/products.json';
    var legalAssistData = {};
    var obj = {
      changed: null,
      coverage: null

    };
    var legalData = {};
    _.extend(obj, {
      fillLegalAssistData: function(){
        return $q(function(res, rej){
          if(_.isEmpty(legalAssistData)){
            $http.get(LEGAL_DATA_URL).then(function(data){
              if(data){
                legalAssistData = data.data;
                return res();
              }
              return rej();
            }, function(error){
              rej(error);
            })
          }
        });
      },
      getLegalAssistCost: function(){
        if(!legalAssistData) return;
        var state = quoteIntentModel.getAddress().State;
        var stateOverride = state.toLowerCase().concat('_override');
        var drivers = quoteIntentModel.getDrivers();
        var coverageType = drivers.length === 1 ? 'individual' : 'family';

        var getCost = function(obj, override){
          return obj[override] ? obj[override].price_monthly : obj['default'].price_monthly;
        };
        return getCost(legalAssistData.products.legal.price_tiers[coverageType], stateOverride)
      },
      getDefaultText: function () {
        return $sce.trustAsHtml(
          'Legal Assistance is an optional feature that provides 100% coverage for legal consultation' +
          ' and representation for one minor traffic infraction per eligible driver per policy period, ' +
          'as well as a 25% discount to attorney fees for matters including will preparation, family law ' +
          'matters, and documentation preparation and review'
        );
      },
      setDisclaimer: function (legalModel, coverage) {
        if (legalModel.obj) {

          if (legalModel.obj.SelectedValue === coverage.Items[0].Value) {
            legalModel.displayMessage = false;
          } else {
            if (this.changed) {
              legalModel.displayMessage = false;
              legalModel.displayChangeMessage = true;
            } else {
              legalModel.displayMessage = true;
            }
          }
        }
      },
      checkCoverage: function (drivers, coverage) {
        if(coverage){
          if(coverage.SelectedValue !== "LPNone"){
            if(drivers.length === 1){
              var type = 'individual';
              this.showChange(type);
              this.coverage = type;
            }else {
              type = 'family';
              this.showChange(type);
              this.coverage = type
            }
          }
        }
      },
      showChange: function (change) {
        if(this.coverage){
          this.changed = this.coverage !== change;
        }
      }
    });
    return obj;
  }]
}

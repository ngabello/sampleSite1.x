/**
 * Created by gabello on 10/10/2014.
 */
'use strict';
function CoverageModelService() {
  return ['QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = coverageRepresentation;
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        //getCoverageRouteName: function () {
        //  return 'coverage';
        //},
        //
        //saveDefaultCoverages: function (callGroup) {
        //  //Only save default coverages if we have not already quoted
        //  var quote = quoteIntentModel.getQuote();
        //  if (quote && quote.TotalPremium && quote.TotalPremium > 0) {
        //    var quotePromise = $q.defer();
        //    quotePromise.resolve('Already Quoted');
        //    return quotePromise.promise;
        //  }
        //  //Gets the state from the physical mailing address
        //  var state = quoteIntentModel.getAddressState();
        //  var policyHolder = quoteIntentModel.getPolicyHolder();
        //  var limit = 0;
        //  //If the policy holder has insurance then check the limit so we can set our defaults
        //  //otherwise use the basic defaults
        //  if (policyHolder.CurrentInsuranceLimits) {
        //    var insuranceLimit = _.findWhere(insuranceLimits, {Value: policyHolder.CurrentInsuranceLimits}).Limit;
        //    if (insuranceLimit) {
        //      limit = parseInt(insuranceLimit, 10);
        //    }
        //  }
        //  if (state && !isNaN(limit) && limit >= 0) {
        //    var coverageRouteName = this.getCoverageRouteName();
        //    var defaultCoverages = getDefaultPolicyCoverages(state, limit);
        //    var policyCoverageLink = quoteIntentModel.getLink(coverageRouteName);
        //    if (policyCoverageLink) {
        //      return internalAPIDataService.postData(coverageRouteName, policyCoverageLink, defaultCoverages, callGroup);
        //    } else {
        //      var rejected = $q.defer();
        //      rejected.reject('Coverage routeName cannot be found in Links collection');
        //      return rejected.promise;
        //    }
        //  }
        //  else {
        //    var stateLimitRejection = $q.defer();
        //    stateLimitRejection.reject('Could not determine State or CurrentInsuranceLimit');
        //    return stateLimitRejection.promise;
        //  }
        //},
        //
        //getPolicyCoverages: function (callGroup) {
        //  var urlLink = quoteIntentModel.getLink(this.getCoverageRouteName());
        //  var getPromise = internalAPIDataService.getData(this.getCoverageRouteName(), urlLink, callGroup);
        //  var deferred = $q.defer();
        //  $q.when(getPromise,
        //    function (response) {
        //      var coverageResults = JSON.parse(JSON.stringify(response.data));
        //      _.forEach(coverageResults, function (coverage) {
        //        var filters = getPolicyCenterExceptions(coverage.Code, quoteIntentModel.getAddress().state);
        //        var coverageOptions = [];
        //        _.forEach(coverage.CoverageTerms[0].CoverageOptions, function (option) {
        //          var optionItem = _.find(filters, function (filterItem) {
        //            return filterItem.Value == option.Value;
        //          });
        //          if (optionItem) {
        //            coverageOptions.push(option);
        //          }
        //        });
        //        coverage.CoverageTerms[0].CoverageOptions = coverageOptions;
        //        quoteIntentModel.savePolicyCoverage(coverage);
        //      });
        //      deferred.resolve(coverageResults);
        //    }, function (error) {
        //      deferred.reject(error);
        //    });
        //  return deferred.promise;
        //},
        //
        //saveSelectedPolicyCoverages: function (callGroup) {
        //  var policyCoverages = quoteIntentModel.getPolicyCoverages();
        //  var policyCoveragesToSave = [];
        //  //gather up all the policy coverages
        //  _.each(policyCoverages, function (policyCoverageItem) {
        //    if (policyCoverageItem.Selected !== false) {
        //      if (policyCoverageItem.Code === policyCoverageItem.Selected) {
        //        policyCoveragesToSave.push({
        //          CoverageCode: policyCoverage.Code,
        //          TermCode: null,
        //          OptionValue: null
        //        });
        //      } else {
        //        policyCoveragesToSave.push({
        //          CoverageCode: policyCoverageItem.Code,
        //          TermCode: policyCoverageItem.CoverageTerms[0].Code,
        //          OptionValue: policyCoverageItem.Selected
        //        });
        //      }
        //    }
        //  });
        //  var coverageRouteName = this.getCoverageRouteName();
        //  var policyCoverageLink = quoteIntentModel.getLink(coverageRouteName);
        //  if (policyCoverageLink) {
        //    var saveCoveragePolicyPromise = internalAPIDataService.postData(coverageRouteName, policyCoverageLink, policyCoveragesToSave, callGroup);
        //    var deferred = $q.defer();
        //    $q.when(saveCoveragePolicyPromise, function (response) {
        //      deferred.resolve(response.data);
        //    }, function (error) {
        //      deferred.reject(error);
        //    });
        //    return deferred.promise;
        //  } else {
        //    var rejected = $q.defer();
        //    rejected.reject({
        //      message: 'Coverage routeName cannot be found in Links collection'
        //    });
        //    return rejected.promise;
        //  }
        //
        //},
        //
        //setDefaultPolicyCoverages: function (callGroup) {
        //  var coverages = quoteIntentModel.getPolicyCoverages();
        //},
        //
        //populateData: function (data) {
        //  _.extend(this, data);
        //}
      });

      return clazz;
    }
  ];
}

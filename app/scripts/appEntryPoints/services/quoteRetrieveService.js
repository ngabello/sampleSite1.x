/**
 * Created by gabello on 2/12/2015.
 */
function QuoteRetrieveService() {
  'use strict';

  function retrieveQuote(route, params, promise, quoteIntentModel, goApiDataService, localStorageService, sessionKeys, segment, quoteIntentMapper) {

    var retrievePromise = promise.defer();
    goApiDataService.getQuoteIntentData(params).then(function (result) {

        var returnData = {
          PolicyStatus: '',
          PolicyDateValid: false
        };

        //If the policy is bound then do not proceed
      //TODO check if policy is bound and kick it
      //if (result.data.PolicyStatus == 'Bound') {
        //  returnData.PolicyStatus = 'Bound';
        //  retrievePromise.resolve(returnData);
        //  return retrievePromise.promise;
        //}

        // Store QuoteId and QuoteIntentId in session storage. That way, we can easily use it in our logging functions
        localStorageService.set(sessionKeys.quoteIntentId, result.data.id);
        localStorageService.set(sessionKeys.quoteId, result.data.attributes['quote-intent'].Quote.QuoteNumber);

        // initiate a Segment.IO identify tracking event, which in turn sends identifying data to inspectlet
        segment.identify(result.data.id, route);
        //send 'identify' event for bigquery
        segment.identifyEvent('identify');

        quoteIntentMapper.updateQuoteIntent(result);

        //Check PolicyStart date
        var quoteIntentData = quoteIntentModel.getQuoteIntent();

        //fix for FF
        var currentPolicyStartDate = moment(quoteIntentData.Policy.EffectiveDate);
        var diff = moment(currentPolicyStartDate).diff(new Date());
        returnData.PolicyDateValid = diff >= 0;
        retrievePromise.resolve(returnData);
      },
      function (error) {
        retrievePromise.reject(error);
      });

    return retrievePromise.promise;
  }


  return ['$q', 'goApiDataService', 'QuoteIntentModel', 'localStorageService', 'sessionKeys', 'segmentIoTrackingService', 'QuoteIntentMapper',
    function ($q, goApiDataService, quoteIntentModel, localStorageService, sessionKeys, segmentIoTrackingService, quoteIntentMapper) {
      return {

        getSubmission: function (routeName, params) {
          return retrieveQuote(routeName, params, $q, quoteIntentModel, goApiDataService, localStorageService, sessionKeys, segmentIoTrackingService, quoteIntentMapper);
        }
      }
    }
  ];
}

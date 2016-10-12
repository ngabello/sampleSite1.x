/**
 * Created by gabello on 1/14/2016.
 */
'use strict';
function GoDataService() {
  return ['$q', '$log', 'goLangApiService', 'segmentIoTrackingService', 'QuoteIntentModel', 'QuoteIntentMapper', 'LookupDataService',
    function ($q, $log, goLangApiService, segmentIoTrackingService, quoteIntentModel, quoteIntentMapper, lookupDataService) {

      //GET (all)
      //https://ms-quote-intent-ci.qa-pachyderm.com/v1/quote-intents
      //
      //  GET (by id)
      //https://ms-quote-intent-ci.qa-pachyderm.com/v1/quote-intents/<quote_intent_id>
      //
      //  POST (create)
      //https://ms-quote-intent-ci.qa-pachyderm.com/v1/quote-intents
      //{"data":{"attributes":{"quote-intent": {"name":"test name 1","description":"test description 1"}}}}
      //
      //PATCH (update)
      //https://ms-quote-intent-ci.qa-pachyderm.com/v1/quote-intents/71a32c17-1d4c-4a7f-a98e-4a267d3e4ec5
      //{"data":{"attributes":{"quote-intent": {"name":"test name 1 edited #1","description":"test description 1 edited #1", "age":6}}}}

      var timeoutInMilliseconds = 60000;

      this.getTimeout = function () {
        return timeoutInMilliseconds;
      };

      this.saveDocumentData = function () {
        var dataDocument = quoteIntentModel.getDocument();
        var s = segmentIoTrackingService.start();
        var urlCall;
        var newResDeferred = $q.defer();
        var deferred;
        if (!dataDocument.data.id) {
          urlCall = String.format('{0}/{1}', goLangApiService.configuration.baseUrl, 'quote-intents');
          deferred = goLangApiService.one('quote-intents').withHttpConfig({timeout: this.getTimeout()}).post('', dataDocument);
        } else {
          urlCall = String.format('{0}/{1}/{2}', goLangApiService.configuration.baseUrl, 'quote-intents', dataDocument.data.id);
          deferred = goLangApiService.one('quote-intents', dataDocument.data.id).withHttpConfig({timeout: this.getTimeout()}).patch(dataDocument);
        }
        $q.when(deferred, function (result) {
          if (!_.isObject(result.data)) {
            newResDeferred.reject('GoDataService: Saving Document Data failed, response data is null');
            $log.error(String.format('goApiDataService: saveDocumentData - completed calling {0} , response data is null', urlCall), error);
            segmentIoTrackingService.end(s, urlCall, 'error', 'post/patch');
          } else {
            quoteIntentMapper.updateQuoteIntent(result.data);
            newResDeferred.resolve(result);
            segmentIoTrackingService.end(s, urlCall, 'success', 'post/patch');
          }
        }, function (error) {
          newResDeferred.reject(error);
          $log.error(String.format('goApiDataService: saveDocumentData - failed calling {0}', urlCall), error);
          segmentIoTrackingService.end(s, urlCall, 'error', 'post/patch');
        });
        return newResDeferred.promise;
      };

      this.getQuote = function () {
        var goService = this;
        return $q(function (res, rej) {
          goService.postDocument('quotes').then(function (result) {
            //changes between quotes. Used on the Payment page
            var state = quoteIntentModel.getQuoteState();
            var quote = quoteIntentModel.getQuote();
            state.saveQuoteHistory(quote.TotalPremium);
            res(result);
          }, function (error) {
            rej(error)
          })
        });
      };

      this.generateIncidentReport = function () {
        return this.postDocument('incidents');
      };

      this.bindPolicy = function () {
        return this.postDocument('policies');
      };

      this.postDocument = function (route) {
        var dataDocument = quoteIntentModel.getDocument();
        var s = segmentIoTrackingService.start();
        var newResDeferred = $q.defer();
        var urlCall = String.format('{0}/{1}/{2}/{3}', goLangApiService.configuration.baseUrl, 'quote-intents', dataDocument.data.id, route);
        goLangApiService.one('quote-intents', dataDocument.data.id).one(route).withHttpConfig({timeout: this.getTimeout()}).post('', dataDocument).then(function (result) {
            if (!_.isObject(result.data)) {
              newResDeferred.reject('GoDataService: Calling Quote-Intents failed, response data is null');
              $log.error(String.format('goApiDataService: postDocument - completed calling {0} , response data is null', urlCall), error);
              segmentIoTrackingService.end(s, urlCall, 'error', 'post');
            } else {
              quoteIntentMapper.updateQuoteIntent(result.data);
              newResDeferred.resolve(result);
              segmentIoTrackingService.end(s, urlCall, 'success', 'post');
            }
          }, function (error) {
            newResDeferred.reject(error);
            $log.error(String.format('goApiDataService: postDocument - failed calling {0}', urlCall), error);
            segmentIoTrackingService.end(s, urlCall, 'error', 'post');
          }
        );
        return newResDeferred.promise;
      };

      this.getLookups = function () {
        var newResDeferred = $q.defer();
        if (lookupDataService.hasLookups()) {
          newResDeferred.resolve();
          return newResDeferred.promise;
        }
        var s = segmentIoTrackingService.start();
        var urlCall = String.format('{0}/{1}', goLangApiService.configuration.baseUrl, 'lookups');
        goLangApiService.one('lookups').withHttpConfig({timeout: this.getTimeout()}).get().then(function (result) {
            if (!_.isObject(result.data)) {
              newResDeferred.reject('GoDataService: Calling lookups failed, response data is null');
              $log.error(String.format('goApiDataService: getLookups - completed calling {0} , response data is null', urlCall), error);
              segmentIoTrackingService.end(s, urlCall, 'error', 'get');
            } else {
              lookupDataService.saveLookupData(result.data.data);
              newResDeferred.resolve();
              segmentIoTrackingService.end(s, urlCall, 'success', 'post');
            }
          }, function (error) {
            newResDeferred.reject(error);
            $log.error(String.format('goApiDataService: getLookups - failed calling {0}', urlCall), error);
            segmentIoTrackingService.end(s, urlCall, 'error', 'get');
          }
        );
        return newResDeferred.promise;
      };

      this.getQuoteIntentData = function (params) {
        return this.getWithParams('quote-intents', params);
      };

      this.getWithParams = function (route, params) {
        var defered = $q.defer();
        var s = segmentIoTrackingService.start();
        var urlCall = String.format('{0}/{1}/{2}', goLangApiService.configuration.baseUrl, route, params);
        goLangApiService.one(route).withHttpConfig({timeout: this.getTimeout()}).get(params).then(function (result) {
          if (!_.isObject(result.data)) {
            defered.reject('GoDataService: Calling ' + route + 'failed, response data is null');
            $log.error(String.format('goApiDataService: getWithParams - completed calling {0} , response data is null', urlCall), error);
            segmentIoTrackingService.end(s, urlCall, 'error', 'get');
          } else {
            defered.resolve(result.data);
            segmentIoTrackingService.end(s, urlCall, 'success', 'get');
          }
        }, function (error) {
          defered.reject(error);
          $log.error(String.format('goApiDataService: getWithParams - failed calling {0}', urlCall), error);
          segmentIoTrackingService.end(s, urlCall, 'error', 'get');
        });
        return defered.promise;

      }
    }];
}

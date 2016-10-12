/**
 * Created by gabello on 10/29/2014.
 */
function AncillaryApiService() {
    return ['$q', '$log', 'pachydermAncillaryAPIService', 'segmentIoTrackingService', 'environmentLink',
      function ($q, $log, pachydermAncillaryService, segmentIoTrackingService, environmentLink) {

        var timeoutInMilliseconds = 60000;

        this.getTimeout = function () {
          return timeoutInMilliseconds;
        };

        this.checkEligibility = function (quoteIntentId) {
          var newResDeferred = $q.defer();
          $log.debug(String.format('ancillaryAPIDataService: calling get on route {0}/quoteIntent/{1}/eligibility/ancillaries', pachydermAncillaryService.configuration.baseUrl, quoteIntentId));
          var s = segmentIoTrackingService.start();
          pachydermAncillaryService.one('quoteIntent', quoteIntentId).one('eligibility').withHttpConfig({timeout: this.getTimeout()}).getList('ancillaries')
            .then(function (result) {
              newResDeferred.resolve(result);
              segmentIoTrackingService.end(s, environmentLink.ancillaryData, 'success', 'get');
            }, function (error) {
              $log.error(String.format('ancillaryAPIDataService: failed calling get on route {0}/quoteIntent/{1}/eligibility/ancillaries', pachydermAncillaryService.configuration.baseUrl, quoteIntentId));
              newResDeferred.reject(error);
              segmentIoTrackingService.end(s, environmentLink.ancillaryData, 'error', 'get');
            }
          );
          return newResDeferred.promise;
        };

        this.makePayment = function (quoteIntentId, dataObject) {
          var newResDeferred = $q.defer();
          if (!dataObject || !dataObject.FirstName || !dataObject.LastName || !dataObject.CreditCard || !dataObject.CreditCard.Number || !dataObject.CreditCard.ExpirationMonth
            || !dataObject.CreditCard.ExpirationYear || !dataObject.AncillaryPlanId) {
            newResDeferred.reject('Invalid data object to call make-payment');
            return newResDeferred.promise;
          }
          $log.debug(String.format('ancillaryAPIDataService: makePayment - calling post on route {0}/quoteIntent/{1}/products/ancillaries', pachydermAncillaryService.configuration.baseUrl, quoteIntentId));
          var s = segmentIoTrackingService.start();
          pachydermAncillaryService.one('quoteIntent', quoteIntentId).one('products').one('ancillaries').withHttpConfig({timeout: this.getTimeout()}).post('', dataObject)
            .then(function (result) {
              newResDeferred.resolve(result);
              segmentIoTrackingService.end(s, environmentLink.ancillaryData, 'success', 'get');
            }, function (error) {
              newResDeferred.reject(error);
              $log.error(String.format('ancillaryAPIDataService: makePayment - failed calling post on route {0}/quoteIntent/{1}/products/ancillaries', pachydermAncillaryService.configuration.baseUrl, quoteIntentId), error);
              segmentIoTrackingService.end(s, environmentLink.ancillaryData, 'error', 'get');
            }
          );
          return newResDeferred.promise;
        };

        this.postApiData = function (routeName, dataObject) {
          var newResDeferred = $q.defer();
          var url = pachydermAncillaryService.configuration.baseUrl + routeName;
          $log.debug(String.format('ancillaryAPIDataService: calling post on route {0}', url));
          var s = segmentIoTrackingService.start();
          pachydermAncillaryService.oneUrl(routeName, url).withHttpConfig({timeout: this.getTimeout()}).post('', dataObject)
            .then(function (result) {
              newResDeferred.resolve(result);
              segmentIoTrackingService.end(s, url, 'success', 'post');
            }, function (error) {
              $log.error(String.format('ancillaryAPIDataService: failed calling post on route {0} with data {1}', url, JSON.stringify(dataObject)), error);
              newResDeferred.reject(error);
              segmentIoTrackingService.end(s, url, 'error', 'post');
            });
          return newResDeferred.promise;
        };

        this.getApiData = function (routeName) {
          var newResDeferred = $q.defer();
          var url = pachydermAncillaryService.configuration.baseUrl + routeName;
          $log.debug(String.format('ancillaryAPIDataService: calling get on route {0}', url));
          var s = segmentIoTrackingService.start();
          pachydermAncillaryService.oneUrl(routeName, url).withHttpConfig({timeout: this.getTimeout()}).get()
            .then(function (result) {
              newResDeferred.resolve(result);
              segmentIoTrackingService.end(s, url, 'success', 'get');
            }, function (error) {
              $log.error(String.format('ancillaryAPIDataService: failed calling get on route {0}', url), error);
              newResDeferred.reject(error);
              segmentIoTrackingService.end(s, url, 'error', 'get');
            });
          return newResDeferred.promise;
        };

        this.saveChannelSourceData = function(channelData){
          var newResDeferred = $q.defer();
          var url = pachydermAncillaryService.configuration.baseUrl + '/resource/channel-source';
          var s = segmentIoTrackingService.start();
          pachydermAncillaryService.oneUrl('channel-source', url).withHttpConfig({timeout: this.getTimeout()}).post('', channelData)
            .then(function(result){
              newResDeferred.resolve(result);
              segmentIoTrackingService.end(s,url, 'success', 'get');
            }, function (error) {
              $log.error(String.format('ancillaryAPIDataService: failed calling post on route {0} with request {1}', url, JSON.stringify(channelData)), error);
              newResDeferred.reject(error);
              segmentIoTrackingService.end(s,url, 'error', 'get');
            });
          return newResDeferred.promise;
        };

      }];
}

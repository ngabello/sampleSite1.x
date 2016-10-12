/**
 * Created by gabello on 5/27/2015.
 */
function ExternalApiService() {

return ['$q', '$log', 'pachydermExternalAPIService', 'segmentIoTrackingService', 'LeadCloudMapper',
    function ($q, $log, pachydermExternalService, segmentIoTrackingService, leadCloudMapper) {

      var timeoutInMilliseconds = 60000;

      this.getTimeout = function () {
        return timeoutInMilliseconds;
      };

      this.getLeadCloudData = function (rqId) {
        var routeName = 'lead-data';
        var newResDeferred = $q.defer();
        var urlCall = String.format('{0}/{1}/{2}', pachydermExternalService.configuration.baseUrl, routeName, rqId);
        $log.debug(String.format('externalAPIDataService: calling get on route {0}', urlCall));
        var s = segmentIoTrackingService.start();
        pachydermExternalService.one(routeName, rqId).withHttpConfig({timeout: this.getTimeout()}).get()
          .then(function (result) {
            leadCloudMapper.updateQuoteIntent(result);
            newResDeferred.resolve(result);
            segmentIoTrackingService.end(s, urlCall, 'success', 'get');
          }, function (error) {
            $log.debug(String.format('externalAPIDataService: failed calling get on route {0}', urlCall));
            newResDeferred.reject(error);
            segmentIoTrackingService.end(s, urlCall, 'error', 'get');
          });
        return newResDeferred.promise;
      };

    }];
}

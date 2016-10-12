/**
 * Created by gabello on 6/29/2016.
 */
'use strict';
function GoGeoDataService() {
  return ['$q', '$log', 'goGeoDataApiService', 'segmentIoTrackingService', 'environmentLink',
    function ($q, $log, goGeoDataApiService, segmentIoTrackingService, environmentLink) {

      //GET (postal code)
      //https://ms-geo-data-ci.qa-pachyderm.com/v1/postal-codes</23221>
      //
      var timeoutInMilliseconds = 60000;

      this.getTimeout = function () {
        return timeoutInMilliseconds;
      };

      this.getPostalCodeData = function (postalCode) {
        if (postalCode) {
          $log.debug(String.format('goGeoDataApiService: calling postal-codes for postal code {0}', postalCode));
          var s = segmentIoTrackingService.start();
          var newResDeferred = $q.defer();
          goGeoDataApiService.one(postalCode).withHttpConfig({timeout: this.getTimeout()}).get()
            .then(function (result) {
                if (result.data.hasOwnProperty('data') && result.data.data.hasOwnProperty('attributes')) {
                  newResDeferred.resolve(result.data.data.attributes);
                  segmentIoTrackingService.end(s, environmentLink.goGeoDataApi, 'success', 'get');
                } else {
                  newResDeferred.reject('goGeoDataApiService call did not contain data');
                  $log.error(String.format('goGeoDataApiService: getPostalCodeData - failed for postal code {0}, no data returned', postalCode));
                  segmentIoTrackingService.end(s, environmentLink.goGeoDataApi, 'error', 'get');
                }
              }, function (error) {
                newResDeferred.reject('goGeoDataApiService call failed with http status ' + error.status);
                $log.error(String.format('goGeoDataApiService: getPostalCodeData - failed calling geodata-lookup for postal code {0} with http status {1}', postalCode, error.status));
                segmentIoTrackingService.end(s, environmentLink.goGeoDataApi, 'error', 'get');
              }
            );
          return newResDeferred.promise;
        } else {
          var rejected = $q.defer();
          rejected.reject('PostalCode is required for postal code lookup');
          $log.error('goGeoDataApiService: getPostalCodeData - postalCode is required for postal code lookup');
          return rejected.promise;
        }
      }
    }];
}

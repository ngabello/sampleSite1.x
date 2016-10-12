/**
 * Created by gabello on 3/31/2015.
 */
function AddressService() {
  'use strict';

  return ['$q', '$log', 'goGeoDataService', 'ModelHelper', 'QuoteIntentModel',
    function (promiseEng, log, goGeoDataService, modelHelper, quoteIntentModel) {
    return {

      getAddress: function (postalCode, address1) {
        var geoCodeDeferred = promiseEng.defer();
        goGeoDataService.getPostalCodeData(postalCode).then(function (geoAddress) {
          var address = modelHelper.createAddress();
          address.buildAddress(geoAddress, address1);
          geoCodeDeferred.resolve(address);
        }, function (error) {
          geoCodeDeferred.reject(error);
        });

        return geoCodeDeferred.promise;
      },

      clearAddress: function(){
        quoteIntentModel.clearAddress();
      }
    }
  }];
}

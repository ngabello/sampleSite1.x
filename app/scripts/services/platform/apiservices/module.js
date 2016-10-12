/**
 * Created by gabello on 12/14/2015.
 */
'use strict';
angular.module('platform.apiServices', ['restangular', 'environment.config', 'quotes.models', 'quotes.services'])
  .factory('pachydermAncillaryAPIService', ['Restangular', 'environmentLink', function (Restangular, environmentLink) {
      return Restangular.withConfig(function (restangularConfigurer) {
        restangularConfigurer.setBaseUrl(environmentLink.ancillaryData);
        restangularConfigurer.setFullResponse(true);
      });
    }])
  .factory('pachydermExternalAPIService', ['Restangular', 'environmentLink', function (Restangular, environmentLink) {
    return Restangular.withConfig(function (restangularConfigurer) {
      restangularConfigurer.setBaseUrl(environmentLink.externalApi);
      restangularConfigurer.setFullResponse(true);
    });
  }])
  .factory('vinIsoService', ['Restangular', 'environmentLink', function (Restangular, environmentLink) {
    return Restangular.withConfig(function (restangularConfigurer) {
      restangularConfigurer.setFullResponse(true);
      restangularConfigurer.setBaseUrl(environmentLink.vinIsoData);

    });
  }])
  .factory('goLangApiService', ['Restangular', 'environmentLink', function (Restangular, environmentLink) {
    return Restangular.withConfig(function (restangularConfigurer) {
      restangularConfigurer.setFullResponse(true);
      restangularConfigurer.setBaseUrl(environmentLink.goApi);

    });
  }])
  .factory('goGeoDataApiService', ['Restangular', 'environmentLink', function (Restangular, environmentLink) {
    return Restangular.withConfig(function (restangularConfigurer) {
      restangularConfigurer.setFullResponse(true);
      restangularConfigurer.setBaseUrl(environmentLink.goGeoDataApi);

    });
  }])
  .service('ancillaryAPIDataService', AncillaryApiService())
  .service('externalAPIDataService', ExternalApiService())
  .service('vinIsoDataService', VinIsoApiService())
  .service('goApiDataService', GoDataService())
  .service('goGeoDataService', GoGeoDataService())
  ;

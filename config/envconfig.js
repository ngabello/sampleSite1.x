
    'use strict';

    angular.module('environment.config', [])
      .constant('environmentLink', {
        goGeoDataApi: '@@goGeoDataApi',
        ancillaryData: '@@ancillaryData',
        vinIsoData: '@@vinIsoData',
        externalApi: '@@externalApi',
        goApi:'@@goApi',
        cdnBase: '@@cdnBase',
        environment: '@@environment',
        source: "web-quote",
        idleDuration: '@@idleDuration',
        warningDuration: '@@warningDuration'
      })
      .constant('logLevel', {
        level: '@@loggingLevel'
      })
      .constant('googleTracking', {
        googleTrackingId: '@@googleTrackingId'
      })
      .constant('appDynamics', {
        appDynamicsId: '@@appDynamicsId'
      })
      .constant('constDataPrefill',{
        enabled:'@@dataPrefillEnabled'
      })
    ;


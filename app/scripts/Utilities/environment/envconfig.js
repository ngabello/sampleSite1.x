
    'use strict';

    angular.module('environment.config', [])
      .constant('environmentLink', {
        goGeoDataApi: 'https://ms-geo-data-ci.qa-pachyderm.com/v1/postal-codes',
        geoCode: 'https://eaa-ci.qa-pachyderm.com/api/geodata-lookup/ratable-postal-codes',
        ancillaryData: 'https://eaa-ci.qa-pachyderm.com/api',
        vinIsoData: 'https://eaa-ci.qa-pachyderm.com/api/viniso',
        externalApi: 'https://eea-ci.qa-pachyderm.com/api',
        goApi:'https://ms-quote-intent-ci.qa-pachyderm.com/v1',
        //goApi:'https://ms-quote-intent.pachyderm.com/v1',
        //goApi:'http://localhost:4000/v1',
        //goApi:'http://localhost:4000/v1',
        cdnBase: 'https://d3fhhs9p88piuc.cloudfront.net',
        environment: 'ci',
        source: "web-quote",
        idleDuration: '540',
        warningDuration: '30'
      })
      .constant('logLevel', {
        level: 'debug'
      })
      .constant('googleTracking', {
        googleTrackingId: 'UA-58770845-1'
      })
      .constant('appDynamics', {
        appDynamicsId: 'AD-AAB-AAA-CCU'
      })
      .constant('constDataPrefill',{
        enabled:'true'
      })
    ;


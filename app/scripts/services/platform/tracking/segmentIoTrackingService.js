/**
 * Created by gabello on 12/15/2014.
 */
function SegmentIoTrackingService() {
  'use strict';

  return ['$log', 'environmentLink', 'localStorageService', '$location', 'sessionKeys', '$window', 'QuoteIntentModel',
    function ($log, environmentLink, localStorageService, $location, sessionKeys, $window, quoteIntentModel) {
    return {

      start: function () {
        return new Date().getTime();
      },
      end: function (startTime, url, stat, type) {
        var endTime = new Date().getTime();
        try {
          analytics.track('api call', {
            callUrl: url,
            callLength: endTime - startTime,
            status: stat,
            callType: type,
            env: environmentLink.environment,
            quoteNumber: localStorageService.get(sessionKeys.quoteId),
            source: environmentLink.source,
            journey: localStorageService.get(sessionKeys.journey)
          })
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            $log.error('SegmentIoEventService failed with exception', e);
          }
        }
      },
      identify: function(id, entry){
        try {
          analytics.identify(id,
            {
              env: environmentLink.environment,
              quote_number: localStorageService.get(sessionKeys.quoteId),
              web_version: 'mj',
              app_entry_point: entry,
              journey: localStorageService.get(sessionKeys.journey),
              postalCode: !quoteIntentModel.getAddress() ? null : quoteIntentModel.getAddress().PostalCode
            }
          );
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            $log.error('SegmentIoEventService failed with exception', e);
          }
        }
      },
      identifyEvent: function(event, info){
        //picks up query strings after route
        var params = $location.search();
        //picks up query strings before hash and route. this is stupid but quicker than fixing the redirect
        var queryString = function () {
          var e, i, n, r, a = {};
          for (e = $window.location.search.replace(/[\/\\#,+()$~%.'":*?<>{}]/g,'').split("&"), n = 0, r = e.length; r > n; n++)i = e[n].split("="), a[i[0]] = i[1];
          return a
        }();

        var data = [
          {key: 'utm_source', value: queryString['utm_source'] || params['utm_source']},
          {key: 'utm_medium', value: queryString['utm_medium'] || params['utm_medium']},
          {key: 'utm_term', value: queryString['utm_term'] || params['utm_term']},
          {key: 'utm_content', value: queryString['utm_content'] || params['utm_content']},
          {key: 'utm_campaign', value: queryString['utm_campaign'] || params['utm_campaign']}
        ];
        // params from compare and google
        params['account'] ? data.push({key: 'account', value: params['account']}) : false;
        params['job'] ? data.push({key: 'job', value: params['job']}) : false;
        // join data with extra stuff if passed
        data = info ? data.concat(info) : data;
        try {
          analytics.track(event,
            {
              data: data,
              env: environmentLink.environment,
              quoteNumber: localStorageService.get(sessionKeys.quoteId),
              source: environmentLink.source,
              journey: localStorageService.get(sessionKeys.journey),
              postalCode: !quoteIntentModel.getAddress() ? null : quoteIntentModel.getAddress().PostalCode
            }
          );
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            $log.error('SegmentIoEventService failed with exception', e);
          }
        }
      },
      trackCustomEvent: function (event, eventData, dataLayer) {
        try {
          analytics.track(event, {
            eventData: dataLayer,
            data: eventData,
            env: environmentLink.environment,
            quoteNumber: localStorageService.get(sessionKeys.quoteId),
            source: environmentLink.source,
            journey: localStorageService.get(sessionKeys.journey),
            postalCode: !quoteIntentModel.getAddress() ? null : quoteIntentModel.getAddress().PostalCode
          })
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            $log.error('SegmentIoEventService failed with exception', e);
          }
        }
      },
      trackValidationEvent: function (event, passed, eventData) {
        try {
          analytics.track(event, {
            passed: passed,
            eventData: eventData,
            env: environmentLink.environment,
            quoteNumber: localStorageService.get(sessionKeys.quoteId),
            source: environmentLink.source,
            journey: localStorageService.get(sessionKeys.journey),
            postalCode: !quoteIntentModel.getAddress() ? null : quoteIntentModel.getAddress().PostalCode
          })
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            $log.error('SegmentIoEventService failed with exception', e);
          }
        }
      },

      trackGeneralEvent: function (event, eventData) {
        try {
          analytics.track(event, {
            eventData: eventData,
            env: environmentLink.environment,
            quoteNumber: localStorageService.get(sessionKeys.quoteId),
            source: environmentLink.source,
            journey: localStorageService.get(sessionKeys.journey),
            postalCode: !quoteIntentModel.getAddress() ? null : quoteIntentModel.getAddress().PostalCode
          })
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            $log.error('SegmentIoEventService failed with exception', e);
          }
        }
      },

      trackPage: function(){
        try {
          var path = $location.path();
          analytics.page(path, {
            data: [{
              key: 'postalCode',
              value: !quoteIntentModel.getAddress() ? null : quoteIntentModel.getAddress().PostalCode
            }],
            path: path,
            //url:           $location.absUrl(), // TODO: why doesn't this work in Chrome? It's the preferred approach
            url: window.location.toString(),
            env: environmentLink.environment,
            quoteNumber: localStorageService.get(sessionKeys.quoteId),
            previousView: localStorageService.get(sessionKeys.previousView),
            source: environmentLink.source,
            journey: localStorageService.get(sessionKeys.journey),
            postalCode: !quoteIntentModel.getAddress() ? null : quoteIntentModel.getAddress().PostalCode
          });

          // set the previousView to path in order
          // to log previous view with each page view
          //document.cookie = 'previousView=' + path;
          localStorageService.set(sessionKeys.previousView, path);
          //window.sessionStorage.previousView = path;
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            throw('SegmentIO registerPageTrack call failed');
          }
        }
      }
    };
  }];
}

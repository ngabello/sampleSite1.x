/**
 * Created by jholloman on 4/5/2016.
 */
'use strict';
function GeneralTrackingService() {
  return ['ChannelSourceModel', 'sessionKeys', 'localStorageService', 'optimizelyTrackingService',
    'appdynamicsTrackingService', 'qualarooTrackingService', '$log', 'gaTrackingService', 'QuoteIntentModel', 'segmentIoTrackingService', '$location', 'convertTrackingService',
    function (channelSourceModel, sessionKeys, localStorageService, optimizelyTrackingService, appdynamicsTrackingService, qualarooTrackingService,
              $log, gaTrackingService, quoteIntentModel, segmentIoTrackingService, $location, convertTrackingService) {
      return {
        init: function (entry) {
          //setup for tracking stuff
          this.setQuoteNumber(quoteIntentModel.getQuoteNumber());
          segmentIoTrackingService.identify(null, entry);
        },
        setChannel: function (event, i, it, v, mc, vlt) {
          var cs = new channelSourceModel();
          cs.createChannelSource(event, i, it, v, mc, vlt);
          return cs.saveChannelSourceData();
        },
        getQuoteNumber: function () {
          return localStorageService.get(sessionKeys.quoteId);
        },
        setQuoteNumber: function (qn) {
          if (qn) {
            localStorageService.set(sessionKeys.quoteId, qn);
          }
        },
        trackPage: function (to) {
          switch (to.name) {
            case 'leadLanding':
            case 'postalLanding':
            case 'brokerLanding':
            case 'compareNowLanding':
            case 'quoteRetrieve':
              gaTrackingService.trackSource($log, $location, quoteIntentModel, segmentIoTrackingService);
              break;
            default:
              segmentIoTrackingService.trackPage();
              break;
          }
          optimizelyTrackingService.trackPage($log, localStorageService);
          //convertTrackingService.trackPage($log, localStorageService);
          appdynamicsTrackingService.track();
          qualarooTrackingService.trigger();
        },
        trackAttempts: function (item) {
          var quoteState = quoteIntentModel.getQuoteState();
          quoteState[item]++;
          quoteState.saveQuoteState();
        },
        trackEvent: function (event, array){
          segmentIoTrackingService.trackCustomEvent(event, array)
        }
      }
    }]
}

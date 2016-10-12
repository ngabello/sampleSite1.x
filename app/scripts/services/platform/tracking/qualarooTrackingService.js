/**
 * Created by jholloman on 1/15/2016.
 */
function QualarooTrackingService(){
  'use strict';
  return ['localStorageService', 'sessionKeys', function(localStorageService, sessionKeys){
    return{
      trigger: function(){
        var quoteNum = localStorageService.get(sessionKeys.quoteId);
        if(quoteNum){
          window._kiq.push(['identify', quoteNum])
        }
        window._kiq.push(['stopNudge']);
        window._kiq.push(['selectNudge']);
      }
    }
  }]
}

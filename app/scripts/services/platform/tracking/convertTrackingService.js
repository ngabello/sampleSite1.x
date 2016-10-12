/**
 * Created by jholloman on 6/29/2016.
 */
function ConvertTrackingService(){
  'use strict';
  return ['$window', '$location', function ($window, $location) {
    return {
      trackPage: function ($log, localStorageService) {
        try {
          if(_conv_q){
            _conv_q = _conv_q || [];
            _conv_q.push(["run","true"]);
          }
        } catch (e) {
          if (!(e instanceof ReferenceError)) {
            $log.error('ConvertTrackingService failed with exeception', e);
          }
        }
      },
      setJourney: function(){
        //setup and bucketing for convert
        //right now just check the journey id
        return $location.search().quotesJourneyId || $window.quotesJourneyId || 'classicJourney';
      }
    }
  }]
}

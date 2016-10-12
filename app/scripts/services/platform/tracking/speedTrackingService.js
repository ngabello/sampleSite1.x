/**
 * Created by jholloman on 5/26/2015.
 * track general connection speed
 */
'use strict';
function speedTrackingService(){
  return ['segmentIoTrackingService', function(segmentIoTrackingService){
    return {
      trackSpeed: function () {
        var startTime = new Date().getTime();
        var imageSize = 511958 * 8;

        //cache busting. may not work for cdn stuff though
        $.get('images/traffic-stop.jpg?tm=' + startTime)
          .success(function(){
            var endTime = new Date().getTime();
            var duration = (endTime - startTime) / 1000;
            var kbps = ((imageSize / duration) / 1024).toFixed(2);
            segmentIoTrackingService.trackCustomEvent('speed test', [{key: 'kbps', value: 'kbps'}])
          })
          .fail(function(){
            console.log('speed test failed')
          })
      }
    }
  }]
}

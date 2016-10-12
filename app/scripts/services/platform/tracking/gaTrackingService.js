/**
 * Created by jholloman on 3/20/2015.
 */
'use strict';
function gaTrackingService(){
  return function(){
    return{
      trackSource: function($log, $location, dataService, segment){
        var params = $location.search();
        var source = params.utm_source;
        var medium = params.utm_medium;
        var campaign = params.utm_campaign;
        var content = params.utm_content;
        if(content){
          dataService.saveAncillaryParam(content);
        }
        analytics.ready(function() {
          if (window.ga) {
            if (source) ga('set', 'campaignSource', source);
            if (medium) ga('set', 'campaignMedium', medium);
            if (campaign) ga('set', 'campaignName', campaign);
            if (content) ga('set', 'campaignContent', content);
          }
          //set ga then track page
          segment.trackPage();
        });
      }
    }
  }
}

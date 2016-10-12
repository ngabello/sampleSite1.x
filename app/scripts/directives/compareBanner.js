/**
 * Created by jholloman on 3/15/2016.
 */
'use strict';
function CompareBanner(){
  return ['environmentLink', 'segmentIoTrackingService', function(environmentLink, segmentIoTrackingService){
    return{
      template: '<div ng-click="compareBannerEvent()"><a ng-href="{{ compareBannerSummary.href }}" target="_blank"><img id="compareBanner-dt" style="width: 100%;" ng-src="{{ compareBannerSummary.src1 }}"/>' +
      '<img id="compareBanner-mb" style="width: 100%;" ng-src="{{ compareBannerSummary.src2 }}"></a></div>',
      controller: ['$scope', 'QuoteIntentModel', function($scope, quoteIntentModel){
        var address = quoteIntentModel.getAddress();
        //quote.scss controls which image is displayed via screen size
        $scope.compareBannerSummary = {
          href: String.format('https://motor.compare.com/Motor/Index?zipcode={0}&utm_source=pachyderm&utm_medium=leadgen&utm_campaign={1}', address.PostalCode, address.State),
          src1: environmentLink.cdnBase + '/images/compareBanner-desktop.jpg',
          src2: environmentLink.cdnBase + '/images/compareBanner-mobile.jpg'
        };
        $scope.compareBannerEvent = function(){
          return segmentIoTrackingService.trackCustomEvent('clicked-compareBanner')
        }
      }]
    }
  }]
}

/**
 * Created by jholloman on 8/28/2015.
 */
'use strict';
function EverQuote(){
  return ['environmentLink', 'segmentIoTrackingService', function(environmentLink, segmentIoTrackingService){
    return{
      template: '<div ng-click="everquoteEvent()"><a ng-href="{{ everQuoteSummary.href }}" target="_blank"><img id="everQuote-dt" style="width: 100%;" ng-src="{{ everQuoteSummary.src1 }}"/>' +
      '<img id="everQuote-mb" style="width: 100%;" ng-src="{{ everQuoteSummary.src2 }}"></a></div>',
      controller: ['$scope', 'QuoteIntentModel', function($scope, quoteIntentModel){
        var zip = quoteIntentModel.getAddressByType('Physical').PostalCode;
        //quote.scss controls which image is displayed via screen size
        $scope.everQuoteSummary = {
          href: 'https://everquote.com/auto_policies?id=594&subid=b&zip_code=' + zip,
          src1: environmentLink.cdnBase + '/images/everQuote-desktop.jpg',
          src2: environmentLink.cdnBase + '/images/everQuote-mobile.jpg'
        }
        $scope.everquoteEvent = function(){
          return segmentIoTrackingService.trackCustomEvent('clicked-everquote')
        }
      }]
    }
  }]
}

/**
 * Created by gabello on 8/10/2016.
 */
function BreadCrumbs() {
  'use strict';
  return ['$log', 'JourneyService', '$location', '$state', function ($log, journeyService, $location, $state) {
    return {
      restrict: 'A',
      templateUrl: '../scripts/directives/views/bread-crumbs.tpl.html',
      link: function (scope, element, attributes) {
        var pages = journeyService.getAllStates();
        var urlPath = $location.path();
        var items = urlPath.split('/');
        if (items.length > 2) {
          var index = urlPath.lastIndexOf("/");
          var currentPath = urlPath.substring(0, index + 1);
        } else {
          currentPath = urlPath;
        }
        var currentRoute = _.findWhere(pages, {pageUrl: currentPath});
        if(!currentRoute){
          $log.error(String.format('BreadCrumbs: could not find currentRoute for path', currentPath));
        }
        var sortedBreadCrumbItems =  _.sortBy(currentRoute.breadCrumbs, function(item) {return item.Order} );
        if(!sortedBreadCrumbItems){
          $log.error(String.format('BreadCrumbs: could not find any BreadCrumbItems for path', currentPath));
        }
        scope.breadCrumbItems = sortedBreadCrumbItems;
      }
    };
  }]
}


/**
 * Created by vyom.sharma on 14-06-2016.
 */


function breadcrumbCtrl(){
  return ['$scope', 'JourneyService', '$location', '$state', function ($scope, journeyService, $location, $state) {
    var pages = journeyService.getAllStates();
    var crumb = [];
    var next = {};
    var start = _.where(pages, {startPage: true})[0];

    $scope.breadcrumbs = crumb;
    $scope.location = $location.path();


    crumb.push({breadCrumb: start.breadCrumb, pageUrl: start.pageUrl, pageName: start.pageName, visited: true});

    //iterate through and make our crumb list
    _.forEach(pages, function (list) {
      var currentConditions = (start.conditions.length > 0) ? start.conditions[0].nextPage : false;
      var nextConditions = (list.conditions.length > 0) ? list.conditions[0].nextPage : false;

      if (!next.length) {
        if (list.pageName == start.nextPage || currentConditions) {

          crumb.push({
            breadCrumb: list.breadCrumb,
            pageUrl: list.pageUrl,
            pageName: list.pageName,
            visited: false,
            breadCrumbBeforeQuote: list.breadCrumbBeforeQuote
          });

        }
      } else if (list.pageName == next) {

        crumb.push({
          breadCrumb: list.breadCrumb,
          pageUrl: list.pageUrl,
          pageName: list.pageName,
          visited: false,
          breadCrumbBeforeQuote: list.breadCrumbBeforeQuote
        });

      }
      next = list.nextPage || nextConditions;
    });


    var urlPath = $location.path();
    var items = urlPath.split('/');

    if (items.length > 2) {
      var index = urlPath.lastIndexOf("/");
      var currentPath = urlPath.substring(0, index + 1);
    } else {
      currentPath = urlPath;
    }
    $scope.currentCrumb = _.findWhere(crumb, {pageUrl: currentPath});
    $scope.location = currentPath;


    //update location and stuff
    //$scope.$on('$locationChangeSuccess', function(oldValue, newValue){
    //  console.log('hey');
    //  update();
    //  $scope.position = _.indexOf(crumb, $scope.currentCrumb);
    //});

  }]

}


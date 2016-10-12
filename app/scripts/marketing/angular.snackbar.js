(function (angular) {
  "use strict";

  var module = angular.module("angular.snackbar", ['timer']);

  //snackbar service
  module.factory("snackbar", ['$rootScope', function ($rootScope) {
    return {
      createWithTimeout: function (content, duration) {

        $rootScope.$broadcast('createSnackbarWithTimeout', {
          'content': content,
          'duration': duration
        });
      },
      create: function (content, id) {
        $rootScope.$broadcast('createSnackbar', {
          'content': content,
          'id': id
        });
      },
      remove: function (id) {
        $rootScope.$broadcast('removeSnackbar', {
          'id': id
        });
      }
    }
  }]);

  //snackbar directive


  var testConnectivity = function ($http, $q) {
    var deferred = $q.defer();
    $http.get("http://d5prcm06amy2t.cloudfront.net/cms/home+page+images/autoicon50.png").then(function (response) {
      deferred.resolve(true);
    }, function (response) {
      deferred.reject(false);
    });
    return deferred.promise;
  };


  module.directive("snackbar", ["$rootScope", "$compile", "$timeout", 'snackbar', 'goApiDataService', '$q', function ($rootScope, $compile, $timeout, snackbar, goApiDataService, $q) {
    function Controller($scope, snackbar, $http) {
      $scope.retryConnection = function (id) {
        var snackInstance = snackbar;
        $scope.$broadcast('timer-stop');
        $scope.$broadcast('timer-reset');
        goApiDataService.saveDocumentData().then(function () {
            snackInstance.remove(id);
          },
          function (error) {
            $scope.$broadcast('timer-start');
          });
      };

      $scope.timerFinished = function (id) {
        var snackInstance = snackbar;
        $scope.$broadcast('timer-stop');
        $scope.$broadcast('timer-reset');
        goApiDataService.saveDocumentData().then(function () {
            snackInstance.remove(id);
          },
          function (error) {
            $scope.$broadcast('timer-start');
          });
      };
    }

    function link(scope, element, attrs) {
      //snackbar container
      var snackbarContainer = angular.element(element);
      //snackbar duration time (ms)
      var snackbarDuration = attrs.snackbarDuration || 3000;
      //delay time to remove from DOM after hide (ms)
      var snackbarRemoveDelay = attrs.snackbarRemoveDelay || 20;
      //receive broadcating
      $rootScope.$on('createSnackbarWithTimeout', function (event, received) {
        //snackbar template
        var template = "<div class=\"snackbar snackbar-opened\"><span class=\"snackbar-content\">" + received.content + "</span></div>";
        //template compile
        var snackbar = angular.element($compile(template)(scope));
        //add snackbar
        snackbarContainer.append(snackbar);
        //snackbar duration time
        $timeout(function () {
          //hide snackbar
          snackbar.removeClass("snackbar-opened");
          //remove snackbar
          $timeout(function () {
            snackbar.remove();
          }, snackbarRemoveDelay, false);
        }, received.duration || snackbarDuration, false);
      });
      $rootScope.$on('createSnackbar', function (event, received) {
        var snackbar = angular.element(snackbarContainer[0].getElementsByClassName('snackbar-id-' + received.id));
        if (!snackbar || snackbar.length == 0) {
          //snackbar template
          var template = "<div id=\"connection-bar\" class=\"snackbar snackbar-opened snackbar-id-" + received.id + "\">" +
            "<span class=\"snackbar-content\">" +
            "Lost network connection. Trying to connect again in " +
            "<timer countdown=\"15\" interval=\"1000\" finish-callback=\"timerFinished( " + received.id + ")\">{{seconds}}</timer>  seconds. <button class=\"btn btn-primary\" ng-click=\"retryConnection(" + received.id + ")\">Retry now</button>" +
            " or Call 1-877-321-9911 to continue with a sales agent.</span>" +
            "</div>";
          //template compile
          var snackbar = angular.element($compile(template)(scope));
          //add snackbar
          snackbarContainer.append(snackbar);
        }
      });
      $rootScope.$on('removeSnackbar', function (event, received) {
        var snackbar = angular.element(snackbarContainer[0].getElementsByClassName('snackbar-id-' + received.id));
        //hide snackbar
        snackbar.removeClass("snackbar-opened");
        //remove snackbar
        snackbar.remove();
      });
    };
    return ({
      controller: Controller,
      link: link
    });
  }]);

})(angular);

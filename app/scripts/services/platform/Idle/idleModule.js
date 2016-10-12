/**
 * Created by gabello on 11/14/2014.
 */
angular.module('idle-timeout', [])
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {



    $scope.ok = function () {
      $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
});

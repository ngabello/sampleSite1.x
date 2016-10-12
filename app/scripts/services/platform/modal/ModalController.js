/**
 * Created by gabello on 12/5/2014.
 */

angular.module('platform.modal')
  .controller('modalController',
  ['$scope', '$uibModalInstance', 'model', '$location', '$document', '$rootScope', 'QuoteIntentModel',
    function ($scope, $uibModalInstance, model, $location, $document, $rootScope, quoteIntentModel) {

      $scope.title = model.title;
      $scope.message = model.message;
      $scope.image = model.image;
      $scope.description = model.description;
      $scope.iconClass = model.iconClass;
      $scope.showCancelBtn = model.showCancelBtn;
      $scope.cancelBtnLabel = model.cancelBtnLabel;
      $scope.zipCode = model.zipCode;
      $scope.page = model.page;
      $scope.passingObject = model.passingObject;


      var trackModalClose = function(){
        analytics.track('errorModalClose', {
          'quoteID': quoteIntentModel.getQuoteIntentId(),
          'url': $location.absUrl()
        });
      };

      //close modal when you navigate away
      $rootScope.$on('$locationChangeStart',function(){
        trackModalClose();
        $uibModalInstance.close();
      });
      $scope.coverageContinue = function(selection){
        var addCoverage = {};
        if(selection){
          $scope.$emit('coverageWarning', addCoverage, $scope.passingObject);
          $uibModalInstance.close();
        }else{
          $scope.$emit('coverageWarning', addCoverage = false, $scope.passingObject);
          $uibModalInstance.close();
        }

      };

      $scope.continue = function () {
        $location.path('/postal-code');
        $uibModalInstance.close();
      };
      $scope.ok = function(){
        trackModalClose();
        $uibModalInstance.close();
      };
      $scope.cancel = function(){
        trackModalClose();
        $uibModalInstance.close();
      };
      $scope.retrieve = function () {
        $location.path('/quote-retrieve');
        $uibModalInstance.close();
      };

    }
  ])
  .controller('dmsController',
  ['$scope', '$uibModalInstance', 'model', '$location', '$document', '$rootScope', 'QuoteIntentModel', 'radioChoices',
    function ($scope, $uibModalInstance, model, $location, $document, $rootScope, quoteIntentModel, radioChoices) {

      $scope.dmsSummary = {
        title: model.title,
        message: model.message,
        image: model.image,
        description: model.description,
        iconClass: model.iconClass,
        showCancelBtn: model.showCancelBtn,
        cancelBtnLabel: model.cancelBtnLabel,
        zipCode: model.zipCode,
        page: model.page,
        passingObject: model.passingObject,
        yesNo: radioChoices.yesNo
      };
      //DMS functions
      $scope.acceptedCollection = [];
      //$scope.updateAccepted = function(vehicle){
      //  vehicle.checkbox = !vehicle.checkbox;
      //  if(vehicle.answer = 'Yes'){
      //    $scope.acceptedCollection.push(vehicle);
      //  }else {
      //    if ($scope.acceptedCollection[$scope.acceptedCollection.indexOf(vehicle)]) {
      //      $scope.acceptedCollection.splice($scope.acceptedCollection.indexOf(vehicle), 1);
      //    }
      //  }
      //};
      $scope.updateVehicles = function(){

        _.each(_.where($scope.dmsSummary.passingObject, {answer: 'Yes'}), function(item){
          quoteIntentModel.updateVehicle(item.currentVehicle.ID, item.dmsVehicle.Vin, item.dmsVehicle.ModelName, item.dmsVehicle.ModelId, item.dmsVehicle.ModelYear);
        });
        $rootScope.$broadcast('vehicles updated');
        return $uibModalInstance.close();
      };
      $scope.keepAndContinue = function(){
        $uibModalInstance.close();
      };

    }])
  .controller('systemErrorController',
    ['$scope', '$uibModalInstance', 'params', '$location', '$rootScope', 'QuoteIntentModel', 'pachydermContactInfo',
      function ($scope, $uibModalInstance, params, $location, $rootScope, quoteIntentModel, contactInfo) {

        $scope.error = params.error;
        $scope.contactInfo = contactInfo;

        var trackModalClose = function(){
          analytics.track('systemErrorModalClose', {
            'quoteID': quoteIntentModel.getQuoteIntentId(),
            'url': $location.absUrl()
          });
        };

        //close modal when you navigate away
        $rootScope.$on('$locationChangeStart',function(){
          trackModalClose();
          $uibModalInstance.close();
        });

        $scope.continue = function () {
          trackModalClose();
          $uibModalInstance.close();
        };

        $scope.callUs = function(){
          $uibModalInstance.close();
        };

        $scope.cancel = function(){
          trackModalClose();
          $uibModalInstance.close();
        };
      }
    ])
;

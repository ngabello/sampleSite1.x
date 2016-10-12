/**
 * Created by jholloman on 1/5/2016.
 */
function VehicleModel() {
  return function () {
    var model = 'vehicle';
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group" uib-collapse="state.vehicleModels == null || state.vehicleModels.length === 0"' +
        'ng-class="{true: \'has-error\'}[state.formSubmitted && form.vehicleModel.$invalid]">' +
        '<label class="control-label form-left">' +
          '<span>Model</span>' +
        '</label>' +

        '<div ng-messages="form.vehicleModel.$error" ng-if="state.formSubmitted">' +
          '<div ng-message="required">Please enter vehicle model.</div>' +
        '</div>' +

        '<select id="vehicleModel" class="form-control form-right" name="vehicleModel"' +
          'ng-model="state.vehicle.ModelID"' +
          'ng-disabled="state.vehicleModels.length === 0"' +
          'ng-options="vehicleModels.ModelId as vehicleModels.Links[0].Rel for vehicleModels in state.vehicleModels"' +
          'ng-change="getVinIsoBodyStyles(state.vehicle.ModelID)"' +
          'required>' +
          '<option value="">Select</option>' +
        '</select>' +
      '</div>',
      controller: ['$scope', 'VehicleService', function($scope, vehicleService){
        $scope.getVinIsoBodyStyles = function (modelId) {
          $scope.state.vehicleBodyStyles = [];
          $scope.state.vehicle.YearStyleID = null;
          $scope.state.vehicle.Vin = null;
          if (!modelId) {
            return;
          }
          var modelObj = _.findWhere($scope.state.vehicleModels, {ModelId: modelId});
          if (modelObj) {
            $scope.state.vehicle.ShortModelName = modelObj.ShortModelName;
            $scope.state.vehicle.Model = modelObj.Links[0].Rel;
            vehicleService.fillOtherStuff(modelObj.Links[0].Href).then(function (bodyStyles) {
              $scope.state.vehicleBodyStyles = bodyStyles;
              if ($scope.state.vehicleBodyStyles && $scope.state.vehicleBodyStyles.length == 1) {
                $scope.state.vehicle.Style = $scope.state.vehicleBodyStyles[0].Links[0].Rel;
                $scope.state.vehicle.YearStyleID = $scope.state.vehicleBodyStyles[0].YearStyleId;
              }
            });
          }
        };
      }]
    }
  }
}

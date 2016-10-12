/**
 * Created by jholloman on 1/5/2016.
 */
function VehicleMake() {
  return function () {
    var model = 'vehicle';
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group" uib-collapse="state.vehicleMakes == null || state.vehicleMakes.length === 0"' +
        'ng-class="{true: \'has-error\'}[state.formSubmitted && vehicleForm.vehicleMake.$invalid]">' +
        '<label class="control-label form-left">' +
          '<span>Make</span>' +
        '</label>' +
        '<div ng-messages="form.vehicleMake.$error" ng-if="state.formSubmitted">' +
          '<div ng-message="required">Please enter vehicle make.</div>' +
        '</div>' +
        '<select id="vehicleMake" class="form-control form-right" name="vehicleMake"' +
          'ng-model="state.vehicle.MakeID"' +
          'ng-disabled="vehicleMakes.length === 0"' +
          'ng-change="getVinIsoModels(state.vehicle.MakeID)"' +
          'ng-options="vehicleMake.MakeId as vehicleMake.Links[0].Rel for vehicleMake in state.vehicleMakes"' +
          'required>' +
          '<option value="">Select</option>' +
        '</select>' +
      '</div>',
      controller: ['$scope', 'VehicleService', function($scope, vehicleService){
        $scope.getVinIsoModels = function (makeId) {
          $scope.state.vehicleModels = [];
          $scope.state.vehicleBodyStyles = [];
          $scope.state.vehicle.Model = null;
          $scope.state.vehicle.ModelID = null;
          $scope.state.vehicle.YearStyleID = null;
          $scope.state.vehicle.Vin = null;
          if (!makeId) {
            return;
          }
          var makeObj = _.findWhere($scope.state.vehicleMakes, {MakeId: makeId});
          if (makeObj) {
            $scope.state.vehicle.Make = makeObj.Links[0].Rel;
            $scope.state.vehicle.ModelID = null;
            $scope.state.vehicle.YearStyleID = null;
            vehicleService.fillOtherStuff(makeObj.Links[0].Href).then(function (vehicleModels) {
              $scope.state.vehicleModels = vehicleModels;
            });
          }
        };
      }]
    }
  }
}

/**
 * Created by jholloman on 1/5/2016.
 */
function VehicleBodyStyle() {
  return function () {
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group" uib-collapse="(state.vehicleBodyStyles == null || state.vehicleBodyStyles.length === 0) || state.vehicleBodyStyles.length > 1"' +
      'ng-class="{true: \'has-error\'}[state.formSubmitted && form.vehicleBodyStyle.$invalid]">' +
      '<label class="control-label form-left">' +
        '<span>Body Style</span>' +
      '</label>' +

      '<div ng-if="state.vehicleBodyStyles.length == 1">' +
      '<div class="control-label form-right">{{ state.vehicle.Style }}</div>' +
      '</div>' +

        '</div>'+
      '<div class="form-group" uib-collapse="state.vehicleBodyStyles == null || state.vehicleBodyStyles.length < 2" ' +
      'ng-class="{true: \'has-error\'}[state.formSubmitted && form.vehicleBodyStyle.$invalid]">' +
      '<label class="control-label form-left">' +
      '<span>Body Style</span>' +
      '</label>' +
      '<div ng-messages="form.vehicleBodyStyle.$error" ng-if="state.formSubmitted">' +
      '<div ng-message="required">Please enter vehicle body style.</div>' +
      '</div>' +
      '<select id="vehicleBodyStyle" class="form-control form-right" name="vehicleBodyStyle"' +
      'ng-model="state.vehicle.YearStyleID"' +
      'ng-disabled="state.vehicleBodyStyles.length === 0"' +
      'ng-options="vehicleBodyStyle.YearStyleId as vehicleBodyStyle.Links[0].Rel for vehicleBodyStyle in state.vehicleBodyStyles"' +
      'ng-change="saveVinIsoBodyStyle(state.vehicle.YearStyleID)"' +
      'required>' +
      '<option value="">Select</option>' +
      '</select>' +
      '</div>',
      controller: ['$scope', function($scope){
        $scope.saveVinIsoBodyStyle = function (bodyStyleId) {
          if (!bodyStyleId) {
            return;
          }
          var bodyStyleObj = _.findWhere($scope.state.vehicleBodyStyles, {YearStyleId: bodyStyleId});
          if (bodyStyleObj) {
            $scope.state.vehicle.Style = bodyStyleObj.Links[0].Rel;
            $scope.state.vehicle.YearStyleID = bodyStyleObj.YearStyleId;
          }
        };
      }]
    }
  }
}


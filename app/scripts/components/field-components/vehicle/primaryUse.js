/**
 * Created by jholloman on 1/7/2016.
 */
function PrimaryUse() {
  return function () {
    var model = 'vehicle';
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group" ng-class="{true: \'has-error\'}[state.formSubmitted && form.vehicleUsage.$invalid]">' +
      '<label class="control-label form-left">' +
      '<span>Primary use</span>' +
      '</label>' +

      '<div ng-messages="form.vehicleUsage.$error" ng-if="state.formSubmitted">' +
      '<div ng-message="required">Please choose vehicle use.</div>' +
      '</div>' +
      '<select id="vehicleUsage" class="form-control form-right" name="vehicleUsage" ng-model="state.vehicle.PrimaryUse"' +
      'ng-options="a.Value as a.Desc for a in vehicleUsageOptionList" required>' +
      '<option value="">Select</option>' +
      '</select>' +
      '</div>',
      controller: ['$scope', 'LookupDataService', function($scope, lookupDataService){
        $scope.vehicleUsageOptionList = lookupDataService.getVehicleUsageCodeLookups();
      }]
    }

  }
}

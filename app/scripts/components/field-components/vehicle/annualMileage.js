/**
 * Created by jholloman on 1/7/2016.
 */
'use strict';
function AnnualMileage() {
  return function () {
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group"' +
      'ng-class="{true: \'has-error\'}[state.formSubmitted && form.vehicleEstMileage.$invalid]">' +
      '<label class="control-label form-left">' +
      '<span>Annual mileage</span>' +
      '</label>' +

      '<div ng-messages="form.vehicleEstMileage.$error" ng-if="state.formSubmitted">' +
      '<div ng-message="required">Please choose annual mileage.</div>' +
      '</div>' +
      '<select id="vehicleEstMileage" class="form-control form-right" name="vehicleEstMileage"' +
      'ng-model="state.vehicle.EstimatedAnnualMileage"' +
      'ng-options="a.Value as a.Desc for a in mileageOptions" required>' +
      '<option value="">Select</option>' +
      '</select>' +
      '</div>',
      controller: ['$scope', 'LookupDataService', function($scope, lookupDataService){
        $scope.mileageOptions = lookupDataService.getVehicleMileageOptions();
      }]
    }

  }
}

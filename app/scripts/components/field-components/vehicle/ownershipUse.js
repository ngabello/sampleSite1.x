/**
 * Created by jholloman on 1/7/2016.
 */
'use strict';
function OwnershipUse() {
  return function () {
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group"' +
      'ng-class="{true: \'has-error\'}[state.formSubmitted && form.vehicleOwnership.$invalid]">' +
      '<label class="control-label form-left">' +
      '<span>Ownership</span>' +
      '</label>' +

      '<div ng-messages="form.vehicleOwnership.$error" ng-if="state.formSubmitted">' +
      '<div ng-message="required">Please choose vehicle ownership.</div>' +
      '</div>' +
      '<select ' +
      'popover="In order to add a vehicle to an Elephant policy, you or your spouse need to own, co-own, finance or lease the vehicle."' +
      'popover-placement="top" popover-append-to-body="true" popover-trigger="mouseenter"' +
      'id="vehicleOwnership" class="form-control form-right" name="vehicleOwnership" ng-model="state.vehicle.Ownership"' +
      'ng-options="a.Value as a.Desc for a in ownerShipList" required>' +
      '<option value="">Select</option>' +
      '</select>' +
      '</div>' +
      '<div class="help-block"><small>In order to add a vehicle to an Elephant policy, you or your spouse need to own, co-own, finance or lease the vehicle.</small></div>',
      controller: ['$scope', 'LookupDataService', function($scope, lookupDataService){
        $scope.ownerShipList = lookupDataService.getVehicleOwnershipOptions();
      }]
    }

  }
}

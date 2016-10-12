/**
 * Created by jholloman on 1/8/2016.
 */
'use strict';
function PrimaryDriver() {
  return {
    bindings: {
      form: '=',
      state: '=',
      ngModel: '=',
      show: '<'
    },
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.vehiclePrimaryDriver.$invalid]">',
      '<label class="control-label form-left">Primary driver</label>',
      '<div ng-messages="$ctrl.form.vehiclePrimaryDriver.$error" ng-if="$ctrl.state.formSubmitted">',
      '<div ng-message="required">Please choose vehicle driver.</div>',
      '</div>',
      '<div ng-if="$ctrl.drivers.length === 1" ng-init="$ctrl.ngModel.vehicle.PrimaryDriverID = $ctrl.policyHolder.ID">',
      '{{ $ctrl.policyHolder.FirstName + \' \' + $ctrl.policyHolder.LastName }}',
      '</div>',
      '<div ng-if="$ctrl.drivers.length > 1">',
      '<select id="vehiclePrimaryDriver" class="form-control form-right" ng-model="$ctrl.ngModel.PrimaryDriverID"',
      'name="vehiclePrimaryDriver"',
      'ng-options="driver.ID as driver.FirstName + \' \' + driver.LastName for driver in $ctrl.drivers"',
      'required>',
      '<option value="">Select</option>',
      '</select>',
      '</div>',
      '</div>'].join(''),
    controller: ['QuoteIntentModel', function (quoteIntentModel) {
      this.drivers = quoteIntentModel.getRatedDrivers();
      this.policyHolder = quoteIntentModel.getPolicyHolder();
    }]
  }
}

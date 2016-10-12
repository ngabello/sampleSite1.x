/**
 * Created by jholloman on 6/15/2016.
 */
function PrimaryVehicle() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: ['<div class="form-group"' +
    'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverPrimaryVehicle.$invalid]">',
      '<label class="control-label form-left">Primary vehicle</label>',
      '<div ng-messages="$ctrl.form.driverPrimaryVehicle.$error" ng-if="$ctrl.form.submitted">',
      '<div ng-message="required">Please choose driver\'s vehicle.</div>',
      '</div>',
      '<div ng-if="$ctrl.vehicles.length === 1" ng-init="$ctrl.ngModel = $ctrl.vehicles[0].ID">',
      '{{ $ctrl.vehicles[0].Year + \' \' + $ctrl.vehicles[0].Make + \' \' + $ctrl.vehicles[0].Model }}',
      '</div>',
      '<div ng-if="$ctrl.vehicles.length > 1">',
      '<select id="driverPrimaryVehicle" class="form-control form-right" ng-model="$ctrl.ngModel"',
      'name="driverPrimaryVehicle"',
      'ng-options="vehicle.ID as vehicle.Year + \' \' + vehicle.Make + \' \' + vehicle.Model for vehicle in $ctrl.vehicles"',
      'required>',
      '<option value="">Select</option>',
      '</select>',
      '</div>',
      '</div>'].join(''),
    controller: ['QuoteIntentModel', function (quoteIntentModel) {
      this.vehicles = quoteIntentModel.getVehicles();
    }]
  }
}

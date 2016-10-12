/**
 * Created by jholloman on 1/8/2016.
 */
'use strict';
function AddAVehicle() {
  return {
    bindings: {
      form: '=',
      state: '=',
      ngModel: '=',
      show: '<'
    },
    template: [
      '<div class="form-group" ng-show="$ctrl.show"',
      'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.addVehicle.$invalid]"',
      'data-toggle="buttons">',
      '<label class="control-label form-left">',
      '<span>Add another vehicle?</span>',
      '</label>',
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
      'model=\'$ctrl.ngModel\' identifier="\'rdAddVehicle\'" options=\'$ctrl.addVehicleOptions\'></buttons-radio>',
      '<input type="hidden" id="addVehicle" name="addVehicle" type="text" ng-model="$ctrl.ngModel"/>',
      '</div>',
      '<div ng-messages="$ctrl.form.addVehicle.$error" ng-if="$ctrl.state.formSubmitted">',
      '<div ng-message="required">Please choose an answer.</div>',
      '</div>'
    ].join(''),
    controller: ['radioChoices', function (radioChoices) {
      this.addVehicleOptions = radioChoices.trueFalse;
    }]
  }
}

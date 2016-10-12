/**
 * Created by jholloman on 1/7/2016.
 */
'use strict';
function AntiTheft() {
  return function () {
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div ng-if="state.address.State == \'IL\'" class="form-group"' +
      'ng-class="{true: \'has-error\'}[state.formSubmitted && form.antiTheftDevice.$invalid]"' +
      'data-toggle="buttons">' +
      '<label class="control-label form-left">' +
      '<span>Anti-Theft Device</span>' +
      '</label>' +

      '<div ng-messages="form.antiTheftDevice.$error" ng-if="state.formSubmitted">' +
      '<div ng-message="required">Please choose an answer.</div>' +
      '</div>' +
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"' +
      'model=\'state.vehicle.AntiTheftDevice\' options=\'state.radioChoices.trueFalse\'></buttons-radio>' +
      '<input type="hidden" id="antiTheftDevice" name="antiTheftDevice" type="text" ng-model="state.vehicle.AntiTheftDevice"' +
      'ng-required="state.address.State == \'IL\'"/>' +
      '</div>'
    }
  }
}

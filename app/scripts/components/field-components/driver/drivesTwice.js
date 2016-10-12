/**
 * Created by jholloman on 1/21/2016.
 */
'use strict';
function DrivesTwice() {
    return {
      bindings: {
        form: '=',
        ngModel: '='
      },
      template:'<div class="form-group"' +
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.drivesAnyVehicles.$invalid]"' +
      'data-toggle="buttons">'  +
      '<label class="control-label form-left">' +
      '<span>Do they drive any of your vehicles twice a month or more?</span>' +
      '</label>' +

      '<div ng-messages="$ctrl.form.drivesAnyVehicles.$error" ng-if="$ctrl.form.submitted">' +
      '<div ng-message="required">Your answer is required.</div>' +
      '</div>' +
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"' +
      '  model=\'$ctrl.ngModel\'' +
      '  identifier="\'rdDrivesTwice\'"' +
      '  options=\'$ctrl.drivesTwiceOptions\'></buttons-radio>' +
      '<input type="hidden" id="drivesAnyVehicles" name="drivesAnyVehicles" type="text" ng-model="$ctrl.ngModel"' +
      'required>' +
      '</div>',
      controller: ['radioChoices', function (radioChoices) {
        this.drivesTwiceOptions = radioChoices.trueFalse;
      }]
    }
}

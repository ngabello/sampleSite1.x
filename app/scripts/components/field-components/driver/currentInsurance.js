/**
 * Created by jholloman on 12/23/2015.
 */
function CurrentInsurance() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"',
      ' ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverCurrentlyInsured.$invalid]"',
      ' data-toggle="buttons">',
      ' <label class="control-label form-left">',
      '   <span>Currently have auto insurance?</span>',
      ' </label>',
      ' <div ng-messages="$ctrl.form.driverCurrentlyInsured.$error" ng-if="$ctrl.form.submitted">',
      '  <div ng-message="required">Please choose an answer.</div>',
      ' </div>',
      ' <buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
      '  model=\'$ctrl.ngModel\'',
      '  identifier="\'rdCurrentlyInsured\'"',
      '  options=\'$ctrl.currentlyInsuredOptions\'>',
      ' </buttons-radio>',
      ' <input id="driverCurrentlyInsured" type="hidden" name="driverCurrentlyInsured" type="text" ng-model="$ctrl.ngModel" required>',
      '</div>'
    ].join(''),
    controller: ['radioChoices', function (radioChoices) {
      this.currentlyInsuredOptions = radioChoices.trueFalse;
    }]
  }

}

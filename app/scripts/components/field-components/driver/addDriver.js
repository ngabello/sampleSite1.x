/**
 * Created by jholloman on 1/11/2016.
 */
function AddDriver() {
  return {
    bindings: {
      form: '=',
      state: '=',
      ngModel: '=',
      show: '<'
    },
    template: [
      '<div class="form-group" ng-show="$ctrl.show"',
      'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.addDriver.$invalid]"',
      'data-toggle="buttons">',
      '<label class="control-label form-left">',
      '<span>Add another driver?</span>',
      '</label>',
      '<div ng-messages="$ctrl.form.addDriver.$error" ng-if="$ctrl.state.formSubmitted">',
      '<div ng-message="required">Please choose an answer.</div>',
      '</div>',
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
      '  model=\'$ctrl.ngModel\'',
      '  identifier="\'rdAddDriver\'"',
      '  options=\'$ctrl.addDriverOptions\'></buttons-radio>',
      '<input id="addDriver" type="hidden" name="addDriver" type="text" ng-model="$ctrl.ngModel"/>',
      '</div>',
      '<div class="help-block">',
      '<small>Who to include?</small></br>',
      '<small>- Everyone who drives a quoted vehicle</small></br>',
      '<small>- Everyone who lives in you household</small>',
      '</div>'
    ].join(''),
    controller: ['radioChoices', function (radioChoices) {
      this.addDriverOptions = radioChoices.trueFalse;
    }]
  }
}

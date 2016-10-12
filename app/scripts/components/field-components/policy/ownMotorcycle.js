/**
 * Created by jholloman on 12/30/2015.
 */
function OwnMotorcycle() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group">',
      '<label class="control-label form-left">Do you own a motorcycle</label>',
      '<buttons-radio class="btn-group form-100 form-right" id="rdHasMotorcycle" name="rdHasMotorcycle" data-toggle="buttons-radio"',
      '  model="$ctrl.ngModel"',
      '  identifier="\'rdHasMotorcycle\'"',
      '  options="$ctrl.motorcycleOptions"',
      'enabled="true"></buttons-radio>',
      '<input type="hidden" id="HasMotorcycle" name="HasMotorcycle" type="text" ng-model="$ctrl.ngModel"/>',
      '</div>'
    ].join(''),
    controller: ['radioChoices', function (radioChoices) {
      this.motorcycleOptions = radioChoices.yesNoBool;
    }]
  }
}

/**
 * Created by jholloman on 12/22/2015.
 */
function Gender(){
    return {
      bindings: {
        form: '=',
        ngModel: '='
      },
      template:[
      '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverGender.$invalid]"',
        'data-toggle="buttons">',
        '<label class="control-label form-left">',
          '<span>Gender</span>',
        '</label>',
        '<div ng-messages="$ctrl.form.driverGender.$error" ng-if="$ctrl.form.submitted">',
          '<div ng-message="required">Please choose a gender.</div>',
        '</div>',
        '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio" ',
        '  model=\'$ctrl.ngModel\'',
        '  identifier="\'rdGender\'"',
        '  options=\'$ctrl.genderOptions\'></buttons-radio>',
        '<input id="driverGender" type="hidden" name="driverGender" type="text" ng-model="$ctrl.ngModel" required>',
      '</div>'
      ].join(''),
      controller: ['radioChoices', function(radioChoices){
        this.genderOptions = radioChoices.gender;
      }]

    }
}

/**
 * Created by jholloman on 1/12/2016.
 */
function StudentEnrollment() {
  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.currentlyEnrolled.$invalid]"',
      'data-toggle="buttons"',
      'ng-if="$ctrl.showComponent()">',
      '<label class="control-label form-left">Are they currently a student or have a Bachelor\'s degree?</label>',
      '<div ng-messages="$ctrl.form.currentlyEnrolled.$error" ng-if="$ctrl.form.submitted">',
      '<div ng-message="required">Currently a student?</div>',
      '</div>',
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
      '  model=\'$ctrl.ngModel\'',
      '  identifier="\'rdCurrentlyEnrolled\'"',
      '  options=\'$ctrl.enrollmentOptions\'></buttons-radio>',
      '<input id="currentlyEnrolled" type="hidden" name="currentlyEnrolled" type="text" ng-model="$ctrl.ngModel"',
      'ng-required="$ctrl.showComponent()">',
      '</div>'
    ].join(''),
    controller: ['radioChoices', function (radioChoices) {
      this.enrollmentOptions = radioChoices.trueFalse;
      var enums = getEnums();

      this.showComponent = function () {
        return (this.driverModel.MaritalStatus == enums.EnumMaritalStatuses.Widowed || this.driverModel.MaritalStatus == enums.EnumMaritalStatuses.Divorced
          || this.driverModel.MaritalStatus == enums.EnumMaritalStatuses.NeverMarried) && this.driverModel.isStudentAge()
      };
    }]
  }

}

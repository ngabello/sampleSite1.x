/**
 * Created by jholloman on 12/22/2015.
 */
function GoodStudent() {
  return {
    bindings: {
      form: '=',
      ngModel: '=',
      additionalDriver: '<'
    },
    template: [
      '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.goodStudentDiscount.$invalid]"',
      'data-toggle="buttons"',
      'ng-if="$ctrl.showComponent()">',
      '<label class="control-label form-left">Have they maintained a 3.0 GPA or better?</label>',
      '<div ng-messages="$ctrl.form.goodStudentDiscount.$error" ng-if="$ctrl.form.submitted">',
      '<div ng-message="required">Your answer is required.</div>',
      '</div>',
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
      'model=\'$ctrl.ngModel.GoodStudentDiscount\' options=\'$ctrl.goodStudentOptions\'></buttons-radio>',
      '<input type="hidden" id="goodStudentDiscount" name="goodStudentDiscount" type="text" ng-model="$ctrl.ngModel.GoodStudentDiscount"',
      'ng-required="$ctrl.showComponent()">',
      '</div>'
    ].join(''),
    controller: ['radioChoices', function (radioChoices) {
       var enums = getEnums();

      this.goodStudentOptions = radioChoices.trueFalse;

      this.isStudentAge = function () {
        return this.ngModel.isStudentAge();
      };

      this.showComponent = function () {
        if(this.additionalDriver){
          return this.ngModel.CurrentlyEnrolled;
        }
        return (this.ngModel.MaritalStatus == enums.EnumMaritalStatuses.Widowed || this.ngModel.MaritalStatus == enums.EnumMaritalStatuses.Divorced
          || this.ngModel.MaritalStatus == enums.EnumMaritalStatuses.NeverMarried) && this.ngModel.isStudentAge()
          && this.ngModel.EmploymentStatus == enums.EnumEmploymentStatuses.FulltimeStudent
      }
    }]
  }
}

/**
 * Created by jholloman on 12/22/2015.
 */
function AttendingSchool() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && ($ctrl.ngModel.EmploymentStatus == $ctrl.enums.EnumEmploymentStatuses.FulltimeStudent) && $ctrl.form.attendingSchool.$invalid]"',
      'ng-if="$ctrl.showComponent()">',
      '<label class="control-label form-left">Currently attend</label>',
      '<div ng-messages="$ctrl.form.attendingSchool.$error"',
      'ng-if="$ctrl.form.submitted && ($ctrl.ngModel.EmploymentStatus == $ctrl.enums.EnumEmploymentStatuses.FulltimeStudent)">',
      '<div ng-message="required">Your answer is required.</div>',
      '</div>',
      '<select id="attendingSchool" class="form-control form-right" name="attendingSchool" ph=""',
      'ng-model="$ctrl.ngModel.CurrentStudentEnrollment"',
      'ng-options="a.Value as a.Desc for a in $ctrl.enrollmentTypes" ng-change="$ctrl.updateEmploymentStatus()"',
      'ng-required="$ctrl.showComponent()">',
      '<option value="">Select</option>',
      '</select>',
      '</div>'].join(''),
    controller: ['LookupDataService', function (lookupDataService) {
      this.enums = getEnums();
      this.enrollmentTypes = lookupDataService.getStudentEnrollmentTypeLookups();
      this.updateEmploymentStatus = function (status) {
        this.ngModel.resolveEmploymentStatus();
      };

      this.showComponent = function(){
        return this.ngModel.EmploymentStatus == this.enums.EnumEmploymentStatuses.FulltimeStudent
      };
    }]
  }
}

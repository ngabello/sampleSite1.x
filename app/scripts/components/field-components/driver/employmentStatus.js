/**
 * Created by jholloman on 12/22/2015.
 */
function EmploymentStatus(){
    return {
      bindings: {
        form: '=',
        ngModel: '='
      },
      template: [
      '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverEmployment.$invalid]">',
        '<label class="control-label form-left">',
          '<span>Employment status</span>',
        '</label>',
        '<div ng-messages="$ctrl.form.driverEmployment.$error" ng-if="$ctrl.form.submitted">',
          '<div ng-message="required">Please select employment status.</div>',
        '</div>',
        '<select id="driverEmployment" class="form-control form-right" name="driverEmployment"',
          'ng-model="$ctrl.ngModel.EmploymentStatus"',
          'ng-options="a.Value as a.Desc for a in $ctrl.employmentStatuses" ng-change="$ctrl.updateEmploymentStatus($ctrl.ngModel.EmploymentStatus)"',
          'required>',
          '<option value="">Select</option>',
        '</select>',
      '</div>'].join(''),
      controller: ['LookupDataService', function(lookupDataService){

        this.employmentStatuses = lookupDataService.getEmploymentStatusLookups();

        this.updateEmploymentStatus = function (status) {
          this.ngModel.resolveEmploymentStatus();
        };
      }]
    }
}

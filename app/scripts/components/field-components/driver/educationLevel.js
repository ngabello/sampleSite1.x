/**
 * Created by jholloman on 12/22/2015.
 */
function EducationLevel() {
    return {
      bindings: {
        form: '=',
        ngModel: '='
      },
      template: [
      '<div class="form-group"',
        'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverEducationLevel.$invalid]">',
        '<label class="control-label form-left">',
          '<span>Education completed</span>',
        '</label>',
        '<div ng-messages="$ctrl.form.driverEducationLevel.$error" ng-if="$ctrl.form.submitted">',
          '<div ng-message="required">Please choose an education level.</div>',
        '</div>',
        '<select id="driverEducationLevel" class="form-control form-right" name="driverEducationLevel"',
          'ng-model="$ctrl.ngModel"',
          'ng-options="a.Value as a.Desc for a in $ctrl.educationLevels" required>',
          '<option value="">Select</option>',
        '</select>',
      '</div>'].join(''),
      controller: ['LookupDataService', function(lookupDataService){
        this.educationLevels = lookupDataService.getEducationLevelLookups();
      }]
    }

}

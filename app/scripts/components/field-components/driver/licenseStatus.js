/**
 * Created by jholloman on 12/23/2015.
 */
function LicenseStatus(){
    return {
      bindings: {
        form: '=',
        ngModel: '='
      },
      template: [
      '<div class="form-group"',
        'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverLicenseStatus.$invalid]">',
        '<label class="control-label form-left">',
          '<span>Current license status</span>',
        '</label>',
        '<div ng-messages="$ctrl.form.driverLicenseStatus.$error" ng-if="$ctrl.form.submitted" style="color:maroon">',
          '<div ng-message="required">Please choose your license status.</div>',
        '</div>',
        '<select id="driverLicenseStatus" class="form-control form-right" name="driverLicenseStatus"',
          'ng-model="$ctrl.ngModel" ng-options="a.Value as a.Desc for a in $ctrl.licenseStatuses"',
          'required>',
          '<option value="">Select</option>',
        '</select>',
      '</div>'
      ].join(''),
      controller: ['LookupDataService', function(lookupDataService){
        this.licenseStatuses = lookupDataService.getLicenseStatusLookups();
      }]
    }
}

/**
 * Created by jholloman on 12/22/2015.
 */
function ResidencyType() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverResidenceOwnership.$invalid]">',
      '<label class="control-label form-left">',
      '<span>Residence type</span>',
      '</label>',
      '<div ng-messages="$ctrl.form.driverResidenceOwnership.$error" ng-if="$ctrl.form.submitted">',
      '<div ng-message="required">Please choose a residency status.</div>',
      '</div>',
      '<select class="form-control form-right" id="driverResidenceOwnership" name="driverResidenceOwnership"',
      'ng-model="$ctrl.ngModel"',
      'ng-options="a.Value as a.Desc for a in $ctrl.residencyTypeCodes" required>',
      '<option value="">Select</option>',
      '</select>',
      '</div>'
    ].join(''),
    controller: ['LookupDataService', function (lookupDataService) {
      this.residencyTypeCodes = lookupDataService.getResidenceOwnershipTypeLookups();

    }]
  }
}

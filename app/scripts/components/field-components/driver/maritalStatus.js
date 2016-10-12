/**
 * Created by jholloman on 12/22/2015.
 */
'use strict';
function MaritalStatus() {
  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '='
    },
    controller: ['LookupDataService', 'QuoteIntentModel', 'pachydermContactInfo', function (lookupDataService, quoteIntentModel, pachydermContactInfo) {

      this.addressState = quoteIntentModel.getAddress().State;
      this.maritalStatuses = lookupDataService.getMaritalStatusLookups(this.addressState);
      this.marriedStatus = EnumMaritalStatuses.Married;
      this.quoteIssuePhone = pachydermContactInfo.quoteIssuePhone;

      this.maritalStatusChanged = function () {
        this.driverModel.resolveGoodStudentDiscount();
      };
    }],
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.customerMaritalStatus.$invalid]">',
      '<label class="control-label form-left">',
      '<span>Marital status</span>',
      '</label>',
      '<div ng-messages="$ctrl.form.customerMaritalStatus.$error" ng-if="$ctrl.form.submitted">',
      '<div ng-message="required">Please choose a marital status.</div>',
      '</div>',
      '<select class="form-control form-right" id="customerMaritalStatus" name="customerMaritalStatus"',
      'ng-model="$ctrl.ngModel"',
      'ng-options="a.Value as a.Desc for a in $ctrl.maritalStatuses" ng-change="$ctrl.maritalStatusChanged()" required>',
      '<option value="">Select</option>',
      '</select>',
      '</div>',
      '<div ng-if="$ctrl.ngModel == $ctrl.marriedStatus && $ctrl.addressState != \'VA\'" class="help-block">',
      '<small>If you do not wish to include your spouse on the policy, please call <span ng-bind="$ctrl.quoteIssuePhone"></span>.</small>',
      '</div>'
    ].join('')
  }
}

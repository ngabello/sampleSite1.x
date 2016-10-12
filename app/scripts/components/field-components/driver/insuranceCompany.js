/**
 * Created by jholloman on 12/28/2015.
 */
function InsuranceCompany() {
  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.insuranceProvider.$invalid]">',
      '<label class="control-label form-left">Current insurance company</label>',
      '<div ng-messages="$ctrl.form.insuranceProvider.$error" ng-if="$ctrl.form.submitted">',
      '<div ng-message="required">Please select a current insurance provider.</div>',
      '</div>',
      '<select id="insuranceProvider" class="form-control form-right" name="insuranceProvider"',
      'title="Years with current insurance company" ng-model="$ctrl.ngModel"',
      'ng-options="a.Value as a.Desc for a in $ctrl.currentCarriers"',
      'ng-required="$ctrl.isRequired()">',
      '<option value="">Select</option>',
      '</select>',
      '</div>']
      .join(''),
    controller: ['LookupDataService', function (lookupDataService) {
      var enums = getEnums();
      this.currentCarriers = lookupDataService.getCurrentCarriers();

      this.isRequired = function(){
        return this.driverModel.CurrentlyInsured || this.driverModel.CurrentInsuranceStatus == enums.EnumNoCurrentInsuranceReasons.DeployedOverseasWithTheMilitary
          || this.driverModel.CurrentInsuranceStatus == enums.EnumNoCurrentInsuranceReasons.MyPolicyExpired30daysAgoOrLess
      }

    }]
  }

}

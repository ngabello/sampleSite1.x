/**
 * Created by jholloman on 12/30/2015.
 */
function YearsWithCompany() {
  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"' +
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.currentinsuranceyear.$invalid]">' +
      '<label class="control-label form-left">Years with current company</label>' +

      '<div ng-messages="$ctrl.form.currentinsuranceyear.$error" ng-if="$ctrl.form.submitted">' +
      '<div ng-message="required">Your answer is required.</div>' +
      '</div>' +
      '<select id="currentinsuranceyear" class="form-control form-right" name="currentinsuranceyear"' +
      'ng-model="$ctrl.ngModel"' +
      'ng-options="a.Value as a.Desc for a in $ctrl.yearsWithCurrentInsurer"' +
      'ng-required="$ctrl.isRequired()">',
      '<option value="">Select</option>' +
      '</select>' +
      '</div>' +
      '</div>'
    ].join(''),
    controller: ['LookupDataService', function (lookupDataService) {
      var enums = getEnums();
      this.yearsWithCurrentInsurer = lookupDataService.getYearsWith();

      this.isRequired = function(){
        return this.driverModel.CurrentlyInsured || this.driverModel.CurrentInsuranceStatus == enums.EnumNoCurrentInsuranceReasons.DeployedOverseasWithTheMilitary
          || this.driverModel.CurrentInsuranceStatus == enums.EnumNoCurrentInsuranceReasons.MyPolicyExpired30daysAgoOrLess
      }
    }]
  }
}

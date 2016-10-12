/**
 * Created by jholloman on 12/23/2015.
 */
function InsuranceLapse() {
  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '=',
      lapseCollection: "="
    },
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.previousLapse.$invalid]">',
      '<label class="control-label form-left">Were you uninsured at any time in the past 3 years?</label>',
      '<div ng-messages="$ctrl.form.previousLapse.$error" ng-if="$ctrl.form.submitted">',
      ' <div ng-message="required">Please choose an answer.</div>',
      '</div>',
      '<select id="previousLapse" class="form-control form-right" name="previousLapse"',
      'ng-model="$ctrl.ngModel"',
      'ng-options="a.Value as a.Desc for a in $ctrl.lapseCollection"',
      'ng-required="$ctrl.isRequired()">',
      '<option value="">Select</option>',
      '</select>',
      '</div>'
    ].join(''),
    controller: ['$scope', 'LookupDataService', function ($scope, lookupDataService) {
      var enums = getEnums();
      //this.lapseCollection = lookupDataService.getInsuranceLapseCodeLookups();

      this.isRequired = function(){
        return this.driverModel.CurrentlyInsured || this.driverModel.CurrentInsuranceStatus == enums.EnumNoCurrentInsuranceReasons.DeployedOverseasWithTheMilitary
        || this.driverModel.CurrentInsuranceStatus == enums.EnumNoCurrentInsuranceReasons.MyPolicyExpired30daysAgoOrLess
      };
    }]
  }
}

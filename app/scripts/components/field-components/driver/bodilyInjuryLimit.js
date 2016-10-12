/**
 * Created by jholloman on 12/30/2015.
 */
function BodilyInjuryLimit() {

  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.bodilyinjurylimits.$invalid]">',
      '<label class="control-label form-left">Current bodily injury coverage limits</label>',
      '<div ng-messages="$ctrl.form.bodilyinjurylimits.$error" ng-if="$ctrl.form.submitted" style="color:maroon">',
      ' <div ng-message="required">Your answer is required.</div>',
      '</div>',
      '<select id="bodilyinjurylimits" class="form-control form-right" name="bodilyinjurylimits"',
      'ng-model="$ctrl.ngModel"',
      'ng-options="a.Value as a.Desc for a in $ctrl.insuranceLimits"',
      'ng-required="$ctrl.isRequired()">',
      '<option value="">Select</option>',
      '</select>',
      '</div>'
    ].join(''),
    controller: ['LookupDataService', function (lookupDataService) {
      var enums = getEnums();

      this.insuranceLimits = lookupDataService.getCurrentInsuranceLimits();

      this.isRequired = function(){
        return this.driverModel.CurrentlyInsured || this.driverModel.CurrentInsuranceStatus == enums.EnumNoCurrentInsuranceReasons.DeployedOverseasWithTheMilitary
          || this.driverModel.CurrentInsuranceStatus == enums.EnumNoCurrentInsuranceReasons.MyPolicyExpired30daysAgoOrLess
      }
    }]
  }

}


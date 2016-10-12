/**
 * Created by jholloman on 1/20/2016.
 */
'use strict';
function PolicyTemplates(){
  return{
    ownMotorcycle: '<div class="form-group">' +
    '<label class="control-label form-left">Do you own a motorcycle</label>' +
    '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"' +
    'model=\'state.policy.HasMotorcycle\' options=\'state.radioOptions.yesNoBool\'' +
    'enabled="true"></buttons-radio>' +
    '<input type="hidden" name="HasMotorcycle" type="text" ng-model="state.policy.HasMotorcycle"/>' +
    '</div>',
    policyStartDate: '<div class="form-group">' +
    '<label class="control-label form-left">New policy start date</label>' +
    '<div ng-messages="form.policyStartDate.$error" style="color:maroon">' +
    '<div ng-message="required">Your answer is required.</div>' +
    '<div ng-message="invalidDateFormat">Please enter a valid date.</div>' +
    '</div>' +
    '<input type="text" ui-date="state.dateOptions" name="policyStartDate"' +
    'ng-model="state.policy.EffectiveDate"' +
    'ui-validate="{invalidDateFormat: \'$parent.validatePolicyStartDate($value)\'}"' +
    'required class="form-control form-right"></label>' +
    '</div>'
  }
}

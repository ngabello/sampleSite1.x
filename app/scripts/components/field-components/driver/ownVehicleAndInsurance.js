/**
 * Created by ngabello on 02/18/2016.
 */
function OwnVehicleAndInsurance() {
  return {
    bindings: {
      form: '=',
      state: '='
    },
    template: [
      '<div class="form-group" ng-if="$ctrl.showComponent()" ',
      'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.driverCurrentlyInsured.$invalid]"',
      'data-toggle="buttons">',
      '<label class="control-label form-left">',
      '<span>Do they have their own vehicle and insurance?</span>',
      '</label>',
      '<div ng-messages="$ctrl.form.driverCurrentlyInsured.$error" ng-if="$ctrl.state.formSubmitted">',
      '<div ng-message="required">Your answer is required.</div>',
      '</div>',
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
      'model=\'$ctrl.state.driver.CurrentlyInsured\' options=\'$ctrl.currentlyInsuredOptions\'></buttons-radio>',
      '<input type="hidden" name="driverCurrentlyInsured" type="text" ng-model="$ctrl.state.driver.CurrentlyInsured" required>',
      '</div>'
    ].join(''),
    controller: ['radioChoices', function (radioChoices) {

      var enums = getEnums();

      this.showComponent = function () {
        return (this.state.driver.LicenseStatus == enums.EnumLicenseStatuses.Valid || this.state.driver.LicenseStatus == enums.EnumLicenseStatuses.Restricted
          || this.state.driver.LicenseStatus == enums.EnumLicenseStatuses.Expired
          || this.state.driver.LicenseStatus == enums.EnumLicenseStatuses.NonUS || this.state.driver.LicenseStatus == enums.EnumLicenseStatuses.Suspended
          || this.state.driver.LicenseStatus == enums.EnumLicenseStatuses.Permit) && this.state.driver.RelationshipToInsured != enums.EnumRelationshipToInsureds.Spouse
      };

      this.currentlyInsuredOptions = radioChoices.trueFalse;
    }]
  }
}

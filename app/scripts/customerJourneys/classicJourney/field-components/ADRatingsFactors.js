/**
 * Created by jholloman on 2/19/2016.
 */
'use strict';
function ADRatingsFactors() {
  return {
    bindings: {
      form: '=',
      state: '=',
      ngModel: '='
    },
    transclude: true,
    template: //Ratings Factor questions including Age First Licensed, BirthDate and Marital Status
    '<div class="form-group" id="additionalRatingFactorQuestions"' +
    'ng-if="$ctrl.returnConditions()">' +
    '<ng-transclude></ng-transclude>' +
    '</div>',
    controller: [function () {
      this.returnConditions = function () {
        return (this.state.driver.LicenseStatus == 'valid' || this.state.driver.LicenseStatus == 'restricted' || this.state.driver.LicenseStatus == 'expired'
          || this.state.driver.LicenseStatus == 'foreign' || this.state.driver.LicenseStatus == 'suspended' || this.state.driver.LicenseStatus == 'permit')
          && (this.state.driver.RelationshipToInsured == 'spouse' || this.state.driver.CurrentlyInsured == false || (this.state.driver.CurrentlyInsured == true && this.state.driver.DrivesAnyListedVehicles == true))
      }
    }]
  }
}

/**
 * Created by jholloman on 12/23/2015.
 */
function AgeFirstLicensed() {
  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverFirstLicensed.$invalid]">',
      '<label class="control-label form-left">',
      '<span>Age first licensed</span>',
      '</label>',
      '<div ng-messages="$ctrl.form.driverFirstLicensed.$error" class="expandable" ng-if="$ctrl.form.submitted" style="color:maroon">',
      '<div ng-message="required">Please enter first licensed age.</div>',
      '<div ng-message="notANumber">Please enter a valid first licensed age.</div>',
      '<div ng-message="dob">Please enter your date of birth first</div>',
      '<div ng-message="ageLowerRange">cannot be lower than 14 years.</div>',
      '<div ng-message="ageUpperRange">cannot exceed driver\'s current age.</div>',
      '</div>',
      '<input id="driverFirstLicensed" class="form-control form-right" maxlength="2"',
      'ng-model-options="{ updateOn: \'blur\' }"',
      'name="driverFirstLicensed" type="tel" ng-model="$ctrl.ngModel" ng-change="$ctrl.validDOB()" ' +
      'ng-required="$ctrl.isRequired()"/>',
      '</div>'
    ].join(''),
    controller: ['EventService', 'QuoteIntentModel', '$stateParams', function (eventService, quoteIntentModel, $stateParams) {
      //--------------- Validates AgeFirstLicensed -------------------------------------------------
      //TODO convert to a directive cause this is also on the Additional Driver Page
      var instance = this;
      var enums = getEnums();
      this.isRequired = function(){
        return this.driverModel.LicenseStatus !== enums.EnumLicenseStatuses.NonLicensed;
      };
      this.validateLowerAge = function () {
        //if no driverFirstLicensed then nothing to validate
        if (!instance || !instance.form || !instance.form.driverFirstLicensed) {
          return;
        }
        if (!instance.ngModel) {
          return;
        }
        if (!instance.driverModel.DateOfBirth) {
          return
        }
        //We have a DateOfBirth so validate its presence
        instance.form.driverFirstLicensed.$setValidity('dob', true);
        if (isNaN(instance.ngModel)) {
          instance.form.driverFirstLicensed.$setValidity('notANumber', false);
          return false;
        } else {
          instance.form.driverFirstLicensed.$setValidity('notANumber', true);
        }
        if (parseInt(instance.ngModel, 10) >= 14) {
          instance.form.driverFirstLicensed.$setValidity('ageLowerRange', true)
        } else {
          instance.form.driverFirstLicensed.$setValidity('ageLowerRange', false)
        }
      };

      this.validateUpperAge = function () {
        //if no driverFirstLicensed then nothing to validate
        if (!instance || !instance.form || !instance.form.driverFirstLicensed) {
          return;
        }
        if (!instance.ngModel) {
          return;
        }
        if (!instance.driverModel.DateOfBirth) {
          return
        }
        //We have a DateOfBirth so validate its presence
        instance.form.driverFirstLicensed.$setValidity('dob', true);
        if (isNaN(instance.ngModel)) {
          instance.form.driverFirstLicensed.$setValidity('notANumber', false);
          return false;
        } else {
          instance.form.driverFirstLicensed.$setValidity('notANumber', true);
        }
        var birthDate = new Date(instance.driverModel.DateOfBirth.replace(/-/g, "/"));
        var currentDate = new Date();
        var age = moment(currentDate).diff(birthDate, 'years');
        if (parseInt(instance.ngModel, 10) <= age) {
          instance.form.driverFirstLicensed.$setValidity('ageUpperRange', true);
        } else {
          instance.form.driverFirstLicensed.$setValidity('ageUpperRange', false);
        }
      };

      this.validDOB = function () {
        //if no driverFirstLicensed then nothing to validate
        if (!instance || !instance.form || !instance.form.driverFirstLicensed) {
          return;
        }
        if (!instance.driverModel.DateOfBirth) {
          return instance.form.driverFirstLicensed.$setValidity('dob', false);
        } else {
          return instance.form.driverFirstLicensed.$setValidity('dob', true);
        }
      };
      eventService.addEvent([this.validateLowerAge, this.validateUpperAge, this.validDOB]);
    }]
  }
}

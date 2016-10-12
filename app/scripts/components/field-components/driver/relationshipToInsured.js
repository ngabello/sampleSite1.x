/**
 * Created by jholloman on 1/21/2016.
 */
'use strict';
function RelationshipToInsured() {
  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '='
    },
    bindToController:true,
    template: [
      '<div class="form-group" ng-if="$ctrl.ngModel == $ctrl.enums.EnumRelationshipToInsureds.Spouse">',
      '<label class="control-label form-left">Relationship to policyholder</label>',
      '<div class="control-label form-right">Spouse</div>',
      '</div>',
      '<div class="form-group" ng-if="$ctrl.ngModel != $ctrl.enums.EnumRelationshipToInsureds.Spouse"',
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverRelationship.$invalid]">',
      '<label class="control-label form-left">Relationship to policyholder</label>',
      '<div ng-messages="$ctrl.form.driverRelationship.$error" ng-if="$ctrl.form.submitted">',
      '<div ng-message="required">Please choose a relationship.</div>',
      '</div>',
      '<select id="driverRelationship" class="form-control form-right" name="driverRelationship"',
      'ng-model="$ctrl.ngModel"',
      'ng-options="a.Value as a.Desc for a in $ctrl.relationshipCodes"',
      'required ng-change="$ctrl.relationShipChanged($ctrl.ngModel)">',
      '<option value="">Select</option>',
      '</select>',
      '</div>'
    ].join(''),
    controller: ['LookupDataService', function (lookupDataService) {
      this.enums = getEnums();
      var instance = this;
      this.relationshipCodes = lookupDataService.getRelationshipToInsuredCodeLookups();

      this.relationShipChanged = function (relationShip) {
        instance.driverModel.LicenseStatus = null;
        instance.driverModel.GoodStudentDiscount = null;
        instance.driverModel.CurrentlyEnrolled = null;
        instance.driverModel.CurrentlyInsured = null;
        instance.driverModel.DrivesAnyListedVehicles = null;
        instance.driverModel.DateOfBirth = null;
        instance.driverModel.AgeFirstLicensed = null;
        if (instance.driverModel.MaritalStatus != instance.enums.EnumMaritalStatuses.Married && instance.driverModel.MaritalStatus != instance.enums.EnumMaritalStatuses.CivilUnion) {
          instance.driverModel.MaritalStatus = null;
        }
      };
    }]
  }

}

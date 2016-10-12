/**
 * Created by jholloman on 1/21/2016.
 */
'use strict';

function LicenseStatusAdditional() {
  return function () {
    var model = 'driver';
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group"' +
      'ng-class="{true: \'has-error\'}[additionalDriverCtrlState.formSubmitted && additionalDriverForm.driverLicenseStatus.$invalid]">' +
      '<label class="control-label form-left">' +
      '<span>Current license status</span>' +
      '</label>' +

      '<div ng-messages="additionalDriverForm.driverLicenseStatus.$error" ng-if="additionalDriverCtrlState.formSubmitted">' +
      '<div ng-message="required">Please choose a license status.</div>' +
      '</div>' +
      '<select id="driverLicenseStatus" class="form-control form-right" name="driverLicenseStatus"' +
      'ng-model="additionalDriverCtrlState.driver.LicenseStatus" ng-options="a.Name as a.Description for a in additionalDriverCtrlState.lookupData.getLicenseStatusLookups()"' +
      'required ng-change="updateLicenseStatus()">' +
      '<option value="">Select</option>' +
      '</select>' +
      '</div>',
      controller: ['$scope', 'LookupDataService', function ($scope, lookupDataService) {
        var resetFields = function () {
            $scope.additionalDriverCtrlState.driver.GoodStudentDiscount = null;
            $scope.additionalDriverCtrlState.driver.CurrentlyEnrolled = null;
            $scope.additionalDriverCtrlState.driver.CurrentlyInsured = null;
            $scope.additionalDriverCtrlState.driver.DrivesAnyListedVehicles = null;
            $scope.additionalDriverCtrlState.driver.DateOfBirth = null;
            $scope.additionalDriverCtrlState.driver.AgeFirstLicensed = null;
            if ($scope.additionalDriverCtrlState.driver.MaritalStatus != 'Married' && $scope.additionalDriverCtrlState.driver.MaritalStatus != 'CivilUnion') {
              $scope.additionalDriverCtrlState.driver.MaritalStatus = null;
            }
          };

        $scope.updateLicenseStatus = function () {
          resetFields();
        };
      }]
    }
  }
}

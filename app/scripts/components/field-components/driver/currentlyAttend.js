/**
 * Created by jholloman on 1/12/2016.
 */
function CurrentlyAttend() {
  return function () {
    return {
      scope: {
        form: '=',
        state: '='
      },
      template: '<div class="form-group"' +
      'ng-class="{true: \'has-error\'}[state.formSubmitted && (state.driver.EmploymentStatus == \'FullTimeStudent\') && form.currentlyAttend.$invalid]"' +
      'ng-if="state.driver.EmploymentStatus == \'FullTimeStudent\'">' +
      '<label class="control-label form-left">Currently attend</label>' +

      '<div ng-messages="form.currentlyAttend.$error"' +
      'ng-if="state.formSubmitted && (state.driver.EmploymentStatus == \'FullTimeStudent\')">' +
      '<div ng-message="required">Your answer is required.</div>' +
      '</div>' +
      '<select id="currentlyAttend" class="form-control form-right" name="currentlyAttend" ph=""' +
      'ng-model="state.driver.CurrentStudentEnrollment"' +
      'ng-options="a.Name as a.Description for a in enrollmentTypes"' +
      'ng-change="updateEmploymentStatus()"' +
      'required>' +
      '<option value="">-- Select --</option>' +
      '</select>' +
      '</div>',
      controller: ['$scope', 'LookupDataService', function ($scope, lookupDataService) {

        $scope.enrollmentTypes = lookupDataService.getStudentEnrollmentTypeLookups();

        $scope.updateEmploymentStatus = function (status) {
          if (!$scope.state.militaryBranches && (status == 'RetiredMilitary' || status == 'Military')) {
            $scope.state.militaryBranches = lookupDataService.getMilitaryBranchLookups();
          }
          $scope.state.driver.resolveEmploymentStatus();
        };
      }]
    }
  }
}

/**
 * Created by jholloman on 1/7/2016.
 */
'use strict';
function WhenPurchased() {
  return function () {
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group"' +
      'ng-class="{true: \'has-error\'}[state.formSubmitted && form.yearSelection_ddl.$invalid]">' +
      '<label class="control-label form-left">' +
      '<span>Year vehicle was purchased</span>' +
      '</label>' +

      '<div ng-messages="form.yearSelection_ddl.$error" ng-if="state.formSubmitted">' +
      '<div ng-message="required">Please select year.</div>' +
      '</div>' +
      '<select id="yearSelection_ddl" class="form-control form-right" name="yearSelection_ddl"' +
      'ng-model="state.vehicle.YearSelected" ng-change="yearChanged()"' +
      'ng-options="a.Value as a.Desc for a in state.yearsOwnedOptionList"' +
      'required>' +
      '<option value="">Select</option>' +
      '</select>' +
      '</div>' +
      '<div ng-if="state.withinXYears" class="form-group"' +
      'ng-class="{true: \'has-error\'}[state.formSubmitted && form.monthSelection_ddl.$invalid]">' +
      '<label class="control-label form-left">' +
      '<span>Month vehicle was purchased</span>' +
      '</label>' +

      '<div ng-messages="form.monthSelection_ddl.$error" ng-if="state.formSubmitted">' +
      '<div ng-message="required">Please select month.</div>' +
      '</div>' +
      '<select id="monthSelection_ddl" class="form-control form-right" name="monthSelection_ddl"' +
      'ng-model="state.vehicle.MonthSelected"' +
      'ng-options="a.Value as a.Desc for a in monthsOwnedOptionsList"' +
      'ng-change="monthChanged()"' +
      'ng-required="state.withinXYears">' +
      '<option value="">Select</option>' +
      '</select>' +
      '</div>',
      controller: ['$scope', 'VehicleService', function ($scope, vehicleService) {
        $scope.monthsOwnedOptionsList = vehicleService.getMonthsOwned();

        $scope.yearChanged = function () {
          if (!$scope.state.vehicle.YearSelected) {
            $scope.state.withinXYears = false;
            $scope.state.vehicle.MonthSelected = null;
            return;
          }
          var minYear = vehicleService.getMinYear(vehicleService.getYearDifference());
          $scope.state.withinXYears = $scope.state.vehicle.YearSelected >= minYear;
          var vehicleYear = $scope.state.vehicle.YearSelected;
          if ($scope.state.vehicle.YearSelected < minYear) {
            vehicleYear = vehicleService.getMinYear(vehicleService.getYearDifference()) - 1;
          }
          $scope.state.vehicle.DateOfAcquisition = moment(String.format("01/01/{0}", vehicleYear), "MM DD YYYY").format("MM-DD-YYYY");
        };

        $scope.monthChanged = function () {
          if (!$scope.state.vehicle.YearSelected || !$scope.state.vehicle.MonthSelected) {
            return;
          }
          $scope.state.vehicle.DateOfAcquisition = moment(String.format("{0}/01/{1}", $scope.state.vehicle.MonthSelected + 1, $scope.state.vehicle.YearSelected), "MM DD YYYY").format("MM-DD-YYYY");
        };
      }]
    }

  }
}

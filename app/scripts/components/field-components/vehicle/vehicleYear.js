/**
 * Created by jholloman on 1/5/2016.
 */
function VehicleYear() {
  return function () {
    var model = 'vehicle';
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group"' +
        'ng-class="{true: \'has-error\'}[state.formSubmitted && form.vehicleYear.$invalid]">' +
        '<label class="control-label form-left">' +
          '<span>Year</span>' +
        '</label>' +

        '<div ng-messages="form.vehicleYear.$error" ng-if="state.formSubmitted">' +
          '<div ng-message="required">Please enter vehicle year.</div>' +
          '<div ng-message="invalidYear">Please enter a 4 digit year.</div>' +
          '<div ng-message="vehicleAge">Please select a year between 1981 and {{state.currentYear}}.</div>' +
        '</div>' +
        '<input only-digits="" id="vehicleYear" class="form-control form-right" maxlength="4" name="vehicleYear" type="tel"' +
          'ng-change="updateYear(state.vehicle.Year)" ng-disabled="state.yearsDisabled"' +
          'ng-model="state.vehicle.Year" required/>' +
      '</div>',
      controller: ['$scope', 'VehicleService', 'pachydermContactInfo', 'errorService', function ($scope, vehicleService, pachydermContactInfo, errorService) {

        // Retrieves all vehicle years
        vehicleService.getVinIsoYears().then(function (makeModelYearRecords) {
          $scope.maxYear = vehicleService.getMaxVehicleYear();
          $scope.minYear = vehicleService.getMinVehicleYear();
          $scope.state.yearsDisabled = false;
        }, function (error) {
          errorService.showSystemError('VehicleCtrl: Retrieving vehicle years failed with error', error);
        });

        //Fires for each keypress in the year field
        $scope.updateYear = function () {
          $scope.state.vehicle.YearSelected = null;
          $scope.state.vehicle.MonthSelected = null;
          if (!$scope.state.vehicle.Year) {
            return;
          }
          $scope.$parent.initializeScope();
          //clear out any exotic messages
          if ($scope.state.vehicleDNQs && $scope.state.vehicleDNQs.length > 0) {
            $scope.state.vehicleDNQs = [];
          }

          if ($scope.state.vehicle.Year && $scope.state.vehicle.Year.length == 4) {
            $scope.form.vehicleYear.$setValidity('invalidYear', true);
            if ($scope.state.vehicle.Year >= $scope.minYear && $scope.state.vehicle.Year <= $scope.maxYear) {
              $scope.form.vehicleYear.$setValidity('vehicleAge', true);
              $scope.state.alerts = [];
              $scope.state.yearsOwnedOptionList = vehicleService.getYearsOwned($scope.state.vehicle.Year);
              vehicleService.fillMakes($scope.state.vehicle.Year).then(function (vehicleMakes) {
                $scope.state.vehicleMakes = vehicleMakes;
              });
            }
            else if ($scope.state.vehicle.Year < $scope.minYear) {
              $scope.form.vehicleYear.$setValidity('vehicleAge', false);
              $scope.state.alerts.push({msg: String.format('Sorry, we do not insure pre-{0} vehicles online. Please call {1} to continue your quote.', $scope.minYear, pachydermContactInfo.exoticVehiclePhone)});
            }
            else {
              $scope.form.vehicleYear.$setValidity('vehicleAge', false);
              $scope.state.alerts.push({msg: String.format('Please select a year between {0} and {1}.', $scope.minYear, $scope.maxYear)});
            }
          }
        };
      }]
    }
  }
}

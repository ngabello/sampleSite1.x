/**
 * Created by jholloman on 12/22/2015.
 */
function Occupation() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: [
      '<div class="form-group"' ,
      'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && ($ctrl.ngModel.EmploymentStatus == \'EmployedPrivately\'' ,
      '|| $ctrl.ngModel.EmploymentStatus == \'Retired\') && $ctrl.form.driverOccupation.$invalid]"' ,
      'ng-if="$ctrl.ngModel.EmploymentStatus == \'EmployedPrivately\' || $ctrl.ngModel.EmploymentStatus == \'Retired\'">' ,
      '<label ng-if="$ctrl.ngModel.EmploymentStatus != \'Retired\'" class="control-label form-left">' ,
      '<span>Occupation</span>' ,
      '</label>' ,
      '<label ng-if="$ctrl.ngModel.EmploymentStatus == \'Retired\'" class="control-label form-left">' ,
      '<span>Prior Occupation</span>' ,
      '</label>' ,
      '<div ng-messages="$ctrl.form.driverOccupation.$error"' ,
      'ng-if="$ctrl.form.submitted && ($ctrl.ngModel.EmploymentStatus == \'EmployedPrivately\' || $ctrl.ngModel.EmploymentStatus == \'Retired\')">' ,
      '<div ng-message="required">Please choose your occupation.</div>' ,
      '<div ng-message="list">Please choose from list.</div>' ,
      '</div>' ,
      '<select id="driverOccupation" ng-if="occupationTrigger" class="form-control form-right" ng-model="$ctrl.ngModel.Occupation" name="driverOccupation"' ,
      'ng-options="occupation.Value as occupation.Desc for occupation in $ctrl.occupations" required>' ,
      '<option value="">-- Select --</option>' ,
      '</select>' ,
      '<input id="driverOccupation" type="text" name="driverOccupation" autocomplete="off"' ,
      'class="form-control form-right" ng-model="$ctrl.ngModel.Occupation"' ,
      'uib-typeahead="occupation.Value as occupation.Desc for occupation in $ctrl.occupations | filter:$viewValue | limitTo:6"' ,
      'occupation-directive="" occupations="$ctrl.occupations"' ,
      'placeholder="Type to search" required>' ,
      '<div class="help-block"><small>Please select an occupation that most closely describes your profession</small></div>' ,
      '</div>'
    ].join(''),
    controller: ['EventService', 'LookupDataService', function (eventService, lookupDataService) {
      this.occupations = lookupDataService.getOccupationLookups();
      var instance = this;

      this.validateOccupation = function () {
        if (instance && instance.form.driverOccupation) {
          if (instance.ngModel) {
            var foundOne = _.findWhere(instance.occupations, {Value:instance.ngModel.Occupation});
            if(foundOne){
              instance.form.driverOccupation.$setValidity('list', true);
            }else {
              instance.form.driverOccupation.$setValidity('list', false);
            }
          } else {
            instance.form.driverOccupation.$setValidity('list', false);
          }
        }
      };

      //add the event to the service
      eventService.addEvent(this.validateOccupation);
    }]
  }
}

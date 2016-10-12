/**
 * Created by jholloman on 12/30/2015.
 */
function PolicyStartDate() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: ['<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.formSubmitted && $ctrl.form.policyStartDate.$invalid]">',
      '<label class="control-label form-left">New policy start date</label>',
      '<div ng-messages="$ctrl.form.policyStartDate.$error" style="color:maroon">',
      '<div ng-message="required">Your answer is required.</div>',
      '<div ng-message="invalidDateFormat">Please enter a valid date.</div>',
      '</div>',
      '<input type="text" id="policyStartDate" ui-date="$ctrl.dateOptions" name="policyStartDate"',
      'ng-model="$ctrl.ngModel"',
      'required class="form-control form-right"></label>',
      '</div>'
    ].join(''),
    controller: ['EventService', function (eventService) {
      this.formSubmitted = false;
      var instance = this;

      this.dateOptions = {
        minDate: +1,
        maxDate: "+2M",
        dateFormat: 'mm/dd/yy'
      };

      //Initialize the effective date
      if (this.ngModel == 'Invalid date' || !this.ngModel) {
        this.ngModel = moment(new Date()).add(1, 'days').format('L');
      }

      //validate the effective date it can not be less then 1 day out
      this.validatePolicyEffectiveDate = function () {
        instance.formSubmitted = true;
        if (instance && instance.ngModel && moment(instance.ngModel).isValid()) {
          if (moment(instance.ngModel).isAfter(moment(new Date()), 'day')) {
            instance.form.policyStartDate.$setValidity('invalidDateFormat', true);
          } else {
            instance.form.policyStartDate.$setValidity('invalidDateFormat', false);
          }
        } else {
          instance.form.policyStartDate.$setValidity('invalidDateFormat', false);
        }
      };

      //add the event to the service
      eventService.addEvent(this.validatePolicyEffectiveDate);
    }]
  }
}


/**
 * Created by jholloman on 12/4/2015.
 */
'use strict';
function BirthDate() {
  return {
    bindings: {
      form: '<',
      minAge: '<',
      maxAge: '<',
      ngModel: '='
    },

    controller: ['EventService', function (eventService) {

      var instance = this;

      this.validateDOB = function () {
        //if no customerDob then nothing to validate
        if(!instance || !instance.form || !instance.form.customerDob)
        {
          return;
        }
        if (instance && instance.ngModel) {
          var m = moment.utc(instance.ngModel.substring(0, 10), ['MMDDYYYY', 'MM-DD-YYYY'], true);
          var valid = m.isValid();

          if (valid) {
            instance.form.customerDob.$setValidity('datetime', true);
            var age = moment(new Date()).diff(m, 'years');
            instance.form.customerDob.$setValidity('agerange', age >= instance.minAge && age <= instance.maxAge);
          } else {
            instance.form.customerDob.$setValidity('datetime', false);
          }
        } else {
          instance.form.customerDob.$setValidity('datetime', false);
        }
      };

      //add the event to the service
      eventService.addEvent(this.validateDOB);
    }],
    template: [
      '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.customerDob.$invalid]">',
      '<label class="control-label form-left">',
      '<span>Birth date</span>',
      '</label>',
      '<div ng-messages="$ctrl.form.customerDob.$error" ng-if="$ctrl.form.submitted">',
      '<div ng-message="required">Please enter a birth date.</div>',
      '<div ng-message="datetime">Please enter a valid birth date.</div>',
      '<div ng-message="agerange">Driver age must be between {{$ctrl.minAge}} and {{$ctrl.maxAge}}.</div>',
      '</div>',
      '<input class="form-control form-lg form-right" id="customerDob" name="customerDob" ui-mask="99-99-9999"',
      'title="Birth date" type="tel"',
      'ng-model="$ctrl.ngModel" required valid-date min-age="{{$ctrl.minAge}}" max-age="{{$ctrl.maxAge}}" placeholder="MM-DD-YYYY"><!--valid-date-->',
      '</div>'
    ].join('')
  }
}

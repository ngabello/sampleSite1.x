/**
 * Created by jholloman on 12/4/2015.
 */
'use strict';
function PhoneNumber() {
  return {
    bindings: {
      form: '=',
      ngModel: '=',
      validate: '<'
    },
    template: ['$element', '$attrs', function ($element, $attrs) {
      // access to $element and $attrs
      var result;
      if ($attrs && $attrs.validate && $attrs.validate == 'false') {
        result = [
          '<div class="form-group">',
          '<label class="control-label form-left">Phone number</label>',
          '<input autocomplete="on" class="form-control form-lg form-right" id="phone"',
          'name="phone"',
          'ng-model="$ctrl.ngModel" title="Phone number" type="tel"',
          'ui-mask="(999) 999-9999"/>',
          '</div>'
        ]
      } else {
        result = [
          '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.formSubmitted && $ctrl.form.phone.$invalid]">',
          '<label class="control-label form-left">Phone number</label>',
          '<div ng-messages="$ctrl.form.phone.$error" ng-if="$ctrl.formSubmitted && $ctrl.form.phone.$invalid">',
          '<div ng-message="required">Please enter a valid phone number.</div>',
          '<div ng-message="invalidPhone">Please enter a valid phone number.</div>',
          '</div>',
          '<input autocomplete="on" class="form-control form-lg form-right" id="phone"',
          'name="phone"',
          'ng-model="$ctrl.ngModel" title="Phone number" type="tel"',
          'ui-mask="(999) 999-9999"/>',
          '</div>'
        ]
      }
      return result.join('')
    }],
    controller: ['EventService', function (eventService) {

      this.formSubmitted = false;
      var instance = this;

      var t = /(?:\([2-9][0-8]\d\)\ ?|[2-9][0-8]\d[\-\ \.\/]?)[2-9]\d{2}[- \.\/]?\d{4}\b/;
      this.validatePhone = function () {
        instance.formSubmitted = true;
        if (instance && instance.validate && instance.form.phone) {
          if (instance.ngModel) {
            if(t.test(instance.ngModel)){
              instance.form.phone.$setValidity('required', true);
            }else{
              instance.form.phone.$setValidity('required', false);
            }
          }else{
            instance.form.phone.$setValidity('required', false);
          }
        }
      };

      //add the event to the service
      eventService.addEvent(this.validatePhone);
    }]
  }

}

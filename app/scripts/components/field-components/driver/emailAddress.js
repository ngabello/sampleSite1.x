/**
 * Created by jholloman on 12/4/2015.
 */
'use strict';
function EmailAddress(){
    return {
      bindings: {
        form: '=',
        ngModel: '='
      },
      controller: ['EventService', function (eventService) {
        this.formSubmitted = false;
        var instance = this;

        this.validateEmail = function () {
          //if no customerDob then nothing to validate
          if(!instance || !instance.form || !instance.form.Email)
          {
            return;
          }
          instance.formSubmitted = true;
        };

        //add the event to the service
        eventService.addEvent(this.validateEmail);
      }],
      template: [
      '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.formSubmitted && $ctrl.form.Email.$invalid]">',
        '<label class="control-label form-left">',
          '<span>Email</span>',
        '</label>',
        '<div ng-messages="$ctrl.form.Email.$error" ng-if="$ctrl.formSubmitted && $ctrl.form.Email.$touched" style="color:maroon">',
          '<div ng-message="email">Please enter a valid e-mail address.</div>',
        '</div>',
        '<input class="form-control form-lg form-right inspectletIgnore" id="Email" name="Email" title="Email address"',
        'type="email" ng-model="$ctrl.ngModel" placeholder="Email address"/>',
      '</div>'
      ].join('')
    }
}

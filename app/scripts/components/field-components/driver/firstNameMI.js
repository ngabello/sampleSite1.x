/**
 * Created by jholloman on 12/3/2015.
 */
'use strict';
function FirstNameMI(){
    return {
      bindings: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.customerFname.$invalid]">'+
        '<!-- First Name-->'+
        '<label class="control-label form-left hidden-xs">'+
          '<span>First name</span>'+
        '</label>'+

        '<div ng-messages="$ctrl.form.customerFname.$error" ng-if="$ctrl.state.formSubmitted">'+
          '<div ng-message="required">Please enter your first name</div>'+
          '<div ng-message="pattern">first name is in an invalid format</div>'+
        '</div>'+
        '<input class="form-control form-md form-right" id="customerFname" maxlength="30" name="customerFname"'+
        'tabindex="0" type="text" ng-model="$ctrl.state.driver.FirstName" placeholder="First Name" title="First name"'+
        'required ng-pattern="/[\sA-zÀ-ÿ.-/]/" capitalize-first>'+
        '<!-- Middle Name-->'+
        '<label class="sr-only">Middle initial</label>'+
        '<input class="form-control not-required form-sm form-margin " id="customerMname" maxlength="1"'+
        'name="customerMname" placeholder="M" title="Middle initial" type="text"'+
        'ng-model="$ctrl.state.driver.MiddleName">'+
      '</div>',
      controller: function() {
        //console.dir(this.form);
        //console.dir(this.state);
      }
    }

}

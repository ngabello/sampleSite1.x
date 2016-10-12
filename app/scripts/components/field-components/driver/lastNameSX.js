/**
 * Created by jholloman on 12/3/2015.
 */
'use strict';
function LastNameSX(){
  return function(){
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group" ng-class="{true: \'has-error\'}[state.formSubmitted && form.customerLname.$invalid]">'+
        '<!-- Last Name-->'+
        '<label class="control-label form-left hidden-xs">'+
          '<span>Last name</span>'+
        '</label>'+
        '<div ng-messages="form.customerLname.$error" ng-if="state.formSubmitted">'+
          '<div ng-message="required">Please enter your last name.</div>'+
          '<div ng-message="pattern">Last name format is invalid.</div>'+
        '</div>'+
        '<input class="form-control form-md form-right" id="customerLname" maxlength="30"'+
        'name="customerLname" placeholder="Last Name" title="Last name" type="text" ng-model="state.driver.LastName"'+
        'required ng-pattern="/[\sA-zÀ-ÿ.-/]/" capitalize-first>'+
        '<!-- Suffix-->'+
        '<label class="sr-only">Suffix</label>'+
        '<select class="form-control not-required form-sm form-margin " id="customerSuffix"'+
        'name="customerSuffix"'+
        'ng-model="state.driver.Suffix" ng-options="a.Value as a.Desc for a in suffixes">'+
        '<option value="">Suffix</option>'+
        '</select>'+
      '</div>',
      controller: ['$scope', 'LookupDataService', function($scope, lookupDataService){
        $scope.suffixes = lookupDataService.getSuffixes();

      }]
    }
  }
}

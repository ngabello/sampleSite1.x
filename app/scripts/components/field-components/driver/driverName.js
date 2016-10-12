/**
 * Created by gabello on 5/11/2016.
 */
'use strict';
function DriverName() {
  return {
    require: '^form',
    bindings: {
      form: '=',
      ngModel: '='
    },
    controller: ['LookupDataService', function (lookupDataService) {
      this.suffixes = lookupDataService.getSuffixes();
    }],
    template: ['QuoteIntentModel', '$attrs', function (quoteIntentModel, $attrs) {
      var result;
      var pageName = $attrs && $attrs.passedPage ? $attrs.passedPage : '';
      var previouslyViewed = false;
      //If no passed page name is defined then assume this is always editable
      if (pageName) {
        var viewedPages = quoteIntentModel.getClientData().ViewedPages;
        var policyStatus = quoteIntentModel.getPolicy().PolicyStatus ? quoteIntentModel.getPolicy().PolicyStatus : ''; //Quoted
        if (viewedPages) {
          previouslyViewed = viewedPages.some(function (page) {
            var pageRegExp = new RegExp(pageName);
            return pageRegExp.test(page);
          })
        }
      }
      if (!previouslyViewed && policyStatus != 'Quoted') {
        result = [
          '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.customerFname.$invalid]">',
          //First Name
          '<label class="control-label form-left hidden-xs">',
          '<span>First name</span>',
          '</label>',
          '<div ng-messages="$ctrl.form.customerFname.$error" ng-if="$ctrl.form.submitted">',
          '<div ng-message="required">Please enter your first name</div>',
          '<div ng-message="pattern">first name is in an invalid format</div>',
          '</div>',
          '<input class="form-control form-md form-right" id="customerFname" maxlength="30" name="customerFname"',
          'tabindex="0" type="text" ng-model="$ctrl.ngModel.FirstName" placeholder="First Name" title="First name"',
          'required ng-pattern="/[\sA-zÀ-ÿ.-/]/" capitalize-first>',
          //Middle Name
          '<label class="sr-only">Middle initial</label>',
          '<input class="form-control not-required form-sm form-margin " id="customerMname" maxlength="1"',
          'name="customerMname" placeholder="M" title="Middle initial" type="text"',
          'ng-model="$ctrl.ngModel.MiddleName">',
          '</div>',
          '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.customerLname.$invalid]">',
          //Last Name
          '<label class="control-label form-left hidden-xs">',
          '<span>Last name</span>',
          '</label>',
          '<div ng-messages="$ctrl.form.customerLname.$error" ng-if="$ctrl.form.submitted">',
          '<div ng-message="required">Please enter your last name.</div>',
          '<div ng-message="pattern">Last name format is invalid.</div>',
          '</div>',
          '<input class="form-control form-md form-right" id="customerLname" maxlength="30"',
          'name="customerLname" placeholder="Last Name" title="Last name" type="text" ng-model="$ctrl.ngModel.LastName"',
          'required ng-pattern="/[\sA-zÀ-ÿ.-/]/" capitalize-first>',
          //Suffix
          '<label class="sr-only">Suffix</label>',
          '<select class="form-control not-required form-sm form-margin " id="customerSuffix"',
          'name="customerSuffix"',
          'ng-model="$ctrl.ngModel.Suffix" ng-options="a.Value as a.Desc for a in $ctrl.suffixes">',
          '<option value="">Suffix</option>',
          '</select>',
          '</div>'
        ];
      } else {
        result = [
          '<div class="form-group">',
          '<label class="control-label form-left">Policy Holder</label>',
          '<div class="form-right"><span ng-bind="$ctrl.ngModel.FirstName"></span>',
          ' <span ng-bind="$ctrl.ngModel.MiddleName"></span>',
          ' <span ng-bind="$ctrl.ngModel.LastName"></span>',
          ' <span ng-bind="$ctrl.ngModel.Suffix"></span></div>',
          '</div>'
        ]
      }
      return result.join('')
    }]
  }
}

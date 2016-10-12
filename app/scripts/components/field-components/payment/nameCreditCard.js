/**
 * Created by jholloman on 3/24/2015.
 */
function NameCreditCard() {
  'use strict';

  var normalizeYear = function(year){
    // Century fix
    var YEARS_AHEAD = 20;
    if (year<100){
      var nowYear = new Date().getFullYear();
      year += Math.floor(nowYear/100)*100;
      if (year > nowYear + YEARS_AHEAD){
        year -= 100;
      } else if (year <= nowYear - 100 + YEARS_AHEAD) {
        year += 100;
      }
    }
    return year;
  };

//region Validation Methods
  var checkExpirationDate = function (expDate, billingInfo, form) {
    if (!expDate) {
      return;
    }
    var isValidDate = false;

    var tempDate = expDate.replace(/([_.*+?^=!:${}()|\[\]\/\\])/g, '');
    var month = parseInt(tempDate.substring(0, 2), 10);
    var year = parseInt(tempDate.substring(2, 6), 10);
    var dateToValidate = String.format('{0}/{1}',month,year);

    var match = dateToValidate.match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/);
    if (!match){
      form.billingExpDate.$setValidity('invalidFormat', false);
      return false;
    }else{
      form.billingExpDate.$setValidity('invalidFormat', true);
    }
    var exp = new Date(normalizeYear(1*match[2]),1*match[1]-1,1).valueOf();
    var now=new Date();
    var currMonth = new Date(now.getFullYear(),now.getMonth()-1,1).valueOf();
    if (exp<=currMonth){
      billingInfo.CreditCard.ExpirationYear = null;
      billingInfo.CreditCard.ExpirationMonth = null;
      return false;
    } else {
      billingInfo.CreditCard.ExpirationYear = year;
      billingInfo.CreditCard.ExpirationMonth = month;
      return true;
    }
  };

  return {
    bindings: {
      form: '=',
      state: '='
    },
    template: '<div class="form-group"' +
    'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.billingCardholder.$invalid]">' +
    '<label class="control-label form-left">Name on card</label>' +

    '<div ng-messages="$ctrl.form.billingCardholder.$error" ng-if="$ctrl.state.formSubmitted">' +
    '<div ng-message="required">Please enter the cardholder name.</div>' +
    '<div ng-message="lastName">Last name is required</div>' +
    '</div>' +
    '<input class="form-control form-right inspectletIgnore" id="billingCardholder" maxlength="70"' +
    'name="billingCardholder" ph=""' +
    'title="Card holder name" type="text" ng-model="$ctrl.state.bindRequest.CreditCard.NameOnCard"' +
    'capitalize-first required/>' +
    '<span style="font-size: 13px;color: gray;float: right;">Full name as it appears on your credit card</span>' +
    '</div>' +

      <!-- Credit Card Number -->
    '<div class="form-group"' +
    'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.billingCCNumber.$invalid]">' +
    '<label class="control-label form-left">Card number</label>' +

    '<div ng-messages="$ctrl.form.billingCCNumber.$error" ng-if="$ctrl.state.formSubmitted">' +
    '<div ng-message="required">Please enter the card number.</div>' +
    '<div ng-message="invalidCard">Please enter a valid credit card.</div>' +
    '<div ng-message="notRecognized">We currently do not support this credit card type.</div>' +
    '</div>' +
    '<div>' +
    '<input class="form-control form-right inspectletIgnore" id="billingCardNumber" maxlength="16"' +
    'name="billingCCNumber" ph=""' +
    'title="Credit card number" type="tel" ng-model="$ctrl.state.bindRequest.CreditCard.Number" ' +
    'billing-utility="$ctrl.form" '+
    'required/>' +
    '<span class="pf animated"' +
    'ng-class="$ctrl.getCreditCardIssuer($ctrl.state.bindRequest.CreditCard.Number)"' +
    '</span>' +
    '</div>' +
    '</div>' +
    '<!-- Card expiration date -->' +
    '<div class="form-group"' +
    'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.billingExpDate.$invalid]">' +
    '<label class="control-label form-left">Expiration date</label>' +

    '<div ng-messages="$ctrl.form.billingExpDate.$error" ng-if="$ctrl.state.formSubmitted">' +
    '<div ng-message="required">Please enter the expiration date.</div>' +
    '<div ng-message="invalidFormat">Please enter a valid expiration date.</div>' +
    '<div ng-message="pastDate">Credit card expiration date can not be expired.</div>' +
    '</div>' +
    '<input class="form-control form-right inspectletIgnore" id="billingExpDate" name="billingExpDate"' +
    'title="Expiration date" type="tel"' +
    'ng-model-options="{ updateOn: \'blur\' }"' +
    'ng-model="$ctrl.state.bindRequest.CreditCard.ExpirationDate" ui-mask="99/9999"' +
    'ui-validate="{pastDate : \'$ctrl.checkExpirationDate($value)\'}" ' +
    'required/>' +
    '</div>',
    controller: ['LookupDataService', function ( lookupDataService) {

      this.cardTypes = lookupDataService.getCreditCardLookups();

      var form = this.form;

      this.getCreditCardIssuer = function (value) {
        if (value) {
         var cardIssuer = _.find(this.cardTypes, function(cardType){
            var testExpression = cardType.Meta.RexgexCCType;
           var patt = new RegExp(testExpression);
           var res = patt.test(value);
           return patt.test(value)
         });
          if(cardIssuer){
            this.state.bindRequest.CreditCard.CardIssuer = cardIssuer.Value;
            return cardIssuer.Meta.Class;
          }
        }
      };

      this.checkExpirationDate = function (value) {
        if (value) return checkExpirationDate(value, this.state.bindRequest, form)
      };
    }]
  }

}

/**
 * Created by gabello on 1/7/2015.
 */
function CreditCardValidator() {
  'use strict';

  var isValidLuhnNumber = function (value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    if (value.length < 13) return false;

    if (/^(34)|^(37)/.test(value)) {
      //American Express Length 15
      if (value.length != 15)
        return false;
    }
    else if (/^(6011)|^(622(1(2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9([01][0-9]|2[0-5])))|^(64[4-9])|^65/.test(value)) {
      //Discover Length 16
      if (value.length != 16)
        return false;
    }
    else if (/^5[1-5]/.test(value)) {
      //MasterCard Length 16
      if (value.length != 16)
        return false;
    }
    else if (/^4/.test(value)) {
      //Visa Length - 13, 16
      if(value.length != 13 && value.length != 16)
        return false;
    } else {
      return false;
    }

    // The Luhn Algorithm. It's so pretty.
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
        nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) == 0;
  };

  var isAllDigits = function(propertyValue) {
    return /^\d+$/.test(propertyValue);
  };

  return function () {
    return {
      priority:200,
      require: '?ngModel',
      restrict: 'A',
      link: function (scope, element, attrs, ctrl) {

        ctrl.$parsers.push(parser);

        function parser(value) {
          if(!value){
            return value;
          }

          if(isAllDigits(value) && isValidLuhnNumber(value)){
            ctrl.$setValidity('invalidCard', true);
          }else{
            ctrl.$setValidity('invalidCard', false);
          }
          return value;
        }
      } //link
    };
  }
}

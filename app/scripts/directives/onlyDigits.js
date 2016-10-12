/**
 * Created by gabello on 12/29/2014.
 */
function DigitsOnly() {
  'use strict';
  return function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
              return digits;
            }
            return parseInt(digits,10).toString();
          }
          return val;
        }
        ctrl.$parsers.push(inputValue);
      }
    };
  }
}

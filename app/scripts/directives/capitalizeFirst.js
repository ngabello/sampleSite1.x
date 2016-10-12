/**
 * Created by gabello on 2/3/2015.
 */
function CapitalizeFirst() {
  'use strict';
  return ['$parse', function ($parse) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        var capitalize = function(inputValue) {
          if(!inputValue){
            return inputValue;
          }
          var capitalized = inputValue.charAt(0).toUpperCase() +
            inputValue.substring(1);
          if(capitalized !== inputValue) {
            modelCtrl.$setViewValue(capitalized);
            modelCtrl.$render();
          }
          return capitalized;
        };
        var model = $parse(attrs.ngModel);
        modelCtrl.$parsers.push(capitalize);
        capitalize(model(scope));
      }
    };
  }]
}

/**
 * Created by jholloman on 2/4/2016.
 * description: fixes the display value and validates the occupation type ahead
 */
'use strict';
function OccupationDirective(){
  return [function(){
    return {
      require: 'ngModel',
      restrict: 'A',
      scope:{
        occupations: '='
      },
      link: function (scope, element, attr, ctrl) {
        function formatter(val) {
          if(val) {
            var found = _.find(scope.occupations, {Value: val});
            if (found) {
              ctrl.$setValidity('required', true);
              ctrl.$setValidity('list', true);
              return found.Desc;
            } else {
              ctrl.$setValidity('list', false);
            }
          }
        }
        ctrl.$formatters.push(formatter);
      }
    };
  }]
}

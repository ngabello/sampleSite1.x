/**
 * Created by jholloman on 10/17/2014.
 */
function ngOptimizely() {
  'use strict';
  return function () {
    return {
      link: function (scope, el, att) {
        function fn() {
          setflowtype();
          window.scrollTo(0, 0);
          window['optimizely'] = window['optimizely'] || [];
          window['optimizely'].push(["activate"]);
        }
        fn();
      }
    }
  }

}

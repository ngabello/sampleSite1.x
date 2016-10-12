/**
 * Created by jholloman on 8/7/2015.
 */
'use strict';
function SingleClick() {
  return ['$timeout', '$q', function ($timeout, $q) {
    return {
      link: function (sc, el, at) {


        var counter = [];
        var i = 0;

        function clearArray(e) {
          counter = [];
        }

        var fn = function (evt) {
          if (evt.type === "click") {
            if (counter.length >= 1) {
              if (sc.click) {
                evt.preventDefault();
                //cancel previous timeout so we can start a new one
                //keeps them from double clicking
                $timeout.cancel(sc.click);
              }
              //create timeout promise
              sc.click = $timeout(clearArray, 1000);
            }
            counter.push(i++);
          }
        };
        el.on('click', fn);
      }
    }
  }]
}

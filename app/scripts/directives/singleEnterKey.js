/**
 * Created by jholloman on 8/11/2015.
 */
'use strict';
function SingleEnterKey(){
  return ['$timeout', '$q', function ($timeout, $q) {
    return {
      link: function (sc, el, at) {


        var counter = [];
        var i = 0;

        function clearArray(e) {
          counter = [];
        }

        var fn = function (evt) {
          if (evt.keyCode === 13) {
            if (counter.length >= 1) {
              if (sc.enter) {
                evt.preventDefault();
                //cancel previous timeout so we can start a new one
                //keeps them from holding the stupid enter button down
                $timeout.cancel(sc.enter);
              }
              //create timeout promise
              sc.enter = $timeout(clearArray, 1000);
            }
            counter.push(i++);
          }
        };
        $(window).on('keydown', fn);
      }
    }
  }]
}

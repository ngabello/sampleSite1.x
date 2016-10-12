/**
 * Created by jholloman on 8/10/2015.
 */
'use strict';
function OptimizelyEasteregg() {
  return ['$document', '$window', '$timeout', function ($document, $window, $timeout) {
    return {
      link: function (sc, el, at) {

        var body = $document[0].body;
        var keys = [];

        function optimizelyStuff() {
          if ($window.optimizely) {
            var active = $window.optimizely.data.state.activeExperiments || [];
            var runningNames = [];
            _.each(active, function (item) {
              if (item) {
                return runningNames.push($window.optimizely.data.experiments[item].name);
              }
            });
            return runningNames;
          }
        }
        function clearKeys() {
          keys = [];
        }
        $(window).on('keypress', function (event) {
          var key = event.keyCode;
          //code is showtests
          if (key === 104 || key === 111 || key === 119 || key === 116 || key === 101 || key === 115 || key === 116) {
            if (keys.length < 9) {
              keys.push(key);
              if (keys.length === 9) {
                if (keys[0] === 115 && keys[1] === 104 && keys[2] === 111 && keys[3] === 119 &&
                  keys[4] === 116 && keys[5] === 101 && keys[6] === 115 && keys[7] === 116 && keys[8] === 115) {
                  //show things from the optimizely javascript api
                  return alert('Test Currently Running:  ' + optimizelyStuff());
                }
              }
            }
          }
          //clear the array after a few second of not typing and start over
          //but restart counter after every key press for people who type super slow
          if(sc.egg){
            $timeout.cancel(sc.egg);
          }
          sc.egg = $timeout(clearKeys, 2000);
        });

      }
    }
  }]
}

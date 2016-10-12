/**
 * Created by jholloman on 2/12/2015.
 */
'use strict';
function mobilePlanSummary(){
  return function(){
    return{
      templateUrl: '../scripts/directives/views/mobile-plan-summary.tpl.html',
      controller: mobilePlanSummary(),
      link: function(scope, el, at){
        $('body').jvmobilemenu({

// selector to click outside menu to close
          notMenuClick: $('.page'),

// speed to open and close menu
          slideSpeed: 0.3,

// width of the mobile menu
          menuWidth: 240
        });
        //close the loop
        scope.$on('$destroy', function () {
          $(window).resize()
        })
      }
    }
  }
}

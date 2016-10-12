/**
 * Created by jholloman on 2/9/2015.
 */

'use strict';
function mobileNavSummary() {
  return function () {
    return {
      templateUrl: '../scripts/directives/views/mobile-quote-navigation.tpl.html',
      controller: navSharedCtrl(),
      link: function (scope, el, at) {

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

/**
 * Created by jholloman on 12/23/2014.
 */
'use strict';

function planSummary(){
  return function(){
    return{
      templateUrl: '../scripts/directives/views/plan-summary.tpl.html',
      controller: planSharedCtrl(),
      link: function(scope, el, at){

      }
    }
  }
}

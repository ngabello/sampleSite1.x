/**
 * Created by jholloman on 1/12/2016.
 */
'use strict';

function StaticDirective(){
  return ['driverTemplates', '$compile', '$timeout', function(driverTemplates, $compile, $timeout){
    return {
      scope: {
        form: '=',
        state: '=',
        tpl: '@'
      },
      link: function(sc, el, at){
        el.replaceWith($compile(driverTemplates[at.tpl])(sc));
      }
    }
  }]
}

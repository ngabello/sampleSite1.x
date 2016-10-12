/**
 * Created by gabello on 4/13/2016.
 */
function EventService() {
  'use strict';

  return [ function () {
    return {
      events: [],

      addEvent: function (func) {
        if(typeof func === 'function'){
          return this.events.push(func);
        }
        if(Array.isArray(func)){
          var service = this;
          _.forEach(func, function(item){
            service.events.push(item);
          })
        }

      },

      updateMap: function () {
        this.events.forEach(function (func) {
          func.call();
        });
      },

      clearMap: function(){
        this.events = [];
      }
    };
  }];
}

/**
 * Created by jholloman on 1/9/2015.
 */
function ssnMask() {
  return[function(){
    return {
      require: 'ngModel',
      link: function (scope, el, at, model) {
        el.blur(function () {
          el.attr('type', 'password')
          //console.log('hey')
        })

        el.focus(function () {
          el.attr('type', 'tel');
        })

      }
    }
  }]
}

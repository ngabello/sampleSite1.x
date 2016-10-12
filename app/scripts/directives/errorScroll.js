/**
 * Created by jholloman on 5/26/2015.
 */
'use strict';
function errorScroll(){
  return function(){
    return{
      link: function(scope, el, at){
        var body = $('html, body');
        function fn(){
          $('#btnContinue').click(function() {
            if ($('div').hasClass('has-error')) {
              body.animate({
                scrollTop: $('body .has-error').offset().top - 78
              }, 500);
            }
          });
          scope.$on('scrollToTop', function(){
            body.animate({
              scrollTop: $('html, body').offset().top
            }, 500);
          })
        }
        scope.$on('$destroy', fn());
      }
    }
  }
}

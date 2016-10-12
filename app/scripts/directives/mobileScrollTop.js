/**
 * Created by jholloman on 2/20/2015.
 */
function mobileScrollTop(){
  return function(){
    return{
      link: function(scope, el, at){
        scope.$on('updateView', function(){
          $('html, body').animate({
            scrollTop: $('html, body').offset().top
          }, 500);
        })
      }
    }
  }
}

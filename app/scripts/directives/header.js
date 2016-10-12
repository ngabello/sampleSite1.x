/**
 * Created by jholloman on 12/16/2014.
 */
function header(){
  return[function(){
    return{
      link: function(scope, el, at){
        $(window).scroll(function() {
          if($(window).scrollTop() >= 20) {
            el.removeClass('scroll-header-inactive').addClass('scroll-header-active');
          }else{
            el.removeClass('scroll-header-active').addClass('scroll-header-inactive');
          }
        })
      }
    }
  }]
}

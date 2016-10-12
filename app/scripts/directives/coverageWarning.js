/**
 * Created by jholloman on 3/9/2015.
 */
function coverageWarning(){
  return ['$timeout', function($timeout){
    return{
      link: function(scope,el,at){
        scope.$on('addCoverage', function(){
          _.each(scope.invalidVehicles, function(list){
            $('#'+ list.VehicleId + ' .' + list.CompCode).addClass('has-error');
            $('#'+ list.VehicleId + ' .' + list.CollCode).addClass('has-error');
          });
          $timeout(function(){
            if ($('div').hasClass('has-error')) {
              $('html, body').animate({
                scrollTop: $('body .has-error').offset().top - 81
              }, 500);
            }
          }, 300)

        })



      }
    }
  }]
}

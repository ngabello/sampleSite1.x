/**
 * Created by gabello on 6/9/2016.
 */
function ValidateSubmit() {
  'use strict';
  return [ '$log', 'EventService', '$document', '$timeout', function ($log, eventService, $document, $timeout) {
      return {
        restrict: 'A',
        link: function( scope , element , attributes )
        {
          var inProcess = false;

          var $element = angular.element(element);
          var body = $('html, body');

          // Add novalidate to the form element.
          attributes.$set( 'novalidate' , 'novalidate' );

          $element.bind( 'submit' , function( e ) {
            if(inProcess){
              console.log('to many presses');
              return;
            }
            inProcess = true;
            e.preventDefault();

            // Remove the class pristine from all form elements.
            $element.find( '.ng-pristine' ).removeClass( 'ng-pristine' );

            // Get the form object.
            var form = scope[ attributes.name ];
            //set form submitted
            form['submitted'] = true;
            //Fires all events in the queue
            eventService.updateMap();

            // Do not continue if the form is invalid.
            if ( form.$invalid ) {

              $log.log(form);
               //Focus on the first field that is invalid.
              var error = $element.find('.ng-invalid');
              if(error){
                //fix timing issue
                $timeout(function(){
                  body.animate({
                    scrollTop: error.first().offset().top - 78
                  }, 500);
                })
              }
              inProcess = false;
              return scope.$apply();
            }
            // From this point and below, we can assume that the form is valid.
            scope.$eval( attributes.validateSubmit );
            form['submitted'] = false;
            scope.$apply();
            inProcess = false;
          });
        }
      };
    }]
}

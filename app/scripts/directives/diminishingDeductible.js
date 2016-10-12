/**
 * Created by jholloman on 5/11/2015.
 */
'use strict';
function diminishingDeductible(){
  return ['$timeout', function($timeout){
    return{
      link: function(sc, el, at){
        var fn = function() {
          $.snackbar('hide');
          sc.DDAccordian = sc.DDAccordian || {};
          var options1 = {
            content: "Your vehicles are eligible for <a>diminishing deductible</a>", // html of the snackbar
            style: "toast", // add a custom class to your snackbar
            htmlAllowed: true, // allows HTML as content value
            timeout: 6000 // time in milliseconds after the snackbar autohides, 0 is disabled
          };
          var options2 = {
            content: "Your vehicles are no longer eligible for <a>diminishing deductible</a>",
            style: "toast",
            htmlAllowed: true,
            timeout: 6000
          };
          var body = $('html, body');

          $('#snackbar-container').click(function(){
            sc.coverageGroup.open = true;
            sc.addons.open = true;
            $timeout(function(){
              body.animate({
                scrollTop: $('#policy_addons').offset().top - 78
              }, 500)}, 100);

          });

          sc.$watch('addonModels.diminishingDeductible.eligible', function(nv, ov){
            if(nv){
              $('.snackbar').hide();
              $.snackbar(options1);
              // keeps initial false from triggering toast
            }else if(!nv && !ov){
              $.snackbar('hide');
            }else{
              sc.addonModels.diminishingDeductible.selectedValue = null;
              $('.snackbar').hide();
              $.snackbar(options2);
            }
          })
        };
        sc.$on('$destroy', fn());

      }
    }
  }]
}

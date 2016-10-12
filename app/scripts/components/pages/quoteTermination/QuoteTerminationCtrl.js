/**
 * Created by gabello on 4/14/2015.
 */
function QuoteTerminationCtrl(){
  'use strict';
  return['$scope', '$stateParams', 'ModalService', 'pachydermContactInfo','QuoteIntentModel', 'snackbar',
    function($scope, $stateParams, ModalService, pachydermContactInfo,quoteIntentModel, snackbar){

      snackbar.remove(1);

      /*Clear the QuoteIntentId from dataDocument, which redirects user to postal-code in case
      user tries to go back using browser back button */
      quoteIntentModel.clearQuoteIntentId();
    $scope.quoteTerminationSummary = {
      state: $stateParams.state,
      errorId: $stateParams.id,
      phoneData: pachydermContactInfo
    };
    $scope.launchAd = function(){
      ModalService.showMediaAlpha('Additional providers in your area', null, 'Quote Termination', 'Check out rates from these great companies')
    }
  }]
}

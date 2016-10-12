/**
 * Created by gabello on 11/14/2014.
 */
function IdleListener() {
    'use strict';

    return ['$rootScope', '$idle', '$uibModal', '$location', 'segmentIoTrackingService', 'QuoteIntentModel', 'JourneyService',
      function ($rootScope, $idle, $uibModal, $location, segmentIoTrackingService, quoteIntentModel, journeyService) {

        $rootScope.started = false;

        function closeModals() {
            if ($rootScope.warning) {
                $rootScope.warning.close();
                $rootScope.warning = null;
            }

            if ($rootScope.timedout) {
                $rootScope.timedout.close();
                $rootScope.timedout = null;
            }
        }

        $rootScope.$on('$idleStart', function() {
          console.log('Idle Start');
            $rootScope.warning = $uibModal.open({
                templateUrl: '../scripts/services/platform/Idle/templates/idleModal.html',
                iconClass: 'alert-warning',
                controller: 'ModalInstanceCtrl'
            });
        });

        $rootScope.$on('$idleEnd', function() {
            closeModals();
        });

        $rootScope.$on('$idleTimeout', function() {
          console.log('Idle Timeout');
          segmentIoTrackingService.trackCustomEvent('sessionEnd', [{key: 'quoteIntentId', value: quoteIntentModel.getQuoteIntentId()}]);
            closeModals();
            $idle.unwatch();

            if(/congratulations/ig.test($location.path().toLowerCase())){
              var policy = quoteIntentModel.getPolicy();
              var policyHolder = quoteIntentModel.getPolicyHolder();
              journeyService.redirectJourney(String.format('https://mypolicy.pachyderm.com/users/sign_up?pId={0}&lName={1}',policy.PolicyNumber, policyHolder.LastName));
              return;
            }

            window.location.href = $location.absUrl().split('#')[0] + '#/quote-retrieve?to=true&lastview='+$location.path();
        });
    }];
}

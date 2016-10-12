/**
 * Created by gabello on 10/14/2014.
 */
function PaymentCtrl() {
  'use strict';
  return ['$scope', '$state', 'QuoteIntentModel', 'JourneyService', 'ModalService', 'errorService', 'messageService', 'goApiDataService', 'ModelHelper', 'spinnerService', 'segmentIoTrackingService', 'legalAssistService',
    function ($scope, $state, quoteIntentModel, journeyService, ModalService, errorService, messageService, goApiDataService, modelHelper, spinnerService, segmentIoTrackingService, legalAssistService) {

      journeyService.validatePolicyState();

      $scope.paymentCtrlState = {
        quote: quoteIntentModel.getQuote(),
        payment: quoteIntentModel.getPayment(),
        quoteState: quoteIntentModel.getQuoteState(),
        state: quoteIntentModel.getAddress().State,
        paymentPlans: null,
        downPaymentAmount: 'DownPaymentAmount',
        policy :quoteIntentModel.getPolicy(),
        isLegalSelected : false,
        legalCost: legalAssistService.getLegalAssistCost(),
        //showLegal : true,
        paymentPlanId: quoteIntentModel.getPayment() ? quoteIntentModel.getPayment().PayPlan.ID : null
      };
      //getLegalAssistCost
       var legalobj = _.find($scope.paymentCtrlState.policy.AvailableCoverages, {Name: 'EISPALegalPlanCov'});
       if(legalobj.SelectedValue == "LPFull"){
         $scope.paymentCtrlState.isLegalSelected = true;
         //$scope.paymentCtrlState.showLegal = false;
       }

      if (!$scope.paymentCtrlState.payment) {
        $scope.paymentCtrlState.payment = modelHelper.createPayment();
      }
      //Get the last 2 quotes and see if there is a difference
      var howManyQuotes = $scope.paymentCtrlState.quoteState.QuoteHistory.length;
      $scope.paymentCtrlState.lastQuote = $scope.paymentCtrlState.quoteState.QuoteHistory[howManyQuotes -1].TotalPremium;
      //for whatever reason I cannot figure out there should always be 2 or more quotes but sometimes there are not
      if(howManyQuotes > 1) {
        $scope.paymentCtrlState.previousQuote = $scope.paymentCtrlState.quoteState.QuoteHistory[howManyQuotes - 2].TotalPremium;
      }else{
        $scope.paymentCtrlState.previousQuote = 0;
      }
      if($scope.paymentCtrlState.lastQuote !== $scope.paymentCtrlState.previousQuote){
        segmentIoTrackingService.trackCustomEvent('PremiumChanged', [{key: 'originalPremium', value: $scope.paymentCtrlState.previousQuote},
          {key: 'newPremium', value: $scope.paymentCtrlState.lastQuote}])
      }

      $scope.paymentCtrlState.paymentPlans = $scope.paymentCtrlState.quote.PayPlans;

      $scope.setPayPlan= function(planId){
         if(planId){
           $scope.paymentCtrlState.paymentPlanId = planId;
         }
      };

      var selectLegalPlan = function(){
        var legalobj = _.find($scope.paymentCtrlState.policy.AvailableCoverages, {Name: 'EISPALegalPlanCov'});
        legalobj.SelectedValue = $scope.paymentCtrlState.isLegalSelected ? "LPFull" : "LPNone";
        $scope.paymentCtrlState.policy.save();
      };

      $scope.submitPayPlan = function () {
        selectLegalPlan();
        $scope.paymentCtrlState.payment.PayPlan = _.findWhere($scope.paymentCtrlState.paymentPlans, {ID: $scope.paymentCtrlState.paymentPlanId});
        $scope.paymentCtrlState.payment.save();
        spinnerService.show('paymentSpinner');
        goApiDataService.getQuote().then(function () {
          var quote = quoteIntentModel.getQuote();
          segmentIoTrackingService.trackCustomEvent('Requote', [{key: 'totalPremium', value: quote.TotalPremium}]);
          journeyService.getNextStep(null, null);
        }, function (error) {
          errorService.showSystemError('PaymentCtrl: call to quote resulted with error ', error);
        });
      };

      $scope.compare = function () {
        return ModalService.showMediaAlpha('Need a second opinion?', '', 'Payment', 'Check out rates from these great companies');
      };

      $scope.changeModal = function () {
        messageService.showQuoteChangeReason();
      };
      $scope.planView = function (item) {
        var plan = item.split(':')[1];
        var plans = [{Full: 'Pay in Full'}, {TwoPaysRecur: 'Semi-Annual'}, {AutoMnth: 'Monthly B'}, {OneHalf: 'Monthly A'}, {OneMonthDown: 'Monthly'}];
        return _.find(plans, plan)[plan];
      };
      $scope.information = function (item) {
        messageService.showQuoteMessage(item, quoteIntentModel.getAddress().State);
      };
    }
  ];
}

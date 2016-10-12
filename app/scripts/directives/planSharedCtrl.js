/**
 * Created by jholloman on 2/12/2015.
 */

'use strict';
function planSharedCtrl(){
  return ['$scope', 'QuoteIntentModel', function($scope, quoteIntentModel){
    $scope.planSummary = {
      discounts: quoteIntentModel.getQuote().getDiscounts(),
      quote: quoteIntentModel.getQuote(),
      paymentPlan: quoteIntentModel.getPayment(),
      address: quoteIntentModel.getAddress(),
      policy: quoteIntentModel.getPolicy(),
      drivers: quoteIntentModel.getDrivers(),
      vehicles: quoteIntentModel.getVehicles(),
      policyHolder: quoteIntentModel.getPolicyHolder()
    };

    $scope.discountFilter = function(item){
      return item.Desc !== 'Channel/Affinity Discount';
    };
    $scope.toggle = function(menu){
      switch (menu) {
        case 'drivers':
          $scope.driversOpen = $scope.driversOpen? false : true;
          break;
        case 'vehicles':
          $scope.vehiclesOpen = $scope.vehiclesOpen? false : true;
          break;
        default :
          break;
      }


    }
  }]
}

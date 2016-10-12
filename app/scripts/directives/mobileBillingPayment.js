/**
 * Created by jholloman on 2/12/2015.
 */
'use strict';
function mobileBillingPayment(){
  return function(){
    return{
      templateUrl: '../scripts/directives/views/mobile-billing-payment.tpl.html',
      controller: planSharedCtrl()
    }
  }
}

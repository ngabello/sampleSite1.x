/**
 * Created by vyom.sharma on 02-01-2015.
 */


var Payment = function()
{
  this.stepPaymentPlan=by.id('step-payment-plan');
  this.paymentPlans=by.repeater('paymentPlan in paymentSummary.paymentPlans');

  this.clickContinue = function(key)
  {
    element(this.stepPaymentPlan).all(this.paymentPlans).then
    (
      function(_paymentPlans)
      {
        console.log("_paymentPlans.length= "+_paymentPlans.length);
        for(var i=0;i<_paymentPlans.length;i++)
        {
          (
            function(i)
            {
              //console.log("Executing Payment for i= "+i);
              _paymentPlans[i].all(by.tagName('span')).get(1).getText().then
              (
                function(planName)
                {
                  console.log("Key= "+key);
                  console.log("Payment Plan= "+planName);
                  if(planName==key)
                  {

                    console.log("Inside if Payment Plan= "+planName);
                    _paymentPlans[i].all(by.tagName('button')).click();
                    return true;
                  }
                },
                function()
                {
                  //console.log("Executing Payment error for i= "+i);
                  return false;
                }
              );
            }
          )(i)
        }
      }

    );
  };
};

module.exports = Payment;

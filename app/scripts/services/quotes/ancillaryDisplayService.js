/**
 * Created by jholloman on 7/13/2015.
 */
'use strict';
function AncillaryDisplayService(){
  return ['PolicyModel', 'QuoteIntentModel',  function(policyModel, quoteIntentModel){
    return {
      getAncillaryDisplay: function(){
        var driver = quoteIntentModel.getPolicyHolder();
        if(driver.ResidenceOwnership !== 'Other'){
          if(driver.ResidenceOwnership == 'Rent'){
            if(policyModel.HasMotorcycle){
              return{
                name: 'RentBundle',
                link: 'http://www.pachyderm.com/car-insurance/bundling-insurance'
              }
            }
            return {
              name: 'Renters',
              link: 'http://www.pachyderm.com/renters-insurance'
            }
          }
          else{
            if(policyModel.HasMotorcycle){
              return {
                name: 'Bundle',
                link: 'http://www.pachyderm.com/car-insurance/bundling-insurance'
              };
            }else{
              return {
                name: 'HomeOwners',
                link: 'http://www.pachyderm.com/homeowners-insurance'
              }
            }
          }
        }else{
          return {
            name: 'LegalPlan'
          }
        }
      }
    }
  }]
}

/**
 * Created by gabello on 12/19/2014.
 */
function CoverageValidationService() {
  'use strict';

  function HasValue(item){
    return !_.isUndefined(item) && !_.isNull(item) && item !== 'none' && item !== '@none';
  }

  function ParseValue(item){
    if(!isNaN(item)){
      return parseInt(item,10);
    }
    return 0;
  }

  //Gets the RuleLimit meta value for the selected coverage
  function GetRuleLimit(coverage){
    if(!coverage || !coverage.Items || !coverage.SelectedValue){
      return null;
    }
    var item = _.findWhere(coverage.Items,{Value: coverage.SelectedValue});
    if(item && item.Meta && item.Meta.RuleLimit){
      var metaValue = item.Meta.RuleLimit;
      return ParseValue(metaValue);
    }else{
      return null;
    }
  }

  //Rule #1 Uninsured/Underinsured Motorist Bodily Injury is required.
  function Rule1(lineCoverages) {
    var umbiCoverage = _.findWhere(lineCoverages, {Name: 'PAUMBICov'});

    return {
      errorElement: 'PAUMBICov',
      errorIdentifier: 'Rule1',
      isValid: HasValue(umbiCoverage.SelectedValue)
    };
  }

  //Rule #2 Uninsured/Underinsured Motorist Property Damage is required
  function Rule2(lineCoverages) {
    var umpdCoverage = _.findWhere(lineCoverages, {Name: 'PAUMPDCov'});

    return {
      errorElement: 'PAUMPDCov',
      errorIdentifier: 'Rule2',
      isValid: HasValue(umpdCoverage.SelectedValue)
    };
  }

  //Rule #100 Property Damage limit cannot exceed Per Person BI limit.
  function Rule100(lineCoverages) {
    var bodilyInjuryCoverage = _.findWhere(lineCoverages, {Name: 'EISPABodilyInjuryCov'});
    var propertyDamageCoverage = _.findWhere(lineCoverages, {Name: 'EISPAPropertyDamageCov'});

    var bodilyInjuryMeta = GetRuleLimit(bodilyInjuryCoverage);
    var propertyDamageMeta = GetRuleLimit(propertyDamageCoverage);

    return {
      errorElement: 'EISPAPropertyDamageCov',
      errorIdentifier: 'Rule100',
      isValid: ((bodilyInjuryMeta != null && propertyDamageMeta != null) && (propertyDamageMeta <= bodilyInjuryMeta))
    };
  }

  //Rule #101 Uninsured/Underinsured Motorist Bodily Injury limits may not exceed Bodily Injury Limits.
  function Rule101(lineCoverages){
    var biCoverage = _.findWhere(lineCoverages, {Name: 'EISPABodilyInjuryCov'});
    var umbiCoverage = _.findWhere(lineCoverages, {Name: 'PAUMBICov'});

    var biMeta = GetRuleLimit(biCoverage);
    var umbiMeta = GetRuleLimit(umbiCoverage);

    return{
      errorElement: 'PAUMBICov',
      errorIdentifier: 'Rule101',
      isValid: ((biMeta != null && umbiMeta != null) && (umbiMeta <= biMeta))
    };
  }

  //Rule #103 Uninsured/Underinsured Motorist Property Damage  limits may not exceed Property Damage Limits.
  function Rule103(lineCoverages){
    var pdCoverage = _.findWhere(lineCoverages, {Name: 'EISPAPropertyDamageCov'});
    var umpdCoverage = _.findWhere(lineCoverages, {Name: 'PAUMPDCov'});

    var pdMeta = GetRuleLimit(pdCoverage);
    var umpdMeta = GetRuleLimit(umpdCoverage);

    return{
      errorElement: 'PAUMPDCov',
      errorIdentifier: 'Rule103',
      isValid: ((pdMeta != null && umpdMeta != null) && (umpdMeta <= pdMeta))
    };
  }

  //Rule #104 Uninsured/Underinsured Motorist Bodily Injury limits must be the same as Bodily Injury limits.
  function Rule104(lineCoverages){
    var biCoverage = _.findWhere(lineCoverages, {Name: 'EISPABodilyInjuryCov'});
    var umbiCoverage = _.findWhere(lineCoverages, {Name: 'PAUMBICov'});

    var biMeta = GetRuleLimit(biCoverage);
    var umbiMeta = GetRuleLimit(umbiCoverage);

    return{
      errorElement: 'PAUMBICov',
      errorIdentifier: 'Rule104',
      isValid: ((biMeta != null && umbiMeta != null) && (biMeta == umbiMeta))
    };
  }

  //Rule #105 Uninsured/Underinsured Motorist Property Damage must be the same as Property Damage Liability limits
  function Rule105(lineCoverages){
    var pdCoverage = _.findWhere(lineCoverages, {Name: 'EISPAPropertyDamageCov'});
    var umpdCoverage = _.findWhere(lineCoverages, {Name: 'PAUMPDCov'});

    var pdMeta = GetRuleLimit(pdCoverage);
    var umpdMeta = GetRuleLimit(umpdCoverage);

    return{
      errorElement: 'EISPAPropertyDamageCov',
      errorIdentifier: 'Rule105',
      isValid: ((pdMeta != null && umpdMeta != null) && (pdMeta == umpdMeta))
    };
  }

  //Rule #106 Uninsured/Underinsured motorist property damage coverage is only available with uninsured motorist bodily injury coverage.
  function Rule106(lineCoverages){
    var umpdCoverage = _.findWhere(lineCoverages, {Name: 'PAUMPDCov'});
    var umbiCoverage = _.findWhere(lineCoverages, {Name: 'PAUMBICov'});

    var isValid = true;
    if((HasValue(umpdCoverage.SelectedValue) && !HasValue(umbiCoverage.SelectedValue)) ){
      isValid = false;
    }

    return{
      errorElement: 'PAUMPDCov',
      errorIdentifier: 'Rule106',
      isValid: isValid
    };
  }

  //Rule #107 Uninsured/Underinsured motorist bodily injury coverage is only available with uninsured motorist property damage coverage.
  function Rule107(lineCoverages){

    var umbiCoverage = _.findWhere(lineCoverages, {Name: 'PAUMBICov'});
    var umpdCoverage = _.findWhere(lineCoverages, {Name: 'PAUMPDCov'});

    var isValid = true;
    if((HasValue(umbiCoverage.SelectedValue) && !HasValue(umpdCoverage.SelectedValue)) ){
      isValid = false;
    }

    return{
      errorElement: 'PAUMBICov',
      errorIdentifier: 'Rule107',
      isValid: isValid
    };
  }

  //Rule #108 Users can only select collision or UMPD coverage; they cannot have both.
  function Rule108(vehicleCoverages){
    var collCoverage = _.findWhere(vehicleCoverages, {Name: 'PACollisionCov'});
    var umpdCoverage = _.findWhere(vehicleCoverages, {Name: 'EISPAUMPD_ILCov'});
    return{
      errorElement: 'EISPAUMPD_ILCov',
      errorIdentifier: 'Rule108',
      isValid: !(HasValue(collCoverage.SelectedValue) && HasValue(umpdCoverage.SelectedValue))
    };
  }

  //Rule #109 Collision coverage cannot be selected without comprehensive coverage
  function Rule109(vehicleCoverages)
  {
    var compCoverage = _.findWhere(vehicleCoverages, {Name: 'PAComprehensiveCov'});
    var collCoverage = _.findWhere(vehicleCoverages, {Name: 'PACollisionCov'});

    var isValid = true;
    if((HasValue(collCoverage.SelectedValue) && !HasValue(compCoverage.SelectedValue)) ){
      isValid = false;
    }

    return{
      errorElement: 'PACollisionCov',
      errorIdentifier: 'Rule109',
      isValid: isValid
    };
  }

  //Rule #110 Your comprehensive deductible cannot exceed your collision deductiblee
  function Rule110(vehicleCoverages){
    var compCoverage = _.findWhere(vehicleCoverages, {Name: 'PAComprehensiveCov'});
    var collCoverage = _.findWhere(vehicleCoverages, {Name: 'PACollisionCov'});

    var isValid = true;
    if(HasValue(collCoverage.SelectedValue) && (ParseValue(compCoverage.SelectedValue) > ParseValue(collCoverage.SelectedValue))){
      isValid = false;
    }

    return {
      errorElement: 'PAComprehensiveCov',
      errorIdentifier: 'Rule110',
      isValid: isValid
    };
  }

  //Rule #112 Loan/Lease Payoff Coverage cannot be selected without Comprehensive and Collision.
  function Rule112(vehicleCoverages)
  {
    var compCoverage = _.findWhere(vehicleCoverages, {Name: 'PAComprehensiveCov'}) || {};
    var collCoverage = _.findWhere(vehicleCoverages, {Name: 'PACollisionCov'}) || {};
    var eispALoanGapCoverage = _.findWhere(vehicleCoverages, {Name: 'EISPALoanGapCov'}) || {};

    var isValid = true;
    if(HasValue(eispALoanGapCoverage.SelectedValue) && (!HasValue(collCoverage.SelectedValue) || !HasValue(compCoverage.SelectedValue))){
        isValid = false;
    }

    return{
      errorElement: 'EISPALoanGapCov',
      errorIdentifier: 'Rule112',
      isValid: isValid
    };
  }

  //Rule #113 Collision coverage is required for rental insurance to be added to a vehicle.
  function Rule113(vehicleCoverages){
    var rentalCoverage = _.findWhere(vehicleCoverages, {Name: 'PARentalCov'});
    var collCoverage = _.findWhere(vehicleCoverages, {Name: 'PACollisionCov'});

    var isValid = true;
    if(HasValue(rentalCoverage.SelectedValue) && (!HasValue(collCoverage.SelectedValue))){
      isValid = false;
    }

    return{
      errorElement: 'PACollisionCov',
      errorIdentifier: 'Rule113',
      isValid: isValid
    };
  }

  //Rule #114 Comprehensive coverage is required for rental insurance to be added to a vehicle.
  function Rule114(vehicleCoverages){
    var compCoverage = _.findWhere(vehicleCoverages, {Name: 'PAComprehensiveCov'});
    var rentalCoverage = _.findWhere(vehicleCoverages, {Name: 'PARentalCov'});

    var isValid = true;
    if(HasValue(rentalCoverage.SelectedValue) && (!HasValue(compCoverage.SelectedValue))){
      isValid = false;
    }

    return{
      errorElement: 'PAComprehensiveCov',
      errorIdentifier: 'Rule114',
      isValid: isValid
    };
  }

  //Rule #115 Additional Custom Parts or Equipment coverage may be purchased only for a vehicle covered by Comprehensive and Collision Coverages
  function Rule115(vehicleCoverages){
    var compCoverage = _.findWhere(vehicleCoverages, {Name: 'PAComprehensiveCov'});
    var customEquipmentCoverage = _.findWhere(vehicleCoverages, {Name: 'EISPACustEquipCov'});
    var collCoverage = _.findWhere(vehicleCoverages, {Name: 'PACollisionCov'});

    var isValid = true;
    if(HasValue(customEquipmentCoverage.SelectedValue) && (!HasValue(collCoverage.SelectedValue) || !HasValue(compCoverage.SelectedValue))){
      isValid = false;
    }

    return{
      errorElement: 'EISPACustEquipCov',
      errorIdentifier: 'Rule115',
      isValid: isValid
    };
  }

  //Rule #116 Additional Custom Parts or Equipment coverage may be purchased only for a vehicle covered by Comprehensive coverage.
  function Rule116(vehicleCoverages){
    var compCoverage = _.findWhere(vehicleCoverages, {Name: 'PAComprehensiveCov'});
    var customEquipmentCoverage = _.findWhere(vehicleCoverages, {Name: 'EISPACustEquipCov'});

    var isValid = true;
    if(HasValue(customEquipmentCoverage.SelectedValue) && (!HasValue(compCoverage.SelectedValue))){
      isValid = false;
    }

    return{
      errorElement: 'EISPACustEquipCov',
      errorIdentifier: 'Rule116',
      isValid: isValid
    };
  }

  //Diminishing Deductible main rule
  function DDRule(vehicleCoverages){
    var collisionCoverage = _.findWhere(vehicleCoverages, {Name: 'PACollisionCov'});
    var eligible = false;
    var collisionSelected = false;
    if(collisionCoverage.SelectedValue >=500){
      eligible = true;
    }
    if(collisionCoverage.SelectedValue > 0){
      collisionSelected = true;
    }
    return {DDTriggered: true, collisionSelected:collisionSelected, eligible: eligible}
  }

  return function() {
    return {

      validatePolicyCoverages: function (index, lineCoverages, currentState) {
        var validationResponse = [];
        var currentCoverage = lineCoverages[index];
        switch (currentCoverage.Name) {
          case 'EISPABodilyInjuryCov' :
            validationResponse.push(Rule100(lineCoverages));
            validationResponse.push(Rule101(lineCoverages));
            if(currentState === 'VA' || currentState === 'MD' || currentState == 'IL') {
              validationResponse.push(Rule104(lineCoverages));
            }
            break;
          case 'EISPAPropertyDamageCov':
            validationResponse.push(Rule100(lineCoverages));
            if(currentState === 'VA' || currentState === 'MD' || currentState == 'TX' || currentState === 'IN' || currentState == 'TN') {
              validationResponse.push(Rule103(lineCoverages));
            }
            if(currentState === 'VA' || currentState === 'MD') {
              validationResponse.push(Rule105(lineCoverages));
            }
            break;
          case 'PAUMBICov' :
            if(currentState === 'VA' || currentState === 'MD' || currentState == 'IL'){
              //Required for VA, MD, IL
              validationResponse.push(Rule1(lineCoverages));
            }
            validationResponse.push(Rule101(lineCoverages));
            if(currentState === 'VA' || currentState === 'MD' || currentState == 'IL') {
              validationResponse.push(Rule104(lineCoverages));
            }
            if(currentState !== 'IL') {
              validationResponse.push(Rule106(lineCoverages));
            }
            if(currentState === 'VA' || currentState === 'MD' || currentState == 'TX')
            {
              validationResponse.push(Rule107(lineCoverages));
            }
            break;
          case 'PAUMPDCov':
            if(currentState == 'VA' || currentState == 'MD') {
              //Required for VA, MD
              validationResponse.push(Rule2(lineCoverages));
            }
            if(currentState === 'VA' || currentState === 'MD' || currentState == 'TX' || currentState === 'IN' || currentState == 'TN') {
              validationResponse.push(Rule103(lineCoverages));
            }
            if(currentState === 'VA' || currentState === 'MD') {
              validationResponse.push(Rule105(lineCoverages));
            }
            validationResponse.push(Rule106(lineCoverages));
            if(currentState === 'VA' || currentState === 'MD' || currentState == 'TX')
            {
              validationResponse.push(Rule107(lineCoverages));
            }
            break;
          default:
        }//switch

        return validationResponse;
      },

      validateVehicleCoverages: function(vehicleFormItem, vehicleCoverages, currentState){
        var validationResponse = [];

        var code = vehicleFormItem.coverage.Name;

        switch(code){
          case 'PAComprehensiveCov':
            validationResponse.push(Rule109( vehicleCoverages));
            validationResponse.push(Rule110( vehicleCoverages));
            validationResponse.push(Rule112( vehicleCoverages));

            if(currentState !== 'VA') {
              validationResponse.push(Rule115( vehicleCoverages));
            }
            if(currentState === 'VA') {
              validationResponse.push(Rule114( vehicleCoverages));
              validationResponse.push(Rule116( vehicleCoverages));
            }
            break;
          case 'PACollisionCov':
            if(currentState === 'IL') {
              validationResponse.push(Rule108( vehicleCoverages));
            }
            validationResponse.push(Rule109( vehicleCoverages));
            validationResponse.push(Rule110( vehicleCoverages));
            validationResponse.push(Rule112( vehicleCoverages));
            validationResponse.push(DDRule( vehicleCoverages));
            if(currentState !== 'VA') {
              validationResponse.push(Rule113( vehicleCoverages));
              validationResponse.push(Rule115( vehicleCoverages));
            }
            break;
          case 'PATowingLaborCov':
            break;
          case 'PARentalCov':
            if(currentState !== 'VA') {
              validationResponse.push(Rule113( vehicleCoverages));
            }
            if(currentState === 'VA') {
              validationResponse.push(Rule114( vehicleCoverages));
            }
            break;
          case 'EISPALoanGapCov':
            validationResponse.push(Rule112( vehicleCoverages));
            break;
          case 'EISPAUMPD_ILCov' :
            if(currentState === 'IL') {
              validationResponse.push(Rule108( vehicleCoverages));
            }
            break;
          case 'EISPACustEquipCov' :
            if(currentState !== 'VA') {
              validationResponse.push(Rule115( vehicleCoverages));
            }
            if(currentState === 'VA') {
              validationResponse.push(Rule116( vehicleCoverages));
            }
            break;
          default:
        }//switch

        return validationResponse;
      }
    }
  };
}

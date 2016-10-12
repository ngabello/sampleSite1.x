var EnumMaritalStatuses = {
  Divorced: "D",
  Married: "M",
  NeverMarried: "S",
  Separated: "P",
  Widowed: "W",
  CivilUnion: "MCU"
};

var EnumRelationshipToInsureds = {
  Spouse: "spouse",
  Child: "child",
  Parent: "parent",
  OtherRelative: "otherrelative",
  NonResident: "nonresidentdriver",
  OtherNonRelative: "noneoftheabove"
};

var EnumEmploymentStatuses = {
  Employed: 'EmployedPrivately',
  Homemaker: 'HomeMaker',
  Retired: 'Retired',
  FulltimeStudent: 'FullStudent',
  Unemployed: 'Unemployed',
  ActiveMilitary: 'ServeMilitary',
  RetiredMilitary: 'RetiredMilitary'
};

var EnumLicenseStatuses = {
  Valid:'valid',
  Expired:'expired',
  NonLicensed:'nonlicensed',
  NonUS:'foreign',
  Permit:'permit',
  Surrendered:'surrendered',
  Suspended:'suspended',
  Restricted:'restricted',
  Revoked:'revoked'
};

var EnumVehicleOwnerships = {
  PaidOff:'PaidOff',
  MakePayments:'Other'
};

var EnumNoCurrentInsuranceReasons = {
  Noinsurancerequired:'just_acquired_auto',
  MyPolicyExpiredMoreThan30daysAgo: 'policy_expired_over_30days',
  MyPolicyExpired30daysAgoOrLess:'policy_expired_within_30days',
  DeployedOverseasWithTheMilitary:'military_overseas',
  OwnPolicy:'own_policy'
};

var getEnums = function(){
  return {
    EnumMaritalStatuses: EnumMaritalStatuses,
    EnumRelationshipToInsureds: EnumRelationshipToInsureds,
    EnumEmploymentStatuses: EnumEmploymentStatuses,
    EnumLicenseStatuses: EnumLicenseStatuses,
    EnumNoCurrentInsuranceReasons: EnumNoCurrentInsuranceReasons,
    EnumVehicleOwnerships: EnumVehicleOwnerships
  }
};

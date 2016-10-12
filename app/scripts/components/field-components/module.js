/**
 * Created by jholloman on 12/18/2015.
 */
angular.module('components.field', [])
  .constant('policyTemplates', PolicyTemplates())
  .directive('staticDirective', StaticDirective())
  //------------ Policy -------------------------//

  .component('ownMotorcycle', OwnMotorcycle())
  .component('policyStartDate', PolicyStartDate())

  //------------ Driver -------------------------//
  .component('birthDate', BirthDate())
  .component('emailAddress', EmailAddress())
  .component('driverName', DriverName())
  .component('phoneNumber', PhoneNumber())
  .component('gender', Gender())
  .component('maritalStatus', MaritalStatus())
  .component('maritalStatusLabel', MaritalStatusLabel())
  .component('residencyType', ResidencyType())
  .component('yearsAtResidence', YearsAtResidence())
  .component('educationLevel', EducationLevel())
  .component('employmentStatus', EmploymentStatus())
  .component('military', Military())
  .component('occupation', Occupation())
  .component('attendingSchool', AttendingSchool())
  .component('goodStudent', GoodStudent())
  .component('licenseStatus', LicenseStatus())
  .component('ageFirstLicensed', AgeFirstLicensed())
  .component('drivesTwice', DrivesTwice())
  .component('currentInsurance', CurrentInsurance())
  .component('insuranceReason', InsuranceReason())
  .component('insuranceLapse', InsuranceLapse())
  .component('insuranceCompany', InsuranceCompany())
  .component('yearsWithCompany', YearsWithCompany())
  .component('insurancePremium', InsurancePremium())
  .component('bodilyInjuryLimit', BodilyInjuryLimit())
  .component('otherDrivers', OtherDrivers())
  .component('vehiclesInZipcode', VehiclesInZipcode())
  .component('addDriver', AddDriver())
  .component('studentEnrollment', StudentEnrollment())
  .component('relationshipToInsured', RelationshipToInsured())
  .component('primaryVehicle', PrimaryVehicle())

  //----------- Vehicle -----------------------//
  .directive('vehicleYear', VehicleYear())
  .directive('vehicleMake', VehicleMake())
  .directive('vehicleModel', VehicleModel())
  .directive('vehicleBodyStyle', VehicleBodyStyle())
  .directive('antiTheft', AntiTheft())
  .component('customEquipment', CustomEquipment())
  .directive('primaryUse', PrimaryUse())
  .directive('ownershipUse', OwnershipUse())
  .directive('annualMileage', AnnualMileage())
  .directive('originalOwner', OriginalOwner())
  .directive('whenPurchased', WhenPurchased())
  .component('primaryDriver', PrimaryDriver())
  .component('addAVehicle', AddAVehicle())

  //----------- Address -----------------------//
  .component('garageAddress', GarageAddress())

  //----------- Payment -----------------------//
  .component('nameCreditCard', NameCreditCard())

  //----------- Disclaimers -----------------------//
  .component('userInfoDisclaimer', UserInfoDisclaimer())
  .component('authorizationDisclaimer', AuthorizationDisclaimer());


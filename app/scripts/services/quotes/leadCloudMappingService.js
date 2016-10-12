/**
 * Created by gabello on 1/6/2016.
 */
function LeadCloudMappingService() {
  'use strict';

  function mapMaritalStatus(maritalStatusCode) {
    var retVal;
    switch (maritalStatusCode) {
      case 'Civil Union':
        retVal = 'MCU';
        break;
      case 'Divorced':
        retVal = 'D';
        break;
      case 'Married':
        retVal = 'M';
        break;
      case 'Never married':
        retVal = 'S';
        break;
      case 'Separated':
        retVal = 'P';
        break;
      case 'Widowed':
        retVal = 'W';
        break;
      default :
        retVal = null;
    }
    return retVal;
  }

  function mapGenderCode(genderCode) {
    var retVal;
    switch (genderCode) {
      case 'M':
        retVal = 'Male';
        break;
      case 'F':
        retVal = 'Female';
        break;
    }
    return retVal;
  }

  function mapEducationLevelCode(educationLevelCode) {
    var retVal;
    switch (educationLevelCode) {
      case 'Lower than High School':
        retVal = 'lowerthanhighschool';
        break;
      case 'Masters':
        retVal = 'masters';
        break;
      case 'High School/GED':
        retVal = 'highschool';
        break;
      case 'Associates':
        retVal = 'associatevocational';
        break;
      case 'Bachelors':
        retVal = 'bachelors';
        break;
      case 'Vocational':
        retVal = 'associatevocational';
        break;
      case 'Doctorate':
        retVal = 'phdmdjd';
        break;
      default :
        retVal = null;
    }
    return retVal;
  }

  function mapResidenceOwnership(residenceOwnershipCode) {
    var retVal;
    switch (residenceOwnershipCode) {
      case 'Own home':
        retVal = 'home';
        break;
      case 'rent':
        retVal = 'rent';
        break;
      case 'other':
        retVal = 'other';
        break;
      case 'Own condo':
        retVal = 'condo';
        break;
      case 'OwnMobileHome':
        retVal = 'mobile_home';
        break;
      default :
        retVal = null;
    }
    return retVal;
  }

  function mapLicenseStatus(licenseStatusCode) {
    var retVal;
    switch (licenseStatusCode) {
      case 'valid':
        retVal = 'valid';
        break;
      case 'expired':
        retVal = 'expired';
        break;
      case 'revoked':
        retVal = 'revoked';
        break;
      case 'suspended':
        retVal = 'suspended';
        break;
      case 'restricted':
        retVal = 'restricted';
        break;
      case 'nonlicensed':
        retVal = 'nonlicensed';
        break;
      case 'permit':
        retVal = 'permit';
        break;
      case 'foreign':
        retVal = 'foreign';
        break;
      default :
        retVal = null;
    }
    return retVal;
  }

  function MapDriver(driver, leadDriver, document) {
    driver.FirstName = leadDriver.FirstName;
    driver.LastName = leadDriver.LastName;
    if (leadDriver.GenderCode) {
      driver.Gender = leadDriver.GenderCode;
    }
    if (leadDriver.Birthdate) {
      driver.DateOfBirth = moment.utc(leadDriver.Birthdate).format('MM-DD-YYYY');
    }
    if (leadDriver.MaritalStatusCode) {
      driver.MaritalStatus = mapMaritalStatus(leadDriver.MaritalStatusCode);
    }
    if (leadDriver.EducationLevelCode) {
      driver.HighestEducationLevel = mapEducationLevelCode(leadDriver.EducationLevelCode);
    }
    if (leadDriver.LicenseStatusCode) {
      driver.LicenseStatus = leadDriver.LicenseStatusCode;
    }
    if (document.Result.Policy && document.Result.Policy.ResidenceOwnedRentedCode) {
      driver.ResidenceOwnership = mapResidenceOwnership(document.Result.Policy.ResidenceOwnedRentedCode);
    }
    if (leadDriver.LicenseState) {
      driver.LicenseState = leadDriver.LicenseState;
    }
    if (leadDriver.DriverRelationship) {
      driver.RelationshipToInsured = leadDriver.DriverRelationship;
    }
    if (document.Result.Account.PhoneNumbers && document.Result.Account.PhoneNumbers.length > 0) {
      driver.PhoneNumber = document.Result.Account.PhoneNumbers[0].PhoneNumber;
    }
    if (document.Result.Account.EmailAddresses && document.Result.Account.EmailAddresses.length > 0) {
      driver.EmailAddress = document.Result.Account.EmailAddresses[0].EmailAddress;
    }
  }

  function mapVehicleUsage(VehicleUseCode) {
    var retVal;
    switch (VehicleUseCode) {
      case 'Work/School':
        retVal = 'commuting';
        break;
      case 'pleasure':
        retVal = 'pleasure';
        break;
      default :
        retVal = null;
    }
    return retVal;
  }

  function mapVehicleMileage(EstimatedAnnualMileage) {
    var retVal;
    switch (EstimatedAnnualMileage) {
      case '20,000 or more':
        retVal = '20000_or_more';
        break;
      case 'Less than 4,000':
        retVal = 'pleasure';
        break;
      case '4,000-5,999':
        retVal = 'less_than_4000';
        break;
      case '6,000-7,999':
        retVal = '6000_to_7999';
        break;
      case '8,000-9,999':
        retVal = '8000_to_9999';
        break;
      case '10,000-11,999':
        retVal = '10000_to_11999';
        break;
      case '12,000-14,999':
        retVal = '12000_to_14999';
        break;
      case '15,000-19,999':
        retVal = '15000_to_19999';
        break;
      default :
        retVal = null;
    }
    return retVal;
  }

  return ['QuoteIntentModel', 'DriverModel', 'AddressModel', 'VehicleModel', 'PolicyModel', 'ClientDataModel', 'QuoteStateModel',
    function (quoteIntentModel, driverModel, addressModel, vehicleModel, policyModel, clientDataModel, quoteStateModel) {
      return {

        updateQuoteIntent: function (data) {
          var document = data.data;
          var clientData = quoteIntentModel.getClientData();
          quoteIntentModel.init();

          //---------------- Save address ----------------------------------
          var address = new addressModel();
          if (document.Result.Account && document.Result.Account.Address) {
            var leadAddress = document.Result.Account.Address;
            address.AddressLine1 = leadAddress.Addr1;
            address.PostalCode = leadAddress.PostalCode;
            address.City = leadAddress.City;
            address.State = leadAddress.State;
          }
          address.save();

          //---------------- Build ClientData  ----------------------------------

          var leadClientData = document.Result.Account;
          clientData.RqId = leadClientData.RqId;
          clientData.Broker = leadClientData.Origin;
          clientData.IntegrationPartner = document.Result.IntegrationPartner;
          clientData.save();

          //---------------- Build Drivers  ----------------------------------
          var unProcessedDrivers = [];
          if (document.Result.Drivers) {
            var applicant = _.findWhere(document.Result.Drivers, {DriverRelationship: 'applicant'});
            if (applicant) {
              var driver = new driverModel();
              MapDriver(driver, applicant, document);
              //Request per obie
              driver.EmailAddress = null;
              driver.PhoneNumber = null;
              driver.save();
            }

            _.each(document.Result.Drivers, function (driverItem) {
              if (driverItem.DriverRelationship && driverItem.DriverRelationship != 'applicant') {
                var currentDrivers = quoteIntentModel.getDrivers();
                var foundOne = _.findWhere(currentDrivers, {
                  FirstName: driverItem.FirstName,
                  LastName: driverItem.LastName
                });
                //Lets not add duplicate driver names
                if (!foundOne) {
                  var driver = new driverModel();
                  MapDriver(driver, driverItem, document);
                  var driverId = driver.save();
                  //creates a list of drivers that need to be addressed in the UI
                  unProcessedDrivers.push(driverId);
                }
              }
            });
          }

          //---------------- Build Vehicles  ----------------------------------
          var unProcessedVehicles = [];
          if (document.Result.Vehicles) {
            _.each(document.Result.Vehicles, function (vehicleItem) {
              var vehicle = new vehicleModel();

              //vehicle.populateData(vehicleItem);
              vehicle.Year = vehicleItem.Year.toString();
              vehicle.MakeID = vehicleItem.MakeId;
              vehicle.Make = vehicleItem.Make;
              vehicle.ModelID = vehicleItem.ModelId;
              vehicle.Model = vehicleItem.Model;
              vehicle.YearStyleID = vehicleItem.YearStyleId;
              vehicle.Style = vehicleItem.Style;
              vehicle.PrimaryUse = mapVehicleUsage(vehicleItem.VehicleUseCode);
              vehicle.EstimatedAnnualMileage = mapVehicleMileage(vehicleItem.EstimatedAnnualDistance);
              if(vehicle.YearStyleID) {
                var vehicleId = vehicle.save();
                unProcessedVehicles.push(vehicleId);
              }
            });
          }

          //---------------- Build Policy  ----------------------------------
          var policy = new policyModel();
          policy.save();

          //---------------- Build Policy  ----------------------------------
          var quoteState = new quoteStateModel();
          if (document.Result.HasRatedLocations) {
            quoteState.HasRatedLocations = document.Result.HasRatedLocations
          }
          quoteState.UnProcessedLeadDrivers = unProcessedDrivers;
          quoteState.UnProcessedLeadVehicles = unProcessedVehicles;
          quoteState.saveQuoteState();
        }
      }
    }];
}

/**
 * Created by gabello on 5/28/2015.
 */
'use strict';
function LeadModelService() {
  return ['$q', 'externalAPIDataService', 'QuoteIntentModel',
    function ($q, externalAPIDataService, quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          Status: null,
          Errors: null,
          Result: {
            Account: {
              Origin: null,
              InsurerId: null,
              FirstName: null,
              LastName: null,
              Address: {
                ID: null,
                Addr1: null,
                City: null,
                State: null,
                PostalCode: null,
                County: null
              },
              PhoneNumbers: [
                {
                  CommunicationsUseCode: null,
                  PhoneNumber: null
                }],
              EmailAddresses: [
                {
                  CommunicationsUseCode: null,
                  EmailAddress: null
                }],
              Birthdate: null,
              LeadType: null,
              RqId: null
            },
            Drivers: [{
              DriverID: null,
              FirstName: null,
              LastName: null,
              GenderCode: null,
              Birthdate: null,
              MaritalStatusCode: null,
              OccupationClassCode: null,
              EducationLevelCode: null,
              LicenseStatusCode: null,
              LicenseState: null,
              LicenseDate: null,
              DriverRelationship: null,
              GoodStudentCode: null
            }],
            Policy: {
              PolicyCode: null,
              InsurerName: null,
              InsuredSinceDate: null,
              CanceledDate: null,
              ResidenceTypeCode: null,
              ResidenceOwnedRentedCode: null,
              LengthTimeCurrentAddressNumUnits: null,
              LengthTimeCurrentAddressCode: null,
              LengthTimeWithPreviousInsurerNumUnits: null,
              LengthTimeWithPreviousInsurerCode: null
            },
            Vehicles: [{
              ID: null,
              LocationRef: null,
              Make: null,
              MakeID: null,
              Model: null,
              ModelID: null,
              Year: null,
              EstimatedAnnualDistance: null,
              DistanceOneWay: null,
              GaragingCode: null,
              LeasedVehicleInd: null,
              LeadCloudAddress: {
                ID: null,
                Addr1: null,
                City: null,
                State: null,
                PostalCode: null,
                County: null
              },
              VehicleUseCode: null,
              Vin: null,
              YearStyleID: null,
              Style: null
            }],
            PostalLocations: [{
              PostalCode: null,
              County: null,
              City: null,
              StateAbbreviation: null
            }],
            HasRatedLocations: null,
            IntegrationPartner: null
          }
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        getLeadCloudRouteName: function () {
          return 'lead-data';
        },

        createRejectedPromise: function (e) {
          var rejected = $q.defer();
          rejected.reject(e);
          return rejected.promise;
        },

        getLeadCloudData: function (rqId) {
          try {
            var leadCloudRouteName = this.getLeadCloudRouteName();
            var leadResponse = externalAPIDataService.getLeadCloudData(leadCloudRouteName, rqId);
            var deferred = $q.defer();
            var currentLead = this;
            $q.when(leadResponse, function (response) {
              var leadResults = JSON.parse(JSON.stringify(response.data));
              currentLead.populateData(leadResults);
              quoteIntentModel.saveLeadData(currentLead);
              deferred.resolve();
            }, function (error) {
              deferred.reject(error);
            });
            return deferred.promise;
          } catch (e) {
            return this.createRejectedPromise(e);
          }
        },

        getNextVehicle: function () {
          if (this.Result && this.Result.Vehicles && this.Result.Vehicles.length > 0) {
            var vehicle = angular.copy(this.Result.Vehicles[0]);
            this.Result.Vehicles.splice(0, 1);
            return vehicle;
          }
          return null;
        },

        getVehicleCount: function () {
          if (this.Result && this.Result.Vehicles && this.Result.Vehicles.length > 0) {
            return this.Result.Vehicles.length;
          }
          return 0;
        },

        getLeadAddress: function () {
          if (this.Result && this.Result.Account && this.Result.Account.Address && this.Result.Account.Address.Addr1) {
            return this.Result.Account.Address.Addr1;
          }
          return null
        },

        getLeadEmailAddress: function () {
          if (this.Result && this.Result.Account && this.Result.Account.EmailAddresses && this.Result.Account.EmailAddresses.length > 0) {
            //return first one for now
            return this.Result.Account.EmailAddresses[0].EmailAddress;
          }
          return null;
        },

        getLeadPhoneNumber: function () {
          if (this.Result && this.Result.Account && this.Result.Account.PhoneNumbers && this.Result.Account.PhoneNumbers.length > 0) {
            //return first one for now
            return this.Result.Account.PhoneNumbers[0].PhoneNumber;
          }
          return null;
        },

        getApplicant: function () {
          if (this.Result && this.Result.Drivers && this.Result.Drivers.length > 0) {
            return _.findWhere(this.Result.Drivers, {DriverRelationship: 'applicant'})
          }
          return null;
        },

        getSpouse: function () {
          if (this.Result && this.Result.Drivers && this.Result.Drivers.length > 0) {
            return _.findWhere(this.Result.Drivers, {DriverRelationship: 'spouse'})
          }
          return null;
        },

        getApplicantGenderCode: function () {
          var applicant = this.getApplicant();
          if (applicant) {
            return this.mapGenderCode(applicant.GenderCode);
          }
          return null;
        },

        getSpouseGenderCode: function () {
          var spouse = this.getSpouse();
          if (spouse) {
            return this.mapGenderCode(spouse.GenderCode);
          }
          return null;
        },

        getApplicantMaritalStatus: function () {
          var retVal = null;
          var applicant = this.getApplicant();
          if (applicant && applicant.MaritalStatusCode) {
            retVal = this.mapMaritalStatus(applicant.MaritalStatusCode);
          }
          return retVal;
        },

        getApplicantEducationLevel: function () {
          var retVal = null;
          var applicant = this.getApplicant();
          if (applicant && applicant.EducationLevelCode) {
            retVal = this.mapEducationLevelCode(applicant.EducationLevelCode);
          }
          return retVal;
        },

        getSpouseEducationLevel: function () {
          var retVal = null;
          var applicant = this.getSpouse();
          if (applicant && applicant.EducationLevelCode) {
            retVal = this.mapEducationLevelCode(applicant.EducationLevelCode);
          }
          return retVal;
        },

        getResidenceOwnership: function () {
          var retVal = null;
          if (this.Result && this.Result.Policy && this.Result.Policy.ResidenceOwnedRentedCode) {
            retVal = this.mapResidenceOwnership(this.Result.Policy.ResidenceOwnedRentedCode);
          }
          return retVal;
        },

        getSpouseLicenseStatus: function () {
          var retVal = null;
          var applicant = this.getSpouse();
          if (applicant && applicant.LicenseStatusCode) {
            retVal = this.mapLicenseStatus(applicant.LicenseStatusCode);
          }
          return retVal;
        },

        getApplicantLicenseStatus: function () {
          var retVal = null;
          var applicant = this.getApplicant();
          if (applicant && applicant.LicenseStatusCode) {
            retVal = this.mapLicenseStatus(applicant.LicenseStatusCode);
          }
          return retVal;
        },

        mapMaritalStatus: function (maritalStatusCode) {
          var retVal;
          switch (maritalStatusCode) {
            case 'Civil Union':
              retVal = 'CivilUnion';
              break;
            case 'Divorced':
              retVal = 'Divorced';
              break;
            case 'Married':
              retVal = 'Married';
              break;
            case 'Never married':
              retVal = 'NeverMarried';
              break;
            case 'Separated':
              retVal = 'Separated';
              break;
            case 'Widowed':
              retVal = 'Widowed';
              break;
            default :
              retVal = 'Unspecified';
          }
          return retVal;
        },

        mapGenderCode: function (genderCode) {
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
        },

        mapEducationLevelCode: function (educationLevelCode) {
          var retVal;
          switch (educationLevelCode) {
            case 'Lower than High School':
              retVal = 'LowerThanHighSchool';
              break;
            case 'Masters':
              retVal = 'Masters';
              break;
            case 'High School/GED':
              retVal = 'HighSchoolOrGED';
              break;
            case 'Associates':
              retVal = 'Associates';
              break;
            case 'Bachelors':
              retVal = 'Bachelors';
              break;
            case 'Vocational':
              retVal = 'Vocational';
              break;
            case 'Doctorate':
              retVal = 'Doctorate';
              break;
            default :
              retVal = 'Unspecified';
          }
          return retVal;
        },

        mapResidenceOwnership: function (residenceOwnershipCode) {
          var retVal;
          switch (residenceOwnershipCode) {
            case 'Own home':
              retVal = 'OwnHome';
              break;
            case 'rent':
              retVal = 'Rent';
              break;
            case 'other':
              retVal = 'Other';
              break;
            case 'Own condo':
              retVal = 'OwnCondo';
              break;
            case 'OwnMobileHome':
              retVal = 'OwnMobileHome';
              break;
            default :
              retVal = 'Unspecified';
          }
          return retVal;
        },

        mapLicenseStatus: function (licenseStatusCode) {
          var retVal;
          switch (licenseStatusCode) {
            case 'valid':
              retVal = 'Valid';
              break;
            case 'expired':
              retVal = 'Expired';
              break;
            case 'revoked':
              retVal = 'Revoked';
              break;
            case 'suspended':
              retVal = 'Suspended';
              break;
            case 'restricted':
              retVal = 'Restricted';
              break;
            case 'nonlicensed':
              retVal = 'Unlicensed';
              break;
            case 'permit':
              retVal = 'LearnersPermit';
              break;
            case 'foreign':
              retVal = 'Foreign';
              break;
            default :
              retVal = 'Unspecified';
          }
          return retVal;
        },

        populateData: function (data) {
          _.extend(this, data);

          if (data.Result.Account.Birthdate) {
            this.Result.Account.Birthdate = moment.utc(data.Result.Account.Birthdate).format('MM-DD-YYYY');
          }

          if (this.Result.Drivers && this.Result.Drivers.length > 0) {
            _.each(this.Result.Drivers, function (driver) {
              driver.Birthdate = moment.utc(driver.Birthdate).format('MM-DD-YYYY');
            })
          }

        }

      });

      return clazz;
    }];
}

/**
 * Created by gabello on 10/8/2014.
 */
function DriverModelService() {
  'use strict';
  return ['QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          AgeFirstLicensed: null,
          CurrentInsuranceStatus: null,
          CurrentInsurer: null,
          CurrentlyInsured: null,
          CurrentProviderPremium: null,
          CurrentStudentEnrollment: null,
          CurrentlyEnrolled: null,
          CurrentZipCode: null,
          DateOfBirth: null,
          DateOfResidence: null,
          DrivesAnyListedVehicles: null,
          EmailAddress: null,
          EmailAddressConfirm: null,
          EmploymentStatus: null,
          FirstName: null,
          Gender: null,
          GoodStudentDiscount: null,
          HighestEducationLevel: null,
          ID: null,
          Incidents: [],
          LastName: null,
          LicenseNumber: null,
          LicenseState: null,
          LicenseStatus: null,
          MaritalStatus: '',
          MiddleName: null,
          MilitaryBranch: null,
          MilitaryStatus: null,
          MonthSelected: null,
          NumberOfCreditPulls: null,
          Occupation: null,
          OwnsOwnVehicle: null,
          PhoneNumber: null,
          PreviousLapse: null,
          PrimaryDriver: null,
          PrimaryInsured: null,
          PrimaryVehicleID: null,
          ProcessingId: null,
          RatingStatus: null,
          RelationshipToInsured: null,
          ResidenceOwnership: null,
          Retired: null,
          SocialSecurityNumber: null,
          Suffix: null,
          Title: null,
          YearsAtCurrentResidence: null,
          YearSelected: null,
          YearsWithCurrentInsurer: null
        };

        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        fieldsToExclude: function () {
          return ['Links', 'Href', 'Rel']
        },

        getDriverId: function(){
          if (this.FirstName !== '' && this.LastName !== '') {
            return this.FirstName + this.LastName;
          } else if (this.FirstName !== '') {
            return this.FirstName;
          } else if (this.LastName !== '') {
            return this.LastName;
          } else {
            return '';
          }
        },

        getFullName: function () {
          if (this.FirstName !== '' && this.LastName !== '') {
            return this.FirstName + ' ' + this.LastName;
          } else if (this.FirstName !== '') {
            return this.FirstName;
          } else if (this.LastName !== '') {
            return this.LastName;
          } else {
            return '';
          }
        },

        hasValue: function (item) {
          return !!item;
        },

        isPolicyTermsEditable: function () {
          return !!(
            this.hasValue(this.FirstName) &&
            this.hasValue(this.LastName) &&
            this.hasValue(this.DateOfBirth) &&
            this.hasValue(this.Gender) &&
            this.hasValue(this.MaritalStatus) &&
            this.hasValue(this.EmploymentStatus) &&
            this.hasValue(this.HighestEducationLevel)
          );
        },

        isPolicyHolderValid: function () {
          return !!(
          this.isPolicyTermsEditable() &&
          this.hasValue(this.LicenseStatus) &&
          this.hasValue(this.AgeFirstLicensed) &&
          this.hasValue(this.ResidenceOwnership) &&
          (this.CurrentlyInsured != null) &&
          this.hasValue(this.CurrentZipCode));
        },

        isDriverValid: function () {
          return !!(
          this.isPolicyTermsEditable() &&
          this.hasValue(this.LicenseStatus) &&
          this.hasValue(this.AgeFirstLicensed) &&
          (this.CurrentlyInsured != null));
        },


        getMake: function () {
          return this.Make;
        },

        saveDriverPrimaryVehicle: function (vehicleId) {
          if (!this.PrimaryVehicleID) {
            this.PrimaryVehicleID = vehicleId;
            return this.save()
          }
        },

        driverAge: function () {
          var m = moment(this.DateOfBirth, ['MMDDYYYY', 'MM-DD-YYYY'], true);
          if (m.isValid()) {
            return moment(new Date()).diff(moment(this.DateOfBirth, 'MM-DD-YYYY'), 'years');
          } else {
            return 0;
          }
        },

        isStudentAge: function () {
          var years = this.driverAge();
          return !!(years >= 16 && years <= 24);
        },

        setDriverDefaults: function () {
          //Policy Center requires social to have dashes, how stupid is that
          if (this.SocialSecurityNumber) {
            var tempSSN = this.SocialSecurityNumber.replace(/-/g, '');
            var updatedSSN = String.format('{0}-{1}-{2}', tempSSN.substring(0, 3),
              tempSSN.substring(3, 5), tempSSN.substring(5, 9));
            this.SocialSecurityNumber = updatedSSN;
          }
        },

        save: function () {
          //First determine if this is a primary driver by determining if there are any other drivers or if PrimaryDriver is set
          var drivers = quoteIntentModel.getDrivers();
          if (this.PrimaryDriver || drivers.length == 0) {
            this.PrimaryDriver = true;
          }

          //remove any funky characters
          this.LicenseNumber = this.cleanDriversLicense();

          //If this is a new insuredPerson or listed-driver then we need to get the link from quoteIntent model
          //otherwise if this is an update then the current entity has the link
          if (!this.ID) {
            this.ID = createGuid();
          }

          quoteIntentModel.saveDriver(this);
          return this.ID;
        },

        removeDriver: function () {
          quoteIntentModel.removeDriver(this.ID);
        },

        cleanDriversLicense: function () {
          if (this.LicenseNumber) {
            return this.LicenseNumber.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>]/g, '');
          }
          return null;
        },

        validateDriversLicense: function () {
          var cleanedDriverLicense = this.cleanDriversLicense();
          var pattern1 = GetDLPatterByState(this.LicenseState);
          var licensePattern = new RegExp("^" + pattern1 + "$");
          return licensePattern.test(cleanedDriverLicense);
        },

        populateData: function (data) {
          _.extend(this, data);

          // MUST convert date/time to utc b/c that's what the internal api returns
          if (data.DateOfBirth) {
            this.DateOfBirth = moment.utc(data.DateOfBirth, 'MM-DD-YYYY').format('MM-DD-YYYY');
          }

          if (data.PhoneNumbers && data.PhoneNumbers.length > 0) {
            var phoneNumber = _.findWhere(data.PhoneNumbers, {PhoneNumberType: 'Home'});
            if (phoneNumber) {
              phoneNumber.Value = phoneNumber.Value.replace(/-/g, '');
              this.PhoneNumber = phoneNumber;
            }
          }
        },//populateData

        resolveForeignLicenseState: function () {
          //Nick G - new rule if user selects NON-US License update the License Status to Foreign
          if (this.LicenseState == 'ZZ') {
            this.LicenseStatus = 'Foreign';
          }

          if (this.LicenseStatus == 'Foreign') {
            this.LicenseState = 'ZZ';
          }
        },

        maritalStatusChanged: function () {
          var quoteState = quoteIntentModel.getQuoteState();
          quoteState.AdditionalDrivers = null;
          quoteState.saveQuoteState();
          this.resolveGoodStudentDiscount();
        },


        resolveGoodStudentDiscount: function () {
          if (this.PrimaryDriver) {
            if (this.EmploymentStatus != EnumEmploymentStatuses.FulltimeStudent || !this.isStudentAge() ||
              (this.MaritalStatus != EnumMaritalStatuses.NeverMarried && this.MaritalStatus != EnumMaritalStatuses.Widowed && this.MaritalStatus != EnumMaritalStatuses.Divorced)) {
              this.GoodStudentDiscount = null;
              this.CurrentlyEnrolled = null;
            }
          } else {
            if (!this.isStudentAge() ||
              (this.MaritalStatus != EnumMaritalStatuses.NeverMarried && this.MaritalStatus != EnumMaritalStatuses.Widowed && this.MaritalStatus != EnumMaritalStatuses.Divorced)) {
              this.GoodStudentDiscount = null;
              this.CurrentlyEnrolled = null;
            }
          }
        },

        resolveEmploymentStatus: function () {
          switch (this.EmploymentStatus) {
            case EnumEmploymentStatuses.Employed:
            case EnumEmploymentStatuses.Retired:
              this.MilitaryStatus = null;
              this.MilitaryBranch = null;
              this.GoodStudentDiscount = null;
              this.CurrentlyEnrolled = null;
              break;
            case EnumEmploymentStatuses.Homemaker:
              this.Occupation = '424';
              this.MilitaryStatus = null;
              this.MilitaryBranch = null;
              this.GoodStudentDiscount = null;
              this.CurrentlyEnrolled = null;
              break;
            case EnumEmploymentStatuses.Unemployed:
              this.Occupation = '425';
              this.MilitaryStatus = null;
              this.MilitaryBranch = null;
              this.GoodStudentDiscount = null;
              this.CurrentlyEnrolled = null;
              break;
            case EnumEmploymentStatuses.FulltimeStudent:
              this.MilitaryStatus = null;
              this.MilitaryBranch = null;
              break;
            case EnumEmploymentStatuses.ActiveMilitary:
            case EnumEmploymentStatuses.RetiredMilitary:
              this.Occupation = null;
              this.GoodStudentDiscount = null;
              this.CurrentlyEnrolled = null;
              break;
            default:
              this.Occupation = null;
              this.MilitaryStatus = null;
              this.MilitaryBranch = null;
              this.GoodStudentDiscount = null;
              this.CurrentlyEnrolled = null;
          }

          if (this.EmploymentStatus == EnumEmploymentStatuses.FulltimeStudent) {
            switch (this.CurrentStudentEnrollment) {
              case 'HighSchool' :
                this.Occupation = '427';
                break;
              case 'TradeSchool' :
              case 'CollegeDegreeFor2Years':
                this.Occupation = '428';
                break;
              case 'GraduateSchool' :
                this.Occupation = '426';
                break;
              case 'CollegeDegreeFor4Years' :
                this.Occupation = '429';
                break;
            }
          }

          if (this.CurrentStudentEnrollment == 'No') {
            this.GoodStudentDiscount = 'false'
          }


        }
      });

      return clazz;
    }
  ];
}

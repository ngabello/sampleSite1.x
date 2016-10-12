/**
 * Created by gabello on 10/30/2014.
 */
angular.module('platform.lookupDataService', [])
  .service('LookupDataService', ['$q', '$log', 'bindMessages',
    function ($q, $log, bindMessages) {

      var lookups = [];

      this.hasLookups = function () {
        return !!(lookups && lookups.length > 0);
      };

      this.saveLookupData = function (data) {
        _.forEach(data, function (dataItem) {
          var enumObj = dataItem.attributes;
          lookups.push({Name: enumObj.Name, Items: enumObj.Items})
        });
      };

      this.getLookupItems = function (enumName) {
        var lookupItems = _.findWhere(lookups, {Name: enumName});
        if (lookupItems && lookupItems.Items) {
          return _.sortBy(lookupItems.Items, 'SortOrder');
        }
        return null;
      };
      //--------------- Lookup ----------------------------------------------------
      this.getYearsWith = function(){
        return this.getLookupItems('EnumYearsWith')
      };

      this.getCurrentInsuranceLimits = function(){
        return this.getLookupItems('EnumCurrentInsuranceLimits')
      };

      this.getFullStateName = function(stateAb){
        var fullStateName;
        var usStates = this.getLookupItems('EnumStates');
        var state = _.findWhere(usStates, {Desc: stateAb});
        if(state && state.Meta){
          fullStateName = state.Meta.FullName;
        }
        return fullStateName;
      };

      this.getUSStates = function (filter) {
        var usStates = this.getLookupItems('EnumStates');
        if (filter === 'VA') {
          var stateList = _.filter(usStates, function (state) {
            return state.Desc !== 'Non-us';
          });
          return stateList;
        }
        return usStates;
      };

      this.getVehicleOwnershipOptions = function () {
        return this.getLookupItems('EnumVehicleOwnerships')
      };

      this.getVehicleMileageOptions = function () {
        return this.getLookupItems('EnumVehicleMileageOptions')
      };

      this.getSuffixes = function () {
        return this.getLookupItems('EnumSuffixes')
      };

      this.getIncidentClassification = function(incidentTypeId) {
        var incidents = this.getLookupItems('EnumIncidents');
        var incident = _.findWhere(incidents, {Value: incidentTypeId});
        if(incident){
          return incident.Meta.Classification;
        }
        return null;
      };

      this.getIncidents = function () {
        return this.getLookupItems('EnumIncidents')
      };

      this.getCurrentCarriers = function () {
        return this.getLookupItems('EnumCurrentCarriers')
      };

      this.getVehicleCustomEquipmentOptions = function (stateCode) {
        var vehicleOptions = this.getLookupItems('EnumVehicleCustomEquipmentOptions');
        return _.filter(vehicleOptions, function (item) {
          return _.contains(item.Meta.StateCodes, stateCode)
        });
      };

      this.getCreditCardLookups = function () {
        return this.getLookupItems('EnumCreditCards');
      };

      this.getLicenseStatusLookups = function () {
        return this.getLookupItems('EnumLicenseStatuses');
      };

      this.getEducationLevelLookups = function () {
        return this.getLookupItems('EnumEducationLevels');
      };

      this.getEmploymentStatusLookups = function () {
        return this.getLookupItems('EnumEmploymentStatuses');
      };

      this.getGenderLookups = function () {
        return this.getLookupItems('EnumGenders');
      };

      this.getInsuranceLapseCodeLookups = function (filterArray) {
        var insuranceLapses = this.getLookupItems('EnumInsuranceLapses');

        if (filterArray) {
          return _.filter(insuranceLapses, function (insuranceLapse) {
            return !_.contains(filterArray, insuranceLapse.Value);
          })
        }
        return insuranceLapses;
      };

      this.getInsuranceStatusLookups = function () {
        return this.getLookupItems('EnumInsuranceStatuses');
      };

      this.getMaritalStatusLookups = function (stateCode) {
        var maritalStatuses = this.getLookupItems('EnumMaritalStatuses');
        return _.filter(maritalStatuses, function (item) {
          return _.contains(item.Meta.StateCodes, stateCode)
        });
      };

      this.getMilitaryBranchLookups = function () {
        return this.getLookupItems('EnumMilitaryBranches');
      };

      this.getMilitaryServiceTypeLookups = function (filter) {
        var serviceTypes = this.getLookupItems('EnumMilitaryServices');
        return _.filter(serviceTypes, function (serviceType) {
          return serviceType.Meta.Branch == filter;
        });
      };

      this.getMilitaryServiceById = function (id) {
        return _.findWhere(lookups, {Type: 'MilitaryServiceType', Value: id});
      };

      this.getNoCurrentInsuranceReasonLookups = function () {
        return this.getLookupItems('EnumNoCurrentInsuranceReasons');
      };

      this.getPaymentMethodLookups = function () {
        return this.getLookupItems('EnumPaymentMethods');
      };

      this.getPaymentPlanTypeLookups = function () {
        return this.getLookupItems('EnumPaymentPlans');
      };

      this.getPhoneNumberTypeLookups = function () {
        return _.where(lookups, {Type: 'PhoneNumberType'});
      };

      this.getRelationshipToInsuredCodeLookups = function () {
        var relationShips = this.getLookupItems('EnumRelationshipToInsureds');
        return _.filter(relationShips, function (item) {
          return item.Meta.AllowedWeb == "true";
        });
      };

      this.getResidenceOwnershipTypeLookups = function () {
        return this.getLookupItems('EnumResidenceOwnerships');
      };

      this.getStateCodeLookups = function () {
        return this.getLookupItems('EnumStates');
      };

      this.getStudentEnrollmentTypeLookups = function () {
        return this.getLookupItems('EnumStudentEnrollments');
        //return _.filter(enrollments, function (enrollment) {
        //  return enrollment.Name != 'None';
        //})
      };

      this.getVehicleOwnershipCodeLookups = function () {
        return this.getLookupItems('EnumVehicleOwnerships');
      };

      this.getVehicleUsageCodeLookups = function () {
        return this.getLookupItems('EnumVehicleUsages');
      };

      this.getOccupationLookups = function () {
        var occupations = this.getLookupItems('EnumOccupations');
        var validOccupations = _.reject(occupations, function (occupation) {
          var occValue = parseInt(occupation.Value, 10);
          return occValue > 396;
        });
        return validOccupations;
      }

      this.getPCErrorLookups = function(){
        return this.getLookupItems('EnumPCErrors')
      }
      this.getPCErrorMessage = function(code){
        var lookups = this.getPCErrorLookups();
        var message =  _.findWhere(lookups, {Value: code});
          return message ? message.Desc : bindMessages.defaultBindError;
      }
    }]);

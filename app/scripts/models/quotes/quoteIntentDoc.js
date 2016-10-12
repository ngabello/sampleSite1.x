/**
 * Created by gabello on 12/11/2015.
 */
'use strict';

var quoteDocument = {
  quoteIntentData: { //This is the object passed to MS-Quote-Intent
    data: {
      attributes: {
        'quote-intent': {
          Payment: null,
          ClientData: null,
          Address: null,
          Ancillaries: {
            AncillaryPlans: [],
            AncillaryResponse: null,
            ParamContent: null
          },
          Drivers: [],
          Vehicles: [],
          Policy: null,
          Quote: null,
          QuoteState: {}
        }
      },
      id: ''
    }
  }
};

function QuoteIntentModelService() {
  return [function () {

    var dataDocument = angular.copy(quoteDocument);
    var dmsData = {};

    this.init = function () {
      if (dataDocument) {
        dataDocument = angular.copy(quoteDocument);
      }
    };
    //This clears QuoteIntentId from the 'dataDocument' object
    this.clearQuoteIntentId = function () {

      if (dataDocument) {
        dataDocument.quoteIntentData.data.id = '';
      }
    };

    this.getDocumentCopy = function () {
      return angular.copy(dataDocument.quoteIntentData);
    }
    this.getDocument = function () {
      //convert effective date to dashes
      var doc = this.getDocumentCopy();
      var intent = doc.data.attributes['quote-intent'];
      if (intent.Policy && !!intent.Policy.EffectiveDate) {
        intent.Policy.EffectiveDate = moment(intent.Policy.EffectiveDate).format('MM-DD-YYYY');
      }
      //This is the object passed to MS-Quote-Intent
      return doc;
    };

    this.getQuoteIntent = function () {
      return dataDocument.quoteIntentData.data.attributes['quote-intent'];
    };

    this.getQuoteIntentId = function () {
      return dataDocument.quoteIntentData.data.id;
    };

    this.setQuoteIntentId = function (quoteIdentifier) {
      dataDocument.quoteIntentData.data.id = quoteIdentifier;
    };

    this.getQuoteNumber = function () {
      var qi = this.getQuoteIntent();
      if (qi.Quote) {
        return qi.Quote.QuoteNumber;
      } else {
        return null;
      }
    };

    //--------------- ClientData ------------------------------------------
    this.getClientData = function () {
      return angular.copy(this.getQuoteIntent().ClientData);
    };

    //--------------- Payment ----------------------------------------------

    this.savePayment = function (paymentPlanData) {
      if (paymentPlanData) {
        this.getQuoteIntent().Payment = paymentPlanData;
      }
    };

    this.getPayment = function () {
      return angular.copy(this.getQuoteIntent().Payment);
    };

//---------------- Dms Data, This is not passed back and forth from the api --------------

    this.saveDmsData = function (dataObject) {
      if (dataObject) {
        dmsData = dataObject;
      }
    };

    this.getDmsDrivers = function () {
      return dmsData.Drivers;
    };

    this.getDmsVehicles = function () {
      return dmsData.Vehicles;
    };


//--------------- Client Data ----------------------------------------------
    this.saveClientData = function (clientData) {
      if (!clientData) {
        return;
      }
      this.getQuoteIntent().ClientData = clientData;
    };

    this.getClientData = function () {
      return this.getQuoteIntent().ClientData;
    };


    //--------------- Address ----------------------------------------------
    this.saveAddress = function (addressData) {
      if (!addressData) {
        return;
      }
      //default the County if there is only one
      if (!addressData.County && addressData.Counties && addressData.Counties.length == 1) {
        addressData.County = addressData.Counties[0].Name;
      }
      this.getQuoteIntent().Address = addressData;
    };

    this.getAddress = function () {
      return this.getQuoteIntent().Address;
    };

    this.clearAddress = function () {
      this.getQuoteIntent().Address = null;
    };

    //---------------- Policy ---------------------------------------------------

    this.savePolicy = function (policyData) {
      if (policyData) {
        this.getQuoteIntent().Policy = policyData;
      }
    };

    this.getPolicy = function () {
      return angular.copy(this.getQuoteIntent().Policy);
    };

    //--------------- Driver ----------------------------------------------
    //Returns the Driver with PrimaryDriver = true
    this.getPolicyHolder = function () {
      var driver = _.findWhere(this.getQuoteIntent().Drivers, {PrimaryDriver: true});
      if (driver) {
        return angular.copy(driver);
      }
    };

    //Returns the Driver found with the ID matching the id parameter
    this.getDriverById = function (id) {
      var drivers = this.getQuoteIntent().Drivers;
      var driver = _.findWhere(drivers, {ID: id});
      if (driver) {
        return angular.copy(driver);
      }
    };

    //Removes the driver from the list of drivers and searches through the vehicles and
    //removes any reference to the deleted driver
    this.removeDriver = function (driverId) {
      var drivers = this.getQuoteIntent().Drivers;
      drivers.splice(_.indexOf(drivers, _.findWhere(drivers, {ID: driverId})), 1);
      _.forEach(this.getQuoteIntent().Vehicles, function (vehicle) {
        if (vehicle.PrimaryDriverID === driverId) {
          vehicle.PrimaryDriverID = null;
        }
      })
    };

    //Saves the driver to the drivers array if one already exists
    //it is replaced
    this.saveDriver = function (driverData) {
      var drivers = this.getQuoteIntent().Drivers;
      var driver = _.findWhere(this.getQuoteIntent().Drivers, {ID: driverData.ID});
      if (driver) {
        var index = _.indexOf(this.getQuoteIntent().Drivers, driver);
        this.getQuoteIntent().Drivers[index] = driverData;
      }
      else {
        drivers.push(driverData);
      }
    };

    this.getSpouse = function () {
      var driver = _.findWhere(this.getQuoteIntent().Drivers, {RelationshipToInsured: 'spouse'});
      if (driver) {
        return angular.copy(driver);
      }
    };

    this.getDriverByRelationship = function (relationship) {
      var driver = _.findWhere(this.getQuoteIntent().Drivers, {RelationshipToInsured: relationship});
      if (driver) {
        return angular.copy(driver);
      }
    };

    this.getDriverIncidentLink = function (driverId) {
      var driver = _.findWhere(this.getQuoteIntent().Drivers, {ID: driverId});
      return _.find(driver.Links, function (link) {
        return link.Rel == 'incident';
      });
    };

    //Returns a list of all the drivers
    this.getDrivers = function () {
      var driverCopies = [];
      _.each(this.getQuoteIntent().Drivers, function (driver) {
        driverCopies.push(angular.copy(driver));
      });
      return driverCopies;
    };

    this.getDriverCount = function () {
      return this.getQuoteIntent().Drivers.length;
    };

    this.updateDriverLicenseInfo = function (driverId, licenseNumber, licenseState) {
      var driver = _.findWhere(this.getQuoteIntent().Drivers, {ID: driverId});
      if (driver) {
        driver.LicenseNumber = licenseNumber;
        driver.LicenseState = licenseState;
      }
    };

    this.getRatedDrivers = function () {
      var ratedDriverCopies = [];
      var ratedDrivers = _.where(this.getQuoteIntent().Drivers, {RatingStatus: 'rated'});
      _.each(ratedDrivers, function (driver) {
        ratedDriverCopies.push(angular.copy(driver));
      });
      return ratedDriverCopies;
    };

    //Returns all drivers for display purposes only
    this.getReadOnlyDrivers = function () {
      return this.getQuoteIntent().Drivers;
    };

    //Returns the next available driver in the Drivers collection that is not the
    //primary driver.
    this.getNextDriver = function () {
      var nonPolicyHolderDrivers = _.filter(this.getQuoteIntent().Drivers, function (driver) {
        return driver.PrimaryDriver != true;
      });
      if (nonPolicyHolderDrivers) {
        var driver = nonPolicyHolderDrivers[0];
        if (driver) {
          return angular.copy(driver);
        }
      } else {
        return null;
      }
    };

    //--------------- Incidents ----------------------------------------------

    this.saveIncident = function (incidentData) {
      if (incidentData) {
        this.setHasIncidents(true);
        var drivers = this.getQuoteIntent().Drivers;
        var driver = _.findWhere(drivers, {ID: incidentData.DriverID});
        if (driver) {
          if (!driver.Incidents) {
            driver.Incidents = [];
          }
          driver.Incidents.push(incidentData);
          this.setHasIncidents(true);
        }
      }

    };

    this.removeIncident = function (incidentData) {
      var drivers = this.getQuoteIntent().Drivers;
      var driver = _.findWhere(drivers, {ID: incidentData.DriverID});
      if (driver) {
        driver.Incidents.splice(_.indexOf(driver.Incidents, _.findWhere(driver.Incidents, {ID: incidentData.ID})), 1);
      }
      //Set the flag hasIncidents
      this.setHasIncidents(this.getIncidents().length > 0 ? true : false);
    };

    this.getIncidents = function () {
      var incidents = [];
      _.each(this.getQuoteIntent().Drivers, function (driver) {
        if (driver.Incidents && driver.Incidents.length > 0) {
          _.values(driver.Incidents).forEach(function (incident) {
            incidents.push(incident);
          });
        }
      });
      return incidents;
    };

    this.getIncidentById = function (incidentData) {
      var driver = this.getDriverById(incidentData.DriverID);
      return _.findWhere(driver.Incidents, {ID: incidentData.ID});
    };

    //--------------- Vehicle ----------------------------------------------

    //Removes the specified vehicle from the vehicle list
    this.removeVehicle = function (vehicleId) {
      var vehicles = this.getQuoteIntent().Vehicles;
      vehicles.splice(_.indexOf(this.getQuoteIntent().Vehicles, _.findWhere(this.getQuoteIntent().Vehicles, {ID: vehicleId})), 1);
      _.forEach(this.getQuoteIntent().Drivers, function (driver) {
        if (driver.PrimaryVehicleID === vehicleId) {
          driver.PrimaryVehicleID = null;
        }
      })
    };

    //Saves the vehicle to the vehicles array if one already exists
    //it is replaced
    this.saveVehicle = function (vehicleData) {
      var vehicle = _.findWhere(this.getQuoteIntent().Vehicles, {ID: vehicleData.ID});
      if (vehicle) {
        var index = _.indexOf(this.getQuoteIntent().Vehicles, vehicle);
        this.getQuoteIntent().Vehicles[index] = vehicleData;
      }
      else {
        this.getQuoteIntent().Vehicles.push(vehicleData);
      }
    };

    this.getVehicleCount = function () {
      if (this.getQuoteIntent().Vehicles && this.getQuoteIntent().Vehicles.length > 0) {
        return this.getQuoteIntent().Vehicles.length;
      } else {
        return 0;
      }
    };

    this.getVehicles = function () {
      var vehicleCopies = [];
      _.each(this.getQuoteIntent().Vehicles, function (vehicle) {
        vehicleCopies.push(angular.copy(vehicle));
      });
      return vehicleCopies;
    };

    //Returns all vehicles for display purposes only
    this.getReadOnlyVehicles = function () {
      return this.getQuoteIntent().Vehicles;
    };

    //Returns the Vehicle found with the ID matching the id parameter
    this.getVehicleById = function (id) {
      var vehicle = _.findWhere(this.getQuoteIntent().Vehicles, {ID: id});
      if (vehicle) {
        return angular.copy(vehicle);
      }
    };

    this.updateVehicleVin = function (id, vin) {
      var vehicle = _.findWhere(this.getQuoteIntent().Vehicles, {ID: id});
      if (vehicle) {
        vehicle.Vin = vin;
      }
    };

    this.updateVehicleLienData = function (id, name, address1, city, state, zip) {
      var vehicle = _.findWhere(this.getQuoteIntent().Vehicles, {ID: id});
      if (vehicle) {
        vehicle.Lienholder = {
          Name: name,
          AddressLine1: address1,
          City: city,
          State: state,
          PostalCode: zip
        }
      }
    };

    this.updateVehicle = function (id, vin, model, modelId, year) {
      var vehicle = _.findWhere(this.getQuoteIntent().Vehicles, {ID: id});
      if (vehicle) {
        vehicle.Vin = vin;
        vehicle.Model = model;
        vehicle.ModelID = modelId;
        vehicle.YearStyleID = null;
        vehicle.Year = year.toString();
      }
    };


    this.getNextVehicle = function () {
      var vehicles = this.getQuoteIntent().Vehicles;
      if (this.getQuoteIntent().Vehicles.length > 0) {
        return angular.copy(_.first(vehicles));
      } else {
        return null;
      }
    };

    //--------------- Quote ----------------------------------------------
    this.saveQuote = function (quoteData) {
      if (quoteData) {
        this.getQuoteIntent().Quote = quoteData;
      }
    };

    this.getQuote = function () {
      return angular.copy(this.getQuoteIntent().Quote);
    };

    this.getQuotePaymentPlans = function () {
      return this.getQuoteIntent().Quote.PaymentPlans;
    };

    //---------------- Policy ---------------------------------------------------

    this.savePolicy = function (policyData) {
      if (policyData) {
        this.getQuoteIntent().Policy = policyData;
      }
    };

    this.getPolicy = function () {
      if (this.getQuoteIntent().Policy) {
        return angular.copy(this.getQuoteIntent().Policy);
      }
    };


    //---------------- ancillaryPlans-------------------------------------------------

    this.saveAncillaryPlans = function (plans) {
      if (plans) {
        this.getQuoteIntent().Ancillaries.AncillaryPlans = plans;
      }
    };

    this.getLegalPlan = function () {
      var legalPlan = _.findWhere(this.getQuoteIntent().Ancillaries.AncillaryPlans, {PlanId: 2});
      if (legalPlan) {
        return legalPlan;
      }
    };

    this.getLifePlan = function () {
      var lifePlan = _.findWhere(this.getQuoteIntent().Ancillaries.AncillaryPlans, {PlanId: 4});
      if (lifePlan) {
        return angular.copy(lifePlan);
      }
    };

    this.getAncillaryPlans = function () {
      var ancillaryPlanCopies = [];
      _.each(this.getQuoteIntent().Ancillaries.AncillaryPlans, function (ancillaryPlan) {
        ancillaryPlanCopies.push(angular.copy(ancillaryPlan));
      });
      return ancillaryPlanCopies;
    };

    this.saveAncillaryPurchaseResponse = function (response) {
      this.getQuoteIntent().Ancillaries.AncillaryResponse = response;
    };

    this.getAncillaryPlansResponse = function () {
      return angular.copy(this.getQuoteIntent().Ancillaries.AncillaryResponse);
    };

    this.getAncillaryParam = function () {
      return this.getQuoteIntent().Ancillaries.ParamContent;
    };
    this.saveAncillaryParam = function (item) {
      if (item) {
        this.getQuoteIntent().Ancillaries.ParamContent = item;
      }
    };

    //--------------- Quote State ----------------------------------------------
    this.saveQuoteState = function (quoteStateItem) {
      this.getQuoteIntent().QuoteState = quoteStateItem;
    };

    this.getQuoteState = function () {
      return this.getQuoteIntent().QuoteState;
    };

    this.hasIncidents = function () {
      return this.getIncidents().length > 0 || this.getQuoteIntent().QuoteState.HasIncidents;
      //return this.getQuoteIntent().QuoteState.HasIncidents;
    };

    this.setHasIncidents = function (boolVal) {
      this.getQuoteIntent().QuoteState.HasIncidents = boolVal;
    };

    this.hasConvictions = function () {
      return this.getQuoteIntent().QuoteState.HasConvictions;
    };

    this.setHasConvictions = function (boolVal) {
      this.getQuoteIntent().QuoteState.HasConvictions = boolVal;
    };

    //--------------- QuoteIntent ----------------------------------------------

    this.populateData = function (dataResult) {
      _.extend(dataDocument.data, dataResult.data);
    };

  }];
}


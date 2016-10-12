/**
 * Created by gabello on 12/14/2015.
 */
function QuoteIntentMappingService() {
  'use strict';

  function CreateDriver(modelHelper, driverItem, lookupDataService){
      var driver = modelHelper.createDriver();
      driver.populateData(driverItem);

      //populate incidents if there are any
      if (driverItem.Incidents && driverItem.Incidents.length > 0) {
        driver.Incidents = [];
        _.values(driverItem.Incidents).forEach(function (incidentItem) {
          if (incidentItem.ID) {
            var incident = modelHelper.createIncident();
            incident.populateData(incidentItem);
            var classification = lookupDataService.getIncidentClassification(incidentItem.IncidentTypeID);
            incident.Classification = classification;
            incident.DriverID = driverItem.ID;

            driver.Incidents.push(incident);
          }
        })
      }
      driver.save();
    }

  return ['QuoteIntentModel', 'ModelHelper', 'LookupDataService',
    function (quoteIntentModel, modelHelper, lookupDataService) {
      return {

        updateQuoteIntent: function (data) {
          var document = data.data;

          //5/16/2016 Nick GTemporarily removing this cause it never worked. I fixed it and use it on the landing pages only. If we put
          //this back in we need to test thoroughly
          //quoteIntentModel.init();

          quoteIntentModel.setQuoteIntentId(document.id);

          //---------------- Save address ----------------------------------
          if (document.attributes['quote-intent'].Address) {
            var address = quoteIntentModel.getAddress();
            if(!address){
              address = modelHelper.createAddress();
            }
            address.populateData(document.attributes['quote-intent'].Address);
            address.save();
          }

          //---------------- Build Policy  ----------------------------------
          if (document.attributes['quote-intent'].Policy) {
            var policy = modelHelper.createPolicy();
            policy.populateData(document.attributes['quote-intent'].Policy);
          }

          //---------------- Build Drivers  ----------------------------------
          if (document.attributes['quote-intent'].Drivers) {
            //We need to process the Applicant first
            var applicant = _.findWhere(document.attributes['quote-intent'].Drivers, {RelationshipToInsured: 'applicant'});
            if(applicant) {
              CreateDriver(modelHelper, applicant, lookupDataService);
            }

            var additionalDrivers = _.filter(document.attributes['quote-intent'].Drivers, function(driver){
              return driver.RelationshipToInsured != 'applicant';
            });
            if(additionalDrivers && additionalDrivers.length > 0) {
              _.each(additionalDrivers, function (driverItem) {
                CreateDriver(modelHelper, driverItem, lookupDataService);
              });
            }
          }

          //---------------- Build Vehicles  ----------------------------------
          if (document.attributes['quote-intent'].Vehicles) {
            _.each(document.attributes['quote-intent'].Vehicles, function (vehicleItem) {
              var vehicle = modelHelper.createVehicle();
              vehicle.populateData(vehicleItem);
            });
          }

          //---------------- Build Quote  ----------------------------------
          //We only get quote if we have quoted
          if (document.attributes['quote-intent'].Quote) {
            var quote = modelHelper.createQuote();
            quote.populateData(document.attributes['quote-intent'].Quote);
          }

          //---------------- Build QuoteState  ----------------------------------
          if (document.attributes['quote-intent'].QuoteState) {
            var quoteState = modelHelper.createQuoteState();
            quoteState.populateData(document.attributes['quote-intent'].QuoteState);
          }

          if (document.attributes['quote-intent'].ClientData) {
            var clientData = modelHelper.createClientData();
            clientData.populateData(document.attributes['quote-intent'].ClientData);
          }
        }
      }
    }];
}

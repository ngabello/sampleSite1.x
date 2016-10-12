/**
 * Created by gabello on 5/18/2016.
 */

function BaseLandingCtrl() {
  'use strict';

  return ['$idle', '$log', '$scope', 'spinnerService', 'goApiDataService', 'VehicleService', 'QuoteIntentModel', 'ClientDataModel', 'errorService', 'JourneyService', 'legalAssistService',
    function ($idle, $log, $scope, spinnerService, goApiDataService, vehicleService, quoteIntentModel, clientDataModel, errorService, journeyService, legalAssistService) {

      this.doCommonStuff = function(showSpinner, appStartSource){
        //Stops the idle timer
        if($idle.running) {

          $idle.unwatch();
        }

        console.log('Starting watch');
        $idle.watch();

        if(showSpinner) {
          spinnerService.show('loadingSpinner');
        }

        quoteIntentModel.init();

        //Gets everything about the browser and ip data
        var clientData = quoteIntentModel.getClientData();
        if (!clientData) {
          clientData = new clientDataModel();
        }
        clientData.AppStartSource = appStartSource;
        clientData.getClientData();

        this.preloadData();
      };


      this.preloadData = function(){
        vehicleService.getVinIsoYears().then(function(){
        }, function (error) {
          $log.error(String.format('Retrying getting VinIsoYears'));
          vehicleService.getVinIsoYears().then(function(){
          }, function (error) {
            $log.error("2nd attempt failed loading vehicle years")
          })
        });

        goApiDataService.getLookups().then(function(){
        }, function (error) {
          $log.error(String.format('Retrying getting lookup data'));
          goApiDataService.getLookups().then(function(){
          }, function (error) {
            $log.error(String.format('2nd retry failed getting lookup data'));
            journeyService.terminateJourney(1246);
          })
        });
        legalAssistService.fillLegalAssistData().catch(function(error){
          $log.error('Error getting legal assistance data')
        })
      };

      return this;
    }
  ];
}

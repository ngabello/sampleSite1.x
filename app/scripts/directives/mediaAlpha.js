/**
 * Created by jholloman on 12/8/2014.
 */
function mediaAlpha() {
  return ['$window', 'segmentIoTrackingService', 'localStorageService', function ($window, segmentIoTrackingService, localStorageService) {
    var quote_id = "T_JGFEjpyqWdositFKMI9xwkDiggRQ";
    var zip_id = "Rn2fqTG-qWKlIm3055nD7XVhHjHMpw";
    var termination_id = "1VMK1MaxTAQ0mjxruLX3QUvDpdyZlQ";
    function fixDOB(dob) {
      var pieces = dob.split('-');
      var last = pieces.splice(-1, 1);
      var joined = last.concat(pieces).join('-');

      return joined
    }

    return {
      controller: ['$scope', 'QuoteIntentModel', function ($scope, quoteIntentModel) {
        $scope.address = quoteIntentModel.getAddress();
        $scope.driver = quoteIntentModel.getPolicyHolder();

      }],
      link: function (scope, el, at) {
        var fn = function () {
          //allow optimizely to kill media alpha
          if($window.noMediaAlpha) return;
          if(localStorageService.get('prefillSource') == 'CompareNow') return;

          if ((at.mediaAlpha == 'Quote' && scope.compare.open) || at.mediaAlpha == 'Quote Termination') {
            var mediaId = quote_id;
            if(at.mediaAlpha == 'Quote Termination'){
              mediaId = termination_id;
            }
            var address = scope.address;
            var driver = scope.driver;
            $('#contact-message').hide();
            //info.dob = fixDOB(info.dob);
            if (!driver) return;
            var homeowner = driver.ResidenceOwnership == 'OwnHome' ? 1 : 0;
            var gender = null;
            if(driver.Gender){
              if(driver.Gender == 'Male'){
                gender = 'M';
              }
              if(driver.Gender == 'Female'){
                gender = 'F';
              }
            }

            /*manually fire Media Alpha*/
            var loadAds = function () {
              MediaAlphaExchange = {
                "type": "ad_unit",
                "placement_id": mediaId,
                "version": "17",
                "sub_1": "test sub id",
                "data": {
                  "contact": driver.getFullName() || '',
                  "email": driver.EmailAddress,
                  "zip": address.PostalCode || 'auto',
                  "currently_insured": driver.CurrentlyInsured,
                  "home_ownership": homeowner,
                  "drivers": [{
                    "birth_date": fixDOB(driver.DateOfBirth),
                    "gender": gender,
                    "first_licensed": driver.AgeFirstLicensed
                  }]
                }
              };
              MediaAlphaExchange__load('quote_compare');
              segmentIoTrackingService.trackGeneralEvent('mediaAlphaImpression', [
                {key: 'id', value: mediaId}
              ]);
            };
            loadAds();
          }
          if (at.mediaAlpha == 'Zip' || scope.mediaAlphaLoad) {
            var mediaId = zip_id;
            /*manually fire Media Alpha*/
            var loadAds = function () {
              MediaAlphaExchange = {
                "type": "ad_unit",
                "placement_id": zip_id,
                "version": "17",
                "sub_1": "test sub id",
                "data": {
                  "zip": scope.zipCode
                }
              };
              MediaAlphaExchange__load('quote_compare');
              segmentIoTrackingService.trackCustomEvent('mediaAlphaImpression', [
                {key: 'id', value: mediaId}
              ]);
            };
            loadAds();

          }
          el.click(function(){
            segmentIoTrackingService.trackCustomEvent('mediaAlphaClick', [
              {key: 'id', value: mediaId}
            ])
          })
        };
        scope.$on('$destroy', fn())
      }
    }
  }]
}


/**
 * Created by gabello on 3/17/2016.
 */

function ChannelSourceModel(){
  return ['ancillaryAPIDataService', '$location', '$window', 'localStorageService', 'sessionKeys', 'QuoteIntentModel',
    function (ancillaryAPIDataService, $location, $window, localStorageService, sessionKeys, quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          ChannelSourceData: {
            AccountNumber: null,
            QuoteNumber: null,
            JobNumber: null,
            Channel: null,
            Device: null,
            MarketingCampaign: null,
            Vendor: null,
            VendorLeadType: null,
            EventCode: null,
            EventTimestamp: null,
            Intermediary: null,
            IntermediaryType: null
          }
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

       saveChannelSourceData: function () {
          ancillaryAPIDataService.saveChannelSourceData(this.ChannelSourceData);
        },
        createChannelSource: function(event, i, it, v, mc, vlt){
          //picks up query strings after route
          var params = $location.search();
          //picks up query strings before hash and route.
          var queryString = function () {
            var e, i, n, r, a = {};
            for (e = $window.location.search.replace(/[\/\\#,+()$~%.'":*?<>{}]/g,'').split("&"), n = 0, r = e.length; r > n; n++)i = e[n].split("="), a[i[0]] = i[1];
            return a
          }();

          var quoteNumber = quoteIntentModel.getQuote().QuoteNumber;
          if(!quoteNumber){
            quoteNumber = localStorageService.get(sessionKeys.quoteId);
          }

          this.ChannelSourceData.EventTimestamp = moment(new Date()).format('MM/DD/YYYY, h:mm:ss');
          this.ChannelSourceData.Intermediary = i;
          this.ChannelSourceData.IntermediaryType = it;
          this.ChannelSourceData.EventCode = event;
          this.ChannelSourceData.Vendor = v || queryString['utm_source'] || params['utm_source'];
          this.ChannelSourceData.MarketingCampaign = mc || queryString['utm_campaign'] || params['utm_campaign'];
          this.ChannelSourceData.VendorLeadType = vlt || queryString['utm_medium'] || params['utm_medium'];
          this.ChannelSourceData.QuoteNumber = quoteNumber;
          this.ChannelSourceData.Channel = 'Web';
        }
      });

      return clazz;
    }]
}

/**
 * Created by gabello on 1/5/2016.
 */
'use strict';
function ClientDataModelService() {

  return ['QuoteIntentModel',
    function (quoteIntentModel) {
      var clazz = function (attributes) {
        var defaults = {
          AppName: null,
          UserAgent: null,
          BrowserName: null,
          FullVersion: null,
          MajorVersion: null,
          TimeZoneOffset: null,
          ClientInfo:null,
          Channel:"Web",
          NextView:null,
          ViewedPages:[],
          CurrentView:null,
          RqId:null,
          AppStartSource:null,
          Broker:null,
          IntegrationPartner:null
        };
        _.extend(this, defaults, attributes);
      };
      // Class Methods
      _.extend(clazz.prototype, {

        getBrowserData: function (nav) {
          var data = {};

          var nVer = nav.appVersion;
          var nAgt = nav.userAgent;
          var browserName = nav.appName;
          var fullVersion = '' + parseFloat(nav.appVersion);
          var majorVersion = parseInt(nav.appVersion, 10);
          var nameOffset, verOffset, ix;

          // In Opera, the true version is after "Opera" or after "Version"
          if ((verOffset = nAgt.indexOf("Opera")) != -1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) != -1)
              fullVersion = nAgt.substring(verOffset + 8);
          }
          // In MSIE, the true version is after "MSIE" in userAgent
          else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = nAgt.substring(verOffset + 5);
          }
          // In Chrome, the true version is after "Chrome"
          else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset + 7);
          }
          // In Safari, the true version is after "Safari" or after "Version"
          else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) != -1)
              fullVersion = nAgt.substring(verOffset + 8);
          }
          // In Firefox, the true version is after "Firefox"
          else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset + 8);
          }
          // In most other browsers, "name/version" is at the end of userAgent
          else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
            (verOffset = nAgt.lastIndexOf('/'))) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
              browserName = nav.appName;
            }
          }
          // trim the fullVersion string at semicolon/space if present

          if ((ix = fullVersion.indexOf(";")) != -1)
            fullVersion = fullVersion.substring(0, ix);
          if ((ix = fullVersion.indexOf(" ")) != -1)
            fullVersion = fullVersion.substring(0, ix);

          majorVersion = parseInt('' + fullVersion, 10);
          if (isNaN(majorVersion)) {
            fullVersion = '' + parseFloat(nav.appVersion);
            majorVersion = parseInt(nav.appVersion, 10);
          }

          this.AppName = nav.appName;
          this.UserAgent = nav.userAgent;
          this.BrowserName = browserName;
          this.FullVersion = fullVersion;
          this.MajorVersion = majorVersion;
          this.TimeZoneOffset = moment().format("Z");
        },

        getUserInfo: function() {
          var userInfo = this;
          UserInfo.getInfo(function (data) {
            // the "data" object contains the info
            userInfo.ClientInfo = data;
          }, function (err) {
            // the "err" object contains useful information in case of an error
          });
        },

        getClientData:function(){
          this.getBrowserData(window.navigator || navigator);
          this.getUserInfo();
          this.save();
        },

        save: function () {
          quoteIntentModel.saveClientData(this);
        },

        populateData: function (data) {
          _.extend(this, data);

          this.save();
        }
      });

      return clazz;
    }
  ];
}

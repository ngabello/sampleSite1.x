/**
 * Created by gabello on 12/2/2015.
 */
'use strict';
var getAppEntryPointsFlowState = function () {
  return {
    'postal-landing': {
      name: 'postalLanding',
      url: '/postal-landing/{postalCode}',
      "breadCrumb": null,
      controller: PostalLandingCtrl()
    },
    'lead-landing': {
      name: 'leadLanding',
      url: '/lc-landing/{rqId}?state&utm_source',
      templateUrl: '../scripts/appEntryPoints/views/loader.tpl.html',
      "breadCrumb": null,
      controller: LeadCloudLandingCtrl()
    },
    'broker-landing': {
      name: 'brokerLanding',
      url: '/brokers-landing?zip&fwapsfirstname&fwapslastname&fwapsaddress1&fwapsyear&fwapsmake&fwapsmodel',
      "breadCrumb": null,
      controller: BrokerLandingCtrl()
    },
    'comparenow-landing': {
      name: 'compareNowLanding',
      url: '/comparenow-landing?account&job&activity',
      templateUrl: '../scripts/appEntryPoints/views/compare-now.tpl.html',
      "breadCrumb": null,
      controller: CompareNowLandingCtrl()
    },
    'quote-retrieve': {
      name: 'quoteRetrieve',
      url: '/quote-retrieve',
      templateUrl: '../scripts/appEntryPoints/views/quote-retrieve.tpl.html',
      "breadCrumb": null,
      controller: QuoteRetrieveCtrl()
    },
    'postalCode-details': {
      name: 'postalCodeDetails',
      url: '/postal-code',
      templateUrl: '../scripts/appEntryPoints/views/postal-code-details.tpl.html',
      /*views: {
        "contentView": { templateUrl: '../scripts/appEntryPoints/views/postal-code-details.tpl.html' }
      },*/
      "breadCrumb": "Start",
      "breadCrumbBeforeQuote":true,
      controller: PostalCodeCtrl()
    }
  }
};

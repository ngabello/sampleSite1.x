/**
 * Created by jholloman on 2/9/2015.
 */
'use strict';
function navSharedCtrl() {
  return ['$scope', '$log', '$q', 'QuoteIntentModel', 'environmentLink', '$sce', 'JourneyService',
    function ($scope, $log, $q, quoteIntentModel, environmentLink, $sce, journeyService) {

      var fun = quoteIntentModel.getPolicy();

      $scope.navSummary = {
        journeyPrefix: journeyService.getJourneyIdentifier(),
        drivers: quoteIntentModel.getReadOnlyDrivers(),
        policyHolder: quoteIntentModel.getPolicyHolder(),
        address: quoteIntentModel.getAddress(),
        vehicles: quoteIntentModel.getReadOnlyVehicles(),
        quoteIntent: quoteIntentModel.getQuoteIntent(),
        quote: quoteIntentModel.getQuote(),
        discounts: [],
        addDriverEnabled: false,
        policyTermsEnabled: false,
        policy: quoteIntentModel.getPolicy(),
        hasMotorcycle: quoteIntentModel.getPolicy() && quoteIntentModel.getPolicy().HasMotorcycle ? quoteIntentModel.getPolicy().HasMotorcycle : false,
        ancillaryCollection: [],
        specialOffer: quoteIntentModel.getAncillaryParam(),
        blockLeadLinks: false
      };

      var appSource = quoteIntentModel.getClientData().AppStartSource;
      if(appSource == 'LeadCloudLanding' && (!$scope.navSummary.quote.PayPlans || $scope.navSummary.quote.PayPlans.length == 0)){
        $scope.navSummary.blockLeadLinks = true;
      }

      var policyTermsValidate = function () {
        var isValid = true;
        //ensure that policyholder is valid
        if (!$scope.navSummary.policyHolder.isPolicyTermsEditable()) {
          isValid = false;
        }

        return isValid;
      };


      //Some business rules that need validating
      //This is gonna have to change for multi-journey cause we may not have all the items available at a specific time
      var bizRulesValidate = function () {
        var isValid = true;
        //if the policyholder is valid but Married
        var policyHolder = quoteIntentModel.getPolicyHolder();
        var quoteState = quoteIntentModel.getQuoteState();
        //ensure that policyholder is valid
        var IsPolicyHolderValid = policyHolder.isPolicyHolderValid() && quoteState.AdditionalDrivers != null;
        if (!IsPolicyHolderValid) {
          isValid = false;
        }
        //ensure that if the policyholder is married that there is a valid spouse
        var spouse = quoteIntentModel.getSpouse();
        if (IsPolicyHolderValid && policyHolder.MaritalStatus == getEnums().EnumMaritalStatuses.Married) {
          if (!spouse || !spouse.isDriverValid()) {
            isValid = false;
          }
        }

        return isValid;
      };

      var ancillaryDisplay = function () {

        if ($scope.navSummary.specialOffer == 'idt') {
          $scope.showAncillary = true;
          $scope.navSummary.ancillaryCollection.push({
            PopOver: 'Free year of identity theft services included with purchase of your auto policy today.',
            PopOverTitle: 'Identity Theft Services',
            Image: environmentLink.cdnBase + '/images/secure.svg',
            Description: $sce.trustAsHtml('<span>FREE Year of Identity</span><br/>Theft Services')
          })
        }
        if ($scope.navSummary.specialOffer == 'toy') {
          $scope.showAncillary = true;
          $scope.navSummary.ancillaryCollection.push({
            PopOver: 'Purchase your auto policy today and receive a Free “Hank” Elephant Toy (valid for VA purchases through Bankrate from 10/6/15-11/6/15).',
            PopOverTitle: 'Free “Hank” Elephant Toy',
            Image: environmentLink.cdnBase + '/images/gift.svg',
            Description: $sce.trustAsHtml('<div style="width: 212px;height: 30px;margin-top: 6px;">Free “Hank” Elephant Toy</div>')
          })
        }
        if ($scope.navSummary.policyHolder) {
          if ($scope.navSummary.policyHolder.ResidenceOwnership && $scope.navSummary.policyHolder.ResidenceOwnership !== 'Other' && $scope.navSummary.policyHolder.ResidenceOwnership !== 'rent') {
            $scope.showAncillary = true;
            $scope.navSummary.ancillaryCollection.push({
              PopOver: 'Auto insurance customers receive a discount for bundling a homeowner’s insurance policy. Learn more after you purchase your auto policy today.',
              PopOverTitle: 'Homeowner\'s Insurance',
              Description: $sce.trustAsHtml('<span>Bundle & save with</span><br/>Homeowner\'s Insurance'),
              Image: environmentLink.cdnBase + '/images/home50.png'
            })
          } else if ($scope.navSummary.policyHolder.ResidenceOwnership == 'rent') {
            $scope.showAncillary = true;
            $scope.navSummary.ancillaryCollection.push({
              PopOver: 'Auto insurance customers receive a discount for bundling a renter’s insurance policy. Learn more after you purchase your auto policy today.',
              PopOverTitle: 'Renter\'s Insurance',
              Description: $sce.trustAsHtml('<span>Bundle & save with</span><br/>Renter\'s Insurance'),
              Image: environmentLink.cdnBase + '/images/home50.png'
            })
          }
        }
        if ($scope.navSummary.hasMotorcycle) {
          $scope.showAncillary = true;
          $scope.navSummary.ancillaryCollection.push({
            PopOver: 'Auto insurance customers receive a discount for bundling a motorcycle insurance policy. Learn more after you purchase your auto policy today.',
            PopOverTitle: 'Motorcycle Insurance',
            Description: $sce.trustAsHtml('<span>Bundle & save with</span><br/>Motorcycle Insurance'),
            Image: environmentLink.cdnBase + '/images/bike50.png'
          })
        }
      };
      ancillaryDisplay();


      $scope.$watchCollection(['navSummary.vehicles', 'navSummary.drivers'], function (newValue, oldValue) {
        if ($scope.navSummary.policyHolder && bizRulesValidate()) {
          $scope.navSummary.addDriverEnabled = true;
        }

        // Don't allow the user to edit the policy terms until they have completed the minimum requirements
        if ($scope.navSummary.policyHolder && policyTermsValidate()) {
          $scope.navSummary.policyTermsEnabled = true;
        }


        if ($scope.navSummary.drivers && $scope.navSummary.drivers.length > 0) {
          if($scope.navSummary.quote) {
            var discounts = $scope.navSummary.quote.getDiscounts();
            $scope.navSummary.discounts = _.sortBy(discounts, 'Desc');
          }
        }
      });
      $scope.discountFilter = function (item) {
        return item.Desc !== 'Channel/Affinity Discount';
      };
      $scope.toggle = function (menu) {
        switch (menu) {
          case 'drivers':
            $scope.driversOpen = $scope.driversOpen ? false : true;
            break;
          case 'vehicles':
            $scope.vehiclesOpen = $scope.vehiclesOpen ? false : true;
            break;
          default :
            break;
        }


      }
    }]
}

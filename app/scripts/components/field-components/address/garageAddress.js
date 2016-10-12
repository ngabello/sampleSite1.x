/**
 * Created by jholloman on 12/3/2015.
 */
'use strict';
function GarageAddress() {

  function invalid_POBox($sce) {
    return $sce.trustAsHtml('Please enter the zip code where the vehicle is garaged. This cannot be a post office box.');
  }

  function unRatedLocation($sce) {
    return $sce.trustAsHtml('We are not currently available in this zip code. Please verify your zip code and try again.');
  }

  function ShowMediaAlpha(ModalService, form, state, postalCode, $sce) {
    ModalService.showMediaAlpha('We\'re not in your area yet', postalCode, 'Zip', 'Check out rates from these great companies');
    form.customerZip.$setValidity('unratedLocation', false);
    state.alerts.push({
      type: 'danger',
      msg: unRatedLocation($sce)
    });
  }

  function InvalidatePostalCode(form, state, $sce) {
    form.customerZip.$setValidity('po_box', false);
    state.alerts.push({
      type: 'danger',
      msg: invalid_POBox($sce)
    });
  }

  function ValidateCustomerZip(addressService, postalCode, self, postalCodeTypeConst, $sce, ModalService){
      addressService.getAddress(postalCode).then(function (address) {
        self.postalDisabled = false;
        if (self.state.alerts.length > 0) {
          self.state.alerts.splice(0, self.state.alerts.length);
        }
        self.form.customerZip.$setValidity('po_box', true);
        self.form.customerZip.$setValidity('unratedLocation', true);
        self.form.customerZip.$setValidity('invalidCode', true);
        if (address.HasRatedLocations) {
          var addr1 = angular.copy(self.ngModel.AddressLine1);
          var addr2 = angular.copy(self.ngModel.AddressLine2);
          self.ngModel = address;
          self.ngModel.AddressLine1 = addr1;
          self.ngModel.AddressLine2 = addr2;
          //}
        } else if (!address.HasRatedLocations) {
          if (address.PostalCodeType && address.PostalCodeType == postalCodeTypeConst.postalCodeType) {
            InvalidatePostalCode(self.form, self.state, $sce);
          } else {
            //Valid Zipcode but out of our territory
            ShowMediaAlpha(ModalService, self.form, self.state, address.PostalCode, $sce);
          }
        } else {
          self.form.customerZip.$setValidity('invalidCode', false);
        }
      }, function (error) {
        self.postalDisabled = false;
        self.form.customerZip.$setValidity('invalidCode', false);
      })
    }

  return {
    bindings: {
      form: '=',
      ngModel: '=',
      state: '='
    },
    controller: ['$scope', 'AddressService', 'ModalService', 'QuoteIntentModel', '$sce', 'postalCodeTypeConst', 'EventService',
      function ($scope, addressService, ModalService, quoteIntentModel, $sce, postalCodeTypeConst, eventService) {
        this.postalDisabled = false;
        this.address = quoteIntentModel.getAddress();

        var instance = this;

        this.validatePostalCode = function () {
          //if no customerZip then nothing to validate
          if(!instance || !instance.form || !instance.form.customerZip)
          {
            return;
          }
          if (instance && instance.ngModel && instance.form.customerZip.$dirty) {
            var postalCode = instance.ngModel.PostalCode;
            var postalRegEx = new RegExp('[0-9]{5}');
            if(postalRegEx.test(postalCode))
            {
              ValidateCustomerZip(addressService, postalCode, instance, postalCodeTypeConst, $sce, ModalService);
            }else{
              instance.form.customerZip.$setValidity('invalidCode', false);
            }
          }
        };

        $scope.$evalAsync(function () {
          if (!$scope.$ctrl.state.address.HasRatedLocations) {
            if ($scope.$ctrl.state.address.PostalCodeType && $scope.$ctrl.state.address.PostalCodeType == postalCodeTypeConst.postalCodeType) {
              if ($scope.$ctrl.form.customerZip) {
                InvalidatePostalCode($scope.$ctrl.form, $scope.$ctrl.state, $sce);
              }
            } else {
              //Valid Zipcode but out of our territory
              ShowMediaAlpha(ModalService, $scope.$ctrl.form, $scope.$ctrl.state, $scope.$ctrl.state.address.PostalCode, $sce);
            }
          }
        });

        this.updatePostalCode = function (postalCode) {
          if (postalCode && postalCode.length == 5) {
            this.postalDisabled = true;
            var self = this;
            ValidateCustomerZip(addressService, postalCode, self, postalCodeTypeConst, $sce, ModalService);
          }
        };

        //add the event to the service
        eventService.addEvent(this.validatePostalCode);

      }],
    template: ['QuoteIntentModel', '$attrs', function (quoteIntentModel, $attrs) {
      var result;
      var pageName = $attrs && $attrs.passedPage ? $attrs.passedPage : '';
      var previouslyViewed = false;
      var viewedPages = quoteIntentModel.getClientData().ViewedPages;
      var policyStatus = quoteIntentModel.getPolicy().PolicyStatus ? quoteIntentModel.getPolicy().PolicyStatus : ''; //Quoted
      if (viewedPages) {
        previouslyViewed = viewedPages.some(function (page) {
          var pageRegExp = new RegExp(pageName);
          return pageRegExp.test(page);
        })
      }
      if (!previouslyViewed && policyStatus != 'Quoted') {
        result = [
          //AddressLine 1 and AddressLine 2
          '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.customerAddress.$invalid]">',
          ' <label class="control-label form-left hidden-xs"><span>Garaging address</span></label>',
          ' <div ng-messages="$ctrl.form.customerAddress.$error" ng-if="$ctrl.form.submitted">',
          '   <div ng-message="required">Please enter garaging address.</div>',
          '   <div ng-message="pattern">Please enter a valid street address.</div>',
          ' </div>',
          ' <input class="form-control form-md form-right" id="customerAddress" name="customerAddress"',
          '     title="Home address" type="text" ng-model="$ctrl.ngModel.AddressLine1"',
          '     placeholder="Address" required ng-pattern="/^(?=.*(\\d))(?=.*[a-zA-Z])(?=.*(\\W)).{5,64}$/">',
          '<!-- Address Line 2-->',
          ' <label class="sr-only">Apartment</label>',
          ' <input class="form-control not-required form-sm form-margin" id="customerApt"',
          '     name="customerApt" placeholder="Apt #" type="tel" maxlength="5" ng-model="$ctrl.ngModel.AddressLine2">',
          '</div>',
          //City, $ctrl.state
          '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.customerCity.$invalid]">',
          ' <label class="control-label form-left hidden-xs"><span>City</span></label>',
          ' <div ng-messages="$ctrl.form.customerCity.$error" ng-if="$ctrl.form.submitted">',
          '  <div ng-message="required">Please enter garaging address.</div></div>',
          ' <input class="form-control form-right" id="customerCity" name="customerCity" placeholder="City"',
          '   title="City" type="text" ng-model="$ctrl.ngModel.City" required>',
          ' <label class="sr-only">State</label>',
          ' <span>, </span><span ng-bind="$ctrl.ngModel.State"></span>',
          '</div>',
          //PostalCode
          '<div class="form-group" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.customerZip.$invalid]">',
          ' <div>',
          '   <label class="control-label form-left hidden-xs">Zip code</label>',
          ' </div>',
          ' <div class="form-right"',
          '   <div ng-messages="$ctrl.form.customerZip.$error" ng-if="$ctrl.form.submitted">',
          '     <div ng-message="required">Please enter a postal code.</div>',
          '     <div ng-message="pattern">Please enter a valid postal code.</div>',
          '     <div ng-message="invalidCode">Please verify your postal code.</div>',
          '     <div ng-message="po_box"></div>',
          '     <div ng-message="unratedLocation"></div>',
          '   </div>',
          '   <input type="text" class="form-control form-sm form-right" id="customerZip" maxlength="5"',
          '     ng-change="$ctrl.updatePostalCode($ctrl.ngModel.PostalCode)" ng-disabled="$ctrl.postalDisabled"',
          '     title="Zip code" name="customerZip" ng-model="$ctrl.ngModel.PostalCode" placeholder="Zip Code" required>',
          ' </div>',
          '</div>',
          //County
          '<div class="form-group" ng-if="$ctrl.ngModel.Counties.length > 1" ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.customerCounty.$invalid]">',
          ' <label class="control-label form-left"><span>County</span></label>',
          ' <div ng-messages="$ctrl.form.customerCounty.$error" ng-if="$ctrl.form.submitted">',
          '   <div ng-message="required">Please select a county.</div></div>',
          ' <select class="form-control form-right" ng-model="$ctrl.ngModel.County" id="customerCounty"  name="customerCounty"',
          '   ng-options="a.Name as a.Name for a in $ctrl.ngModel.Counties" required>',
          ' <option value="">--Select your county--</option>',
          ' </select>',
          '</div>'
        ];
      } else {
        result = [
          ' <div class="form-group">',
          '<label class="control-label form-left">Garaging address</label>',
          '<div class="form-right">',
          '<span ng-bind="$ctrl.ngModel.AddressLine1"></span>',
          '<span ng-if="$ctrl.ngModel.AddressLine2">',
          '<br/>',
          '<span  ng-bind="$ctrl.ngModel.AddressLine2"></span>',
          '</span>',
          '<br/>',
          '<span ng-bind="$ctrl.ngModel.City"></span> ',
          '<span ng-bind="$ctrl.ngModel.State"></span> ',
          '<span ng-bind="$ctrl.ngModel.PostalCode"></span>',
          '</div>',
          '</div>'
        ]
      }
      return result.join('')
    }]
  }
}

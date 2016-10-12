/**
 * Created by jholloman on 1/7/2016.
 */
'use strict';
function CustomEquipment() {
  return {
    bindings: {
      form: '=',
      state: '='
    },
    template: ['QuoteIntentModel', function (quoteIntentModel) {
      var addressState = quoteIntentModel.getAddress().State;
      if (addressState == 'VA') {
        var result = [
          '<div class="form-group"',
          'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.form.customEquipment.$invalid]"',
          'data-toggle="buttons">',
          '<label class="control-label form-left">',
          '<span>Custom equipment</span>',
          '</label>',
          '<div ng-messages="$ctrl.form.customEquipment.$error" ng-if="$ctrl.state.formSubmitted">',
          '<div ng-message="required">Please choose an answer.</div>',
          '</div>',
          '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
          'model=\'$ctrl.state.vehicle.CustomEquipment\' identifier="\'rdCustomEquipment\'" options=\'$ctrl.state.radioChoices.trueFalse\'></buttons-radio>',
          '<input type="hidden" id="customEquipment" name="customEquipment" type="text" ng-model="$ctrl.state.vehicle.CustomEquipment" required/>',
          '</div>',
          '<!-- Custom Equipment Amount -->',
          '<div class="form-group"',
          'ng-class="{true: \'has-error\'}[$ctrl.state.formSubmitted && $ctrl.state.vehicle.CustomEquipment === true && $ctrl.form.customEquipment.$invalid]"',
          'ng-if="$ctrl.state.vehicle.CustomEquipment === true">',
          '<label class="control-label form-left">',
          '<span>Custom equipment amount</span>',
          '</label>',
          '<div ng-messages="$ctrl.form.vehicleEquipmentAmount.$error"',
          'ng-if="$ctrl.state.formSubmitted && $ctrl.state.vehicle.CustomEquipment === true">',
          '<div ng-message="required">Please choose your custom equipment amount.</div>',
          '</div>',
          '<select id="vehicleEquipmentAmount" class="form-control form-right" data-val="true" ng-model="$ctrl.state.vehicle.ValueOfCustomEquipment"',
          'name="vehicleEquipmentAmount"',
          'ng-options="a.Value as a.Desc for a in customEquipmentOptionList" required>',
          '<option value="">Select</option>',
          '</select>',
          '</div>'
        ];
        return result.join('')
      }
    }],
    controller: ['$scope', 'QuoteIntentModel', 'LookupDataService', function ($scope, quoteIntentModel, lookupDataService) {
      $scope.customEquipmentOptionList = lookupDataService.getVehicleCustomEquipmentOptions(quoteIntentModel.getAddress().State);
    }]
  }

}


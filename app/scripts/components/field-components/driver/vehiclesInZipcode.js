/**
 * Created by jholloman on 1/5/2016.
 */
function VehiclesInZipcode() {
  return {
    bindings: {
      form: '=',
      driverModel: '=',
      ngModel: '=',
      driverNotifications: '='
    },
    template: [
      '<div class="form-group"',
      '   ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.currentZipcode.$invalid]"',
      '   data-toggle="buttons">',
      '<div>',
      '<uib-alert ng-repeat="alert in $ctrl.driverNotifications" type="{{alert.type}}" close="$ctrl.closeAlert($index)">',
      '<div ng-bind-html="alert.msg"></div>',
      '</uib-alert>',
      '</div>',
      '<label class="control-label form-left"><span>Are all vehicles kept in ZIP <span ng-bind="$ctrl.postalCode"></span>?</label>',
      '<div ng-messages="$ctrl.form.currentZipcode.$error" ng-if="$ctrl.form.submitted"',
      'style="color:maroon">',
      '<div ng-message="required">Your answer is required.</div>',
      '<div ng-message="multipleZipCodes"></div>',
      '</div>',
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
      '  model=\'$ctrl.ngModel\'',
      '  identifier="\'rdCurrentZipcode\'"',
      '  options=\'$ctrl.vehiclesInZipcodeOptions\'></buttons-radio>',
      '<input id="currentZipcode" type="hidden" name="currentZipcode" type="text" ng-model="$ctrl.ngModel"',
      'required />',
      '</div>'
    ].join(''),
    controller: ['$scope', 'DriverService', 'ModelHelper', '$sce', 'pachydermContactInfo', 'QuoteIntentModel', 'radioChoices',
      function ($scope, driverService, modelHelper, $sce, pachydermContactInfo, quoteIntentModel, radioChoices) {
        this.vehiclesInZipcodeOptions = radioChoices.yesNo;
        this.postalCode = quoteIntentModel.getAddress().PostalCode;

        this.closeAlert = function (index) {
          this.driverNotifications.splice(index, 1);
        };

        var instance = this;
        $scope.$watch('$ctrl.ngModel', function (answer) {
          if (answer == null) {
            return;
          }
          if (answer == 'Yes') {
            if (instance.driverNotifications.length > 0) {
              instance.driverNotifications.splice(0, 1);
            }
            instance.form.currentZipcode.$setValidity('multipleZipCodes', true);
          } else {
            instance.form.currentZipcode.$setValidity('multipleZipCodes', false);
            var zipMsg = $sce.trustAsHtml(String.format('<b>Unfortunately, we cannot process your quote at this time.</b></br><hr>' +
              'Why?<br>' +
              'Since you have vehicles kept in more than one zip code, we need to finish your quote over the phone.</br>' +
              '<br>Please call {0}, an agent will be happy to assist you in completing your quote.<hr>', pachydermContactInfo.quoteIssuePhone));
            instance.driverNotifications.push({
              type: 'danger',
              msg: zipMsg
            });
          }
        });
      }]
  }

}

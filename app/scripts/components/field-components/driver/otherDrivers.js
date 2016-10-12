/**
 * Created by jholloman on 12/30/2015.
 */
function OtherDrivers() {
  return {
    bindings: {
      form: '=',
      ngModel: '='
    },
    template: [
      '<div ng-if="$ctrl.showComponent()" class="form-group"',
      ' ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.additionalDrivers.$invalid]"',
      ' data-toggle="buttons">',
      '  <label class="control-label form-left">',
      '   <span>Add another driver?</span>',
      '  </label>',
      '  <div ng-messages="$ctrl.form.additionalDrivers.$error" ng-if="$ctrl.form.submitted"',
      '   style="color:maroon">',
      '   <div ng-message="required">Your answer is required.</div>',
      '  </div>',
      '  <buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"',
      '    model=\'$ctrl.ngModel\'',
      '    identifier="\'rdAdditionalDrivers\'"',
      '    options=\'$ctrl.additionalDriverOptions\' enabled="true">',
      '  </buttons-radio>',
      '  <input id="additionalDrivers" type="hidden" name="additionalDrivers" type="text"',
      '      ng-model="$ctrl.ngModel" required/>',
      '  <div class="help-block">',
      '   <small>Who to include?</small></br>',
      '   <small>- Everyone who drives a quoted vehicle</small></br>',
      '   <small>- Everyone who lives in you household</small>',
      '  </div>',
      '</div>'
    ].join(''),
    controller: ['radioChoices', 'QuoteIntentModel', '$stateParams', function (radioChoices, quoteIntentModel, $stateParams) {
      this.driver = $stateParams.driverId ? quoteIntentModel.getDriverById($stateParams.driverId) : quoteIntentModel.getPolicyHolder();
      var enums = getEnums();
      this.yesNoChoices = radioChoices.yesNo;

      this.showComponent = function () {

        var unprocessedLeadDrivers = quoteIntentModel.getQuoteState().UnProcessedLeadDrivers.length > 0;

        var showAddDriverButton = this.driver.MaritalStatus !== enums.EnumMaritalStatuses.Married
          && this.driver.MaritalStatus !== enums.EnumMaritalStatuses.CivilUnion
          && !unprocessedLeadDrivers;
        if (!showAddDriverButton) {
          this.ngModel = _.findWhere(this.yesNoChoices, {Desc: 'Yes'}).Value;
        }
        return showAddDriverButton;
      };

      this.additionalDriverOptions = this.yesNoChoices;
    }]
  }
}

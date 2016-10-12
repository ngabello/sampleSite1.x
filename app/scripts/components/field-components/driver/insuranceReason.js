/**
 * Created by jholloman on 12/23/2015.
 */
function InsuranceReason() {
    return {
      bindings: {
        form: '=',
        driverModel: '=',
        ngModel: '='
      },
      template: [
      '<div class="form-group" uib-collapse="$ctrl.driverModel.CurrentlyInsured == null || $ctrl.driverModel.CurrentlyInsured"',
        'ng-class="{true: \'has-error\'}[$ctrl.form.submitted && $ctrl.form.driverInsuranceReason.$invalid]">',
        '<label class="control-label form-left">',
          '<span>Reason</span>',
        '</label>',
        '<div ng-messages="$ctrl.form.driverInsuranceReason.$error" ng-if="$ctrl.form.submitted">',
          '<div ng-message="required">Please choose an answer.</div>',
        '</div>',
        '<select id="driverInsuranceReason" class="form-control form-right" name="driverInsuranceReason"',
          'ng-model="$ctrl.ngModel"',
          'ng-options="a.Value as a.Desc for a in $ctrl.insuranceReasons"',
          'ng-required="!$ctrl.driverModel.CurrentlyInsured">',
         // 'ng-change="$ctrl.currentInsuranceStatusChanged($ctrl.ngModel)">',
          '<option value="">Select</option>',
        '</select>',
      '</div>'
      ].join(''),
      controller: ['LookupDataService', function(lookupDataService){
        var enums = getEnums();
        this.insuranceReasons = lookupDataService.getNoCurrentInsuranceReasonLookups();

        ////We need to filter out No if the user selects No to CurrentlyInsured and Reason = PolicyExpiredWithin30Days
        //this.currentInsuranceStatusChanged = function (newValue) {
        //  if (!this.driverModel.CurrentlyInsured && newValue == enums.EnumNoCurrentInsuranceReasons.MyPolicyExpired30daysAgoOrLess) {
        //    var filterArr = ['no_lapse'];
        //    this.lapseCollection = lookupDataService.getInsuranceLapseCodeLookups(filterArr);
        //  } else {
        //    this.lapseCollection = lookupDataService.getInsuranceLapseCodeLookups();
        //  }
        //};
      }]
    }
  }

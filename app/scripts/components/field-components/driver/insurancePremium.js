/**
 * Created by jholloman on 12/30/2015.
 */
function InsurancePremium() {
  return {
    bindings: {
      ngModel: '='
    },
    template: [
      '<div class="form-group">',
      '<label class="control-label form-left">Current monthly premium</label>',
      '<div class="input-group">',
      '<div class="input-group-addon">$</div>',
      '<input id="premiumCost" class="field-medium form-control form-right" maxlength="9" name="premiumCost" type="tel"',
      'ng-model="$ctrl.ngModel" only-digits/>',
      '<div class="input-group-addon">.00</div>',
      '</div>',
      '</div>'].join('')
  }
}

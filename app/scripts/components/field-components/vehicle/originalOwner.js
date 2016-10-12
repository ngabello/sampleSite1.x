/**
 * Created by jholloman on 1/7/2016.
 */
'use strict';
function OriginalOwner() {
  return function () {
    return {
      scope: {
        form: '=',
        state: '='
      },
      template:
      '<div class="form-group" data-toggle="buttons">' +
      '<label class="control-label form-left">' +
      '<span>Are you the original owner?</span>' +
      '</label>' +
      '<buttons-radio class="btn-group form-100 form-right" data-toggle="buttons-radio"' +
      'model=\'state.vehicle.CurrentOwner\' identifier="\'rdCurrentOwner\'" options=\'state.radioChoices.trueFalse\'></buttons-radio>' +
      '<input type="hidden" id="originalOwner" name="originalOwner" type="text" ng-model="state.vehicle.CurrentOwner"/>' +
      '</div>'
    }

  }
}

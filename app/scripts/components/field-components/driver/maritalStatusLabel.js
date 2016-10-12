/**
 * Created by jholloman on 12/22/2015.
 */
'use strict';
function MaritalStatusLabel() {
  return {
    bindings: {
    },
    template: [
          '<div class="form-group">',
          '<label class="control-label form-left">',
          '<span>Marital status</span>',
          '</label>',
          '<div class="control-label form-right">Married</div>',
          '</div>',
          '</select>',
          '</div>'
    ].join('')
  }
}

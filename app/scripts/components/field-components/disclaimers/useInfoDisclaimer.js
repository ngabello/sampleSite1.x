/**
 * Created by gabello on 6/8/2016.
 */
'use strict';
function UserInfoDisclaimer() {
  return {
    bindings: {},
    controller: ['messageService', function (messageService) {
      var instance = this;

      this.fraudStatement = function () {
        messageService.showFraudStatement();
      };

    }],
    template: [
      '<div class="disclosure">',
      '<p>',
      'To offer you the most accurate quote we will use information from you and consumer reporting agencies, such as ',
      'driving records, claims history, credit history, and additional ',
      'household information. This information is kept private and secure, and will not be sold. Please review the ',
      '<a href="http://pachyderm.com/privacy" target="_blank">Privacy Policy</a> for further detail. Please answer questions ',
      'accurately and to the best of your knowledge. Please read our <a ng-click="$ctrl.fraudStatement()">Fraud Policy</a> ',
      'for further detail.',
      '</p>',
      '</div>'
    ].join('')
  }
}

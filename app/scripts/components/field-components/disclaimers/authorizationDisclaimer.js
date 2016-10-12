/**
 * Created by gabello on 6/8/2016.
 */
'use strict';
function AuthorizationDisclaimer() {
  return {
    template: [
      '<div class="disclosure">',
      '<p>By clicking “Continue” you authorize Elephant and its representatives to contact you at the phone number ',
      'provided above regarding the sale of insurance products and services. These calls may use a recorded message ',
      'or automated dialing equipment. You are not required to provide your phone number to receive a quote.</p>',
      '<p>By clicking “Continue” you agree to receive periodic email updates, notifications, and special offers.</p>',
      '</div>'
    ].join('')
  }
}

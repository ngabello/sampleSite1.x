/**
 * Created by vyom.sharma on 14-06-2016.
 */

'use strict';

function mobilebreadcrumb() {
  return ['environmentLink', function (environmentLink) {

    return {
      restrict: 'A',
      templateUrl: '../scripts/directives/views/mobile-bread-crumb.tpl.html',
      controller: breadcrumbCtrl(),

      link: function () {

      }
    }
  }]
}


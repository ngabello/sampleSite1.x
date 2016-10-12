/**
 * Created by jholloman on 11/21/2014.
 */
'use strict';

function breadcrumb() {
  return ['environmentLink', function (environmentLink) {

    return {
      restrict: 'A',
      templateUrl: '../scripts/directives/views/bread-crumb.tpl.html',
      controller: breadcrumbCtrl(),

      link: function () {

      }
    }
  }]
}

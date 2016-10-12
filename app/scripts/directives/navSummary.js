/**
 * Created by gabello on 10/16/2014.
 */
function NavSummary() {
    'use strict';
    return ['environmentLink', function (environmentLink) {
        return {
            restrict: 'A',
            templateUrl: '../scripts/directives/views/quote-navigation.tpl.html',
            controller: navSharedCtrl()
        };
    }]
}

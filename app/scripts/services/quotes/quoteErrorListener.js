/**
 * Created by gabello on 11/13/2014.
 */
function QuoteErrorListener() {
    'use strict';

    return ['$rootScope', '$location', function ($rootScope, $location) {

        //TODO this has to be reworked cause it sucks
        var backTerminator = $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
                var index = oldUrl.indexOf('quote-error');
                if(index > 1) {
                    event.preventDefault(); // This prevents the navigation from happening
                    backTerminator();
                    var path = $location.absUrl().split('#')[0]; + '/postal-code';
                    window.location.href = path;
                }
            }
        );
    }];
}
/**
 * Created by gabello on 10/6/2014.
 */
'use strict';

describe('Controller: ZipCtrl', function () {

    // load the controller's module
    beforeEach(module('ui.router'));

    var zipCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $state) {

        $state
            .state('postalCodeDetails',{
                name: 'postal-code-details',
                url: '/postal-code',
                templateUrl: '../views/quotes/postal-code-details.html',
                controller: PostalCodeCtrl()
            });

        console.dir($state);

        //debugger;
        scope = $rootScope.$new();
//        zipCtrl = $controller('zipCtrl', {
  //          $scope: scope
//        });
    }));

//  it('should attach a list of awesomeThings to the scope', function () {
//    expect('23860').toBe('23860');
//  });
});
/**
 * Created by jholloman on 10/28/2014.
 */
function buttonsRadio(){
    'use strict';
    return function(){
        return {
            restrict: 'E',
            scope: { model: '=', options:'=', identifier:'='},
            controller: ['$scope', function($scope){
                $scope.activate = function(option){
                    $scope.model = option['Value'];
                };

                $scope.isActive = function(option) {
                    return option['Value'] == $scope.model;
                };

                $scope.getDescription = function(option){
                    return option['Desc']
                }
            }],
            template: "<label class='btn btn-default btn-sm form-50' "+
                "ng-class='{active: isActive(option)}'"+
                "ng-repeat='option in options' "+
                "id='{{identifier + option.Desc}}'" +
                "ng-click='activate(option)'analytics-on='click' analytics-event='primary driver {{getDescription(option)}}'>{{getDescription(option)}} "+
                "</label>"
        };
    }
}

/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />

((): void => {
    'use strict';

angular.module('todo', ['ngRoute'])
    .config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {

        $routeProvider
            .when('/', {
                controller: 'TodosCtrl',
                templateUrl: 'app/tpl/List.html'
            })
            .when('/detail/:todoId', {
                controller: 'DetailCtrl',
                templateUrl: 'app/tpl/Detail.html'
            })
            .otherwise({
                redirect: '/'
            });

    }]);

})();
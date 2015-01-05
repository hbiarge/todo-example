/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-route.d.ts" />

((): void => {
    'use strict';

    angular.module('todo', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider): void => {

            $routeProvider
                .when('/', {
                    controller: 'TodosCtrl',
                    controllerAs: 'vm',
                    templateUrl: 'app/tpl/List.html'
                })
                .when('/detail/:todoId', {
                    controller: 'DetailCtrl',
                    controllerAs: 'vm',
                    templateUrl: 'app/tpl/Detail.html'
                })
                .otherwise({
                    redirect: '/'
                });

        }])
        .config(['apiEndpointProvider', (apiEndpointProvider: Todos.IApiEndpointProvider): void => {
            apiEndpointProvider.configure('/api');
        }]);

})();
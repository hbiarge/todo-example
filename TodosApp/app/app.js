(function () {
    'use strict';

    var todo = angular.module('todo', ['ngRoute']);

    todo.config(['$routeProvider', function($routeProvider) {
        
        $routeProvider
            .when('/', { controller: 'TodosCtrl', templateUrl: 'app/tpl/List.html' })
            .when('/detail/:todoId', { controller: 'DetailCtrl', templateUrl: 'app/tpl/Detail.html' })
            .otherwise({ redirect: '/' });

    }]);

})();
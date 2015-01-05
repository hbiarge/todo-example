/// <reference path="../services/todostore.ts" />
module Todos {
    'use strict';

    interface IDetailsScope extends ng.IScope {
        todo: Todo;
    }

    interface IDetailsParams extends ng.route.IRouteParamsService {
        todoId: string;
    }

    class DetailsController {
        static $inject = ['$scope', '$routeParams', 'todoStore'];
        constructor($scope: IDetailsScope, $routeParams: IDetailsParams, todoStore: ITodoStoreService) {
            todoStore.getById(parseInt($routeParams.todoId, 10)).then(
                (data: Todo) => {
                    $scope.todo = data;
                },
                () => {
                    // show error
                });
        }
    }

    angular.module('todo').controller('DetailCtrl', DetailsController);
}
/// <reference path="../services/todostore.ts" />
module Todos {
    'use strict';

    interface IDetailsScope {
        todo: Todo;
    }

    interface IDetailsParams extends ng.route.IRouteParamsService {
        todoId: string;
    }

    class DetailsController implements IDetailsScope {
        todo: Todo;

        static $inject = ['$routeParams', 'todoStore'];
        constructor($routeParams: IDetailsParams, todoStore: ITodoStoreService) {
            todoStore.getById(parseInt($routeParams.todoId, 10)).then(
                (data: Todo) => {
                    this.todo = data;
                },
                () => {
                    // show error
                });
        }
    }

    angular.module('todo').controller('DetailCtrl', DetailsController);
}
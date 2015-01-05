/// <reference path="../services/todostore.ts" />
module Todos {
    'use strict';

    interface ITodosScope extends ng.IScope {
        newTodoText: string;
        remaining: IRemaining;
        todos: Todo[];
        addNew(): void;
        removeDoneTodos(): void;
        updateRemainig(todo: Todo): void;
    }

    class TodosController {
        static $inject = ['$scope', 'todoStore'];
        constructor($scope: ITodosScope, todoStore: ITodoStoreService) {
            $scope.newTodoText = '';
            $scope.remaining = todoStore.remaining;
            $scope.todos = [];
            $scope.addNew = () => {
                todoStore.addNew($scope.newTodoText).then(
                    (data: Todo) => {
                        $scope.todos.push(data);
                        $scope.newTodoText = '';
                    },
                    () => {
                        // show error
                    });
                $scope.newTodoText = '';
            };

            $scope.removeDoneTodos = () => {
                todoStore.removeDone().then(
                    () => {
                        $scope.todos = $scope.todos.filter((todo: Todo) => (!todo.done));
                    },
                    () => {
                        // show error
                    });
            };

            $scope.updateRemainig = (todo: Todo) => {
                todoStore.switchDone(todo);
            };

            todoStore.getAll().then(
                (data: Todo[]) => {
                    $scope.todos = data;
                },
                () => {
                    // show error 
                });
        }
    }

    angular.module('todo').controller('TodosCtrl', TodosController);
}
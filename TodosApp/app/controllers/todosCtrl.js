(function () {
    'use strict';



    function todosCtrl($scope, todoStore) {

        $scope.newTodoText = '';

        $scope.remaining = todoStore.remaining;

        $scope.todos = [];

        $scope.addNew = function () {
            todoStore.addNew($scope.newTodoText).then(
                function success(data) {
                    $scope.todos.push(data);
                    $scope.newTodoText = '';
                },
                function error() {
                    // Show error
                });
            $scope.newTodoText = '';
        };

        $scope.removeDoneTodos = function () {
            todoStore.removeDone().then(
               function success() {
                   $scope.todos = $scope.todos.filter(function (todo) {
                       return todo.done !== true;
                   });
               },
               function error() {
                   // Show error
               });
        };

        $scope.updateRemainig = function (todo) {
            todoStore.switchDone(todo);
        };

        todoStore.getAll().then(
            function success(data) {
                $scope.todos = data;
            },
            function error() {
                // Show error 
            });

    }

    todosCtrl.$inject = ['$scope', 'todoStore'];

    angular.module('todo').controller('TodosCtrl', todosCtrl);

})();

(function () {
    'use strict';

    function Todo(text) {
        this.text = text;
        this.done = false;
    };

    function todosCtrl($scope) {

        $scope.newTodoText = '';

        $scope.remaining = 0;

        $scope.todos = [];

        $scope.addNew = function () {
            var newTodo = new Todo($scope.newTodoText);
            $scope.todos.push(newTodo);
            $scope.remaining++;
            $scope.newTodoText = '';
        };

        $scope.removeDoneTodos = function () {
            $scope.todos = $scope.todos.filter(function (todo) {
                return todo.done !== true;
            });
        };

        $scope.updateRemainig = function (todo) {
            if (todo.done) {
                $scope.remaining--;
            } else {
                $scope.remaining++;
            }
        };

    }

    todosCtrl.$inject = ['$scope'];

    angular.module('todo').controller('TodosCtrl', todosCtrl);

})();

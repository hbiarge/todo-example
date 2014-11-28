(function () {
    'use strict';



    function todosCtrl($scope, todoStore) {

        $scope.newTodoText = '';

        $scope.remaining = todoStore.remaining;

        $scope.todos = todoStore.getAll();

        $scope.addNew = function () {
            todoStore.addNew($scope.newTodoText);
            $scope.newTodoText = '';
        };

        $scope.removeDoneTodos = todoStore.removeDone;

        $scope.updateRemainig = todoStore.remaining.update;

    }

    todosCtrl.$inject = ['$scope', 'todoStore'];

    angular.module('todo').controller('TodosCtrl', todosCtrl);

})();

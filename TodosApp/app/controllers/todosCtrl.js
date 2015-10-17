(function () {
    'use strict';

    function todosCtrl(todoStore) {
        var vm = this;

        vm.remaining = todoStore.remaining;

        vm.todos = [];

        vm.onNewTodo = function (newTodoText) {
            return todoStore.addNew(newTodoText).then(
                function success(data) {
                    vm.todos.push(data);
                },
                function error() {
                    // Show error
                });
        };

        vm.removeDoneTodos = function () {
            todoStore.removeDone().then(
               function success() {
                   vm.todos = vm.todos.filter(function (todo) {
                       return todo.done !== true;
                   });
               },
               function error() {
                   // Show error
               });
        };

        vm.updateRemainig = function (todo) {
            todoStore.switchDone(todo);
        };

        todoStore.getAll().then(
            function success(data) {
                vm.todos = data;
            },
            function error() {
                // Show error 
            });

    }

    todosCtrl.$inject = ['todoStore'];

    angular.module('todo').controller('TodosCtrl', todosCtrl);

})();

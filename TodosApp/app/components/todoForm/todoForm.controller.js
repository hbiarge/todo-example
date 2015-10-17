(function () {

    'use strict';

    function todosFormCtrl() {
        var vm = this;
        vm.newTodoText = '';
        vm.addNew = function (form) {
            if (form.$valid) {
                vm.onNewTodo({ newTodoText: vm.newTodoText }).then(
                    function () {
                        vm.newTodoText = '';
                    });
            }
        };

    }

    angular.module('todo').controller('TodosFormCtrl', todosFormCtrl);

})();

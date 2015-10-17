(function () {

    'use strict';

    function todoList() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/todoList/todoList.tpl.html',
            scope: {
                todos: '=',
                onTodoChange: '&'
            }
        };
    }

    angular.module('todo').directive('todoList', todoList);

}());
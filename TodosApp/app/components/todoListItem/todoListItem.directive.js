(function () {

    'use strict';

    function todoListItem() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/todoListItem/todoListItem.tpl.html',
            scope: {
                todo: '=',
                onTodoChange: '&'
            }
        };
    }

    angular.module('todo').directive('todoListItem', todoListItem);

}());
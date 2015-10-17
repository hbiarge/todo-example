(function () {

    'use strict';

    function todoForm() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/todoForm/todoForm.tpl.html',
            controller: 'TodosFormCtrl',
            controllerAs: 'formCtrl',
            scope: {
                onNewTodo: '&'
            },
            bindToController: true
        };
    }

    angular.module('todo').directive('todoForm', todoForm);

}());
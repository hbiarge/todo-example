(function () {
    'use strict';

    var lastId = 0;

    function Todo(text) {
        this.id = ++lastId,
        this.text = text;
        this.done = false;
    };

    function todoStore() {

        var todos = [];

        var remaining = {
            value: 0,
            update: function (todo) {
                if (todo.done) {
                    remaining.value--;
                } else {
                    remaining.value++;
                }
            }
        };

        function getAll() {
            return todos;
        }

        function getById(todoId) {
            var results = todos.filter(function (todo) {
                return todo.id === todoId;
            });

            if (results.length === 1) {
                return results[0];
            }

            return null;
        }

        function addNew(text) {
            var newTodo = new Todo(text);
            todos.push(newTodo);
            remaining.value++;
        }

        function removeDone() {
            var candidates = todos.filter(function (todo) {
                return todo.done;
            });

            for (var i = 0; i < candidates.length; i++) {
                var index = todos.indexOf(candidates[i]);
                todos.splice(index, 1);
            }
        }

        return {
            getAll: getAll,
            getById: getById,
            addNew: addNew,
            removeDone: removeDone,
            remaining: remaining
        };
    }

    //todoStore.$inject = ['$http'];

    angular.module('todo').factory('todoStore', todoStore);

})();
(function () {
    'use strict';

    function Todo(text) {
        this.text = text;
        this.done = false;
    };

    function TodosCtrl() {

        var that = this;
        that.newTodoText = '';

        that.remaining = 0;

        that.todos = [];

        that.addNew = function () {
            var newTodo = new Todo(that.newTodoText);
            that.todos.push(newTodo);
            that.remaining++;
            that.newTodoText = '';
        };

        that.removeDoneTodos = function () {
            that.todos = that.todos.filter(function (todo) {
                return todo.done !== true;
            });
        };

        that.updateRemainig = function (todo) {
            if (todo.done) {
                that.remaining--;
            } else {
                that.remaining++;
            }
        };

    }

    TodosCtrl.$inject = ['$scope'];

    angular.module('todo').controller('TodosCtrl', TodosCtrl);

})();

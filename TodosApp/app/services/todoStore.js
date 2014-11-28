(function () {
    'use strict';

    var Todo = function (name) {
        this.text = name;
        this.done = false;
    };

    function todoStore($http, $q, $log) {

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
            var deferred = $q.defer();

            $http.get('/api/todos')
                .success(function (data) {
                    $log.debug('Received todos from remote store');
                    var remainingTodos = data.filter(function (todo) {
                        return todo.done === false;
                    });
                    remaining.value = remainingTodos.length;
                    deferred.resolve(data);
                })
                .error(function (error) {
                    $log.error('Error retieving todos from remote store.');
                    console.log(error);
                    deferred.reject();
                });

            return deferred.promise;
        }

        function getById(todoId) {
            var deferred = $q.defer();

            $http.get('/api/todos/' + todoId)
                .success(function (data) {
                    $log.debug('Received todo ' + data.id + ' from remote store');
                    deferred.resolve(data);
                })
                .error(function (error) {
                    $log.error('Error retieving todo ' + todoId + ' from remote store.');
                    console.log(error);
                    deferred.reject();
                });

            return deferred.promise;
        }

        function addNew(text) {
            var newTodo = new Todo(text),
                deferred = $q.defer();

            $http.post('/api/todos', newTodo)
                .success(function (data) {
                    remaining.value += 1;
                    $log.debug('New todo added to remote store. Id:' + data.id);
                    deferred.resolve(data);
                })
                .error(function (error) {
                    $log.error('Error adding new todo to remote store.');
                    console.log(error);
                    deferred.reject();
                });

            return deferred.promise;
        }

        function switchDone(todo) {
            var deferred = $q.defer();

            $http.put('/api/todos/' + todo.id)
                .success(function () {
                    $log.debug('Todo ' + todo.id + ' done changed to ' + todo.done);
                    remaining.update(todo);
                    deferred.resolve();
                })
                .error(function (error) {
                    $log.error('Error changing done in todo ' + todo.id + 'in remote store.');
                    console.log(error);
                    deferred.reject();
                });

            return deferred.promise;
        }

        function removeDone() {
            var deferred = $q.defer();

            $http.post('/api/todos/removedone')
                .success(function () {
                    $log.debug('Done todos removed from remote store');
                    deferred.resolve();
                })
                .error(function (error) {
                    $log.error('Error deleting done todos from remote store.');
                    console.log(error);
                    deferred.reject();
                });

            return deferred.promise;
        }

        var service = {
            getAll: getAll,
            getById: getById,
            addNew: addNew,
            switchDone: switchDone,
            removeDone: removeDone,
            remaining: remaining
        };

        return service;
    }

    todoStore.$inject = ['$http', '$q', '$log'];

    angular.module('todo').factory('todoStore', todoStore);

})();
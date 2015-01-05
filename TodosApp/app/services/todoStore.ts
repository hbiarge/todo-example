/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
module Todos {
    'use strict';

    export interface ITodoStoreService {
        remaining: IRemaining;
        getAll: () => ng.IPromise<Todo[]>;
        getById: (todoId: number) => ng.IPromise<Todo>;
        addNew: (text: string) => ng.IPromise<Todo>;
        switchDone: (todo: Todo) => ng.IPromise<void>;
        removeDone: () => ng.IPromise<void>;
    }

    export interface IRemaining {
        value: number;
    }

    export class Todo {
        id: number;
        text: string;
        done: boolean;

        constructor(name: string) {
            this.text = name;
            this.done = false;
        }
    }

    class Remaining implements IRemaining {
        value: number;
        constructor() {
            this.value = 0;
        }
        update(todo: Todo): void {
            if (todo.done) {
                this.value--;
            } else {
                this.value++;
            }
        }
    }

    class TodoStore implements ITodoStoreService {

        remaining = new Remaining();
        static $inject = ['$http', '$q', '$log', 'apiEndpoint'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $log: ng.ILogService, private apiEndpoint: IApiEndpointConfig) { }

        getAll(): ng.IPromise<Todo[]> {
            var deferred = this.$q.defer<Todo[]>();

            this.$http.get(this.apiEndpoint.baseUrl + '/todos')
                .success((response: Todo[]): void => {
                    this.$log.debug('Received todos from remote store');
                    var remainingTodos = response.filter((todo: Todo) => (!todo.done));
                    this.remaining.value = remainingTodos.length;
                    deferred.resolve(response);
                })
                .error((response: ng.IHttpPromiseCallback<void>): void => {
                    this.$log.error('Error retieving todos from remote store.');
                    console.log(response);
                    deferred.reject();
                });

            return deferred.promise;
        }

        getById(todoId: number): ng.IPromise<Todo> {
            var deferred = this.$q.defer<Todo>();

            this.$http.get(this.apiEndpoint.baseUrl + '/todos/' + todoId)
                .success((response: Todo) => {
                    this.$log.debug('Received todo ' + response.id + ' from remote store');
                    deferred.resolve(response);
                })
                .error((response: ng.IHttpPromiseCallbackArg<void>) => {
                    this.$log.error('Error retieving todo ' + todoId + ' from remote store.');
                    console.log(response);
                    deferred.reject();
                });

            return deferred.promise;
        }

        addNew(text: string): ng.IPromise<Todo> {
            var newTodo = new Todo(text),
                deferred = this.$q.defer<Todo>();

            this.$http.post(this.apiEndpoint.baseUrl + '/todos', newTodo)
                .success((response: Todo) => {
                    this.remaining.value += 1;
                    this.$log.debug('New todo added to remote store. Id:' + response.id);
                    deferred.resolve(response);
                })
                .error((response: ng.IHttpPromiseCallbackArg<void>) => {
                    this.$log.error('Error adding new todo to remote store.');
                    console.log(response);
                    deferred.reject();
                });

            return deferred.promise;
        }

        switchDone(todo: Todo): ng.IPromise<void> {
            var deferred = this.$q.defer<void>();

            this.$http.put(this.apiEndpoint.baseUrl + '/todos/' + todo.id, {})
                .success(() => {
                    this.$log.debug('Todo ' + todo.id + ' done changed to ' + todo.done);
                    this.remaining.update(todo);
                    deferred.resolve();
                })
                .error((response: ng.IHttpPromiseCallbackArg<void>) => {
                    this.$log.error('Error changing done in todo ' + todo.id + 'in remote store.');
                    console.log(response);
                    deferred.reject();
                });

            return deferred.promise;
        }

        removeDone(): ng.IPromise<void> {
            var deferred = this.$q.defer<void>();

            this.$http.post(this.apiEndpoint.baseUrl + '/todos/removedone', {})
                .success(() => {
                    this.$log.debug('Done todos removed from remote store');
                    deferred.resolve();
                })
                .error((response: ng.IHttpPromiseCallbackArg<void>) => {
                    this.$log.error('Error deleting done todos from remote store.');
                    console.log(response);
                    deferred.reject();
                });

            return deferred.promise;
        }
    }

    angular.module('todo').service('todoStore', TodoStore);
}
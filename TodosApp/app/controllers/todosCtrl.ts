/// <reference path="../services/todostore.ts" />
module Todos {
    'use strict';

    interface ITodosScope {
        newTodoText: string;
        remaining: IRemaining;
        todos: Todo[];
        addNew(): void;
        removeDoneTodos(): void;
        updateRemainig(todo: Todo): void;
    }

    class TodosController implements ITodosScope {
        newTodoText: string;
        remaining: IRemaining;
        todos: Todo[];

        static $inject = ['todoStore'];
        constructor(private todoStore: ITodoStoreService) {
            this.newTodoText = '';
            this.remaining = todoStore.remaining;
            this.todos = [];

            todoStore.getAll().then(
                (data: Todo[]) => {
                    this.todos = data;
                },
                () => {
                    // show error 
                });
        }

        addNew = () => {
            this.todoStore.addNew(this.newTodoText).then(
                (data: Todo) => {
                    this.todos.push(data);
                    this.newTodoText = '';
                },
                () => {
                    // show error
                });
            this.newTodoText = '';
        };

        removeDoneTodos = () => {
            this.todoStore.removeDone().then(
                () => {
                    this.todos = this.todos.filter((todo: Todo) => (!todo.done));
                },
                () => {
                    // show error
                });
        };

        updateRemainig = (todo: Todo) => {
            this.todoStore.switchDone(todo);
        };
    }

    angular.module('todo').controller('TodosCtrl', TodosController);
}
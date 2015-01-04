/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />

interface ITodoStoreService {
    getAll: ()=>ng.IPromise<Todo[]>;
    getById: (todoId: number)=>ng.IPromise<Todo>;
    addNew: (text:string)=>ng.IPromise<Todo>;
    switchDone: (todo:Todo)=>ng.IPromise<{}>;
    removeDone: (todoId:number)=>ng.IPromise<{}>;
    remaining: IRemaining;
}

interface IRemaining {
    value: number;
    update: (todo)=>void;
}

    class Todo {
        constructor(name: string) {
            this.text = name;
            this.done = false;
        }
        id: number;
        text: string;
        done:boolean;
    }

(() => {
    "use strict";

function todoStore($http: ng.IHttpService, $q: ng.IQService, $log: ng.ILogService) {

    var remaining: IRemaining = {
        value: 0,
        update: (todo) => {
            if (todo.done) {
                remaining.value--;
} else {
                remaining.value++;
}
}
};

function getAll():ng.IPromise<Todo[]> {
    var deferred = $q.defer<Todo[]>();

    $http.get("/api/todos")
        .success((data: Todo[]) => {
            $log.debug("Received todos from remote store");
            var remainingTodos = data.filter((todo: Todo) => (!todo.done));
            remaining.value = remainingTodos.length;
            deferred.resolve(data);
        })
    .error((error: any) => {
        $log.error("Error retieving todos from remote store.");
        console.log(error);
        deferred.reject();
    });

    return deferred.promise;
}

function getById(todoId: number): ng.IPromise<Todo> {
    var deferred = $q.defer<Todo>();

    $http.get("/api/todos/" + todoId)
        .success((data: Todo) => {
            $log.debug("Received todo " + data.id + " from remote store");
            deferred.resolve(data);
        })
    .error((error: any) => {
        $log.error("Error retieving todo " + todoId + " from remote store.");
        console.log(error);
        deferred.reject();
    });

    return deferred.promise;
}

function addNew(text:string):ng.IPromise<Todo> {
    var newTodo = new Todo(text),
    deferred = $q.defer<Todo>();

    $http.post("/api/todos", newTodo)
        .success((data:Todo) => {
            remaining.value += 1;
            $log.debug("New todo added to remote store. Id:" + data.id);
            deferred.resolve(data);
        })
    .error((error:any) => {
        $log.error("Error adding new todo to remote store.");
        console.log(error);
        deferred.reject();
    });

    return deferred.promise;
}

function switchDone(todo: Todo):ng.IPromise<{}> {
    var deferred = $q.defer<{}>();

    $http.put("/api/todos/" + todo.id,{})
        .success(() => {
            $log.debug("Todo " + todo.id + " done changed to " + todo.done);
    remaining.update(todo);
    deferred.resolve();
})
.error((error: any) => {
    $log.error("Error changing done in todo " + todo.id + "in remote store.");
    console.log(error);
    deferred.reject();
});

return deferred.promise;
}

function removeDone():ng.IPromise<{}> {
    var deferred = $q.defer();

    $http.post("/api/todos/removedone",{})
        .success(() => {
            $log.debug("Done todos removed from remote store");
    deferred.resolve();
})
.error((error:any) => {
    $log.error("Error deleting done todos from remote store.");
    console.log(error);
    deferred.reject();
});

return deferred.promise;
}

var service: ITodoStoreService = {
    getAll: getAll,
    getById: getById,
    addNew: addNew,
    switchDone: switchDone,
    removeDone: removeDone,
    remaining: remaining
};

return service;
}

todoStore.$inject = ["$http", "$q", "$log"];

angular.module("todo").factory("todoStore", todoStore);

})();
/// <reference path="../../commonReferences.js" />
/// <reference path="../../../../app/controllers/detailCtrl.js" />

'use strict';

describe('DetailController', function () {

    var $scope, $q, $log, controllerFactory, routeParams, todoStoreMock;

    // Controller factory function
    function createController() {
        return controllerFactory('DetailCtrl', {
            $scope: $scope,
            $routeParams: routeParams,
            todoStore: todoStoreMock
        });
    }

    // Module initialization
    beforeEach(function () {
        module('todo');
    });

    // Mock creation
    beforeEach(function () {
        routeParams = { todoId: 1 };
        todoStoreMock = jasmine.createSpyObj('todoStore', ['getById']);
    });

    // Dependenies injection and controller creation
    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _$log_) {
        controllerFactory = _$controller_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        $log = _$log_;
    }));

    it('loads todo data from service successfilly', function () {
        var todo = { id: 1, name: 'test', done: false };
        todoStoreMock.getById.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(todo);
            return deferred.promise;
        });

        createController();
        $scope.$digest();

        expect($scope.todo).toBe(todo);
    });

    it('todo is empty if load data from service fails', function () {
        todoStoreMock.getById.and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject('Rejected!');
            return deferred.promise;
        });

        createController();
        $scope.$root.$digest();

        expect($scope.todo).toEqual({});
    });

});
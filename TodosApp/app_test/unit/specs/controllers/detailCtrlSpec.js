/// <reference path="../../commonReferences.js" />
/// <reference path="../../../app/controllers/DetailCtrl.js" />

'use strict';

describe('DetailController', function () {

    var $scope, $q, $log, controller, routeParams, TodoStoreMock;

    // Controller factory function
    function createController() {
        return controllerFactory('DetailCtrl', {
            $scope: $scope,
            $routeParams: routeParams,
            TodoStore: TodoStoreMock
        });
    }

    // Module initialization
    beforeEach(function () {
        module('todo');
    });

    // Mock creation
    beforeEach(function () {
        routeParams = { todoId: 1 };
        TodoStoreMock = jasmine.createSpyObj('TodoStore', ['getById']);
    });

    // Dependenies injection and controller creation
    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _$log_) {
        $scope = _$rootScope_.$new();
        $q = _$q_;
        controller = _$controller_('DetailCtrl', {
            $scope: $scope,
            $routeParams: routeParams,
            TodoStore: TodoStoreMock
        });
    }));

    it('loads todo data from service successfilly', function () {
        var todo = { id: 1, name: 'test', done: false };
        TodoStoreMock.getById.andCallFake(function () {
            var deferred = $q.defer();
            deferred.resolve(todo);
            return deferred.promise;
        });

        $scope.$root.$digest();

        expect($scope.todo).toBe(todo);
    });

    it('todo is empty if load data from service fails', function () {
        TodoStoreMock.getById.andCallFake(function () {
            var deferred = $q.defer();
            deferred.reject('Rejected!');
            return deferred.promise;
        });

        $scope.$root.$digest();

        expect($scope.todo).toEqual({});
    });

});
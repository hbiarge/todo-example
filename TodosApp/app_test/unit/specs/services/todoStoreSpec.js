/// <reference path="../../commonReferences.js" />
/// <reference path="../../../../app/services/todoStore.js" />

describe('TodoStore', function () {
    var todoStore, $httpBackend, $rootScope, $logMock;

    // Module initialization and mocks for services
    beforeEach(function () {
        $logMock = jasmine.createSpyObj('authSvc', ['debug', 'error']);

        module('todo', function servicesOverride($provide) {
            $provide.value('$log', $logMock);
        });

    });

    // Dependencies injection
    beforeEach(inject(function (_todoStore_, _$httpBackend_, _$rootScope_) {
        todoStore = _todoStore_,
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    // Assertions over $httpBackend
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getAll', function () {

        it('resolve when server respond 200', function () {
            var serverData = [
                { id: 1, name: 'test1', done: false }
            ];
            $httpBackend.when('GET', '/api/todos').respond(200, serverData);
            $httpBackend.expectGET('/api/todos');

            todoStore.getAll().then(
                function success(data) {
                    expect(data).toEqual(serverData);
                });

            $httpBackend.flush();
        });

        it('reject when server respond 400', function () {
            $httpBackend.when('GET', '/api/todos').respond(400);
            $httpBackend.expectGET('/api/todos');

            todoStore.getAll().then(
                function success(data) {
                    expect(false).toBeTruthy();
                },
                function error() {
                    expect(true).toBeTruthy();
                });

            $httpBackend.flush();
        });

        describe('updates remainig correctly', function () {

            it('when no todos in server', function () {
                var serverData = [];
                $httpBackend.when('GET', '/api/todos').respond(200, serverData);
                $httpBackend.expectGET('/api/todos');

                todoStore.getAll().then(
                    function success(data) {
                        expect(todoStore.remaining.value).toBe(0);
                    });

                $httpBackend.flush();
            });

            it('when all todos are not done', function () {
                var serverData = [
                    { id: 1, name: 'test1', done: false },
                    { id: 2, name: 'test2', done: false },
                    { id: 3, name: 'test3', done: false }
                ];
                $httpBackend.when('GET', '/api/todos').respond(200, serverData);
                $httpBackend.expectGET('/api/todos');

                todoStore.getAll().then(
                    function success(data) {
                        expect(todoStore.remaining.value).toBe(serverData.length);
                    });

                $httpBackend.flush();
            });

            it('when all todos are done', function () {
                var serverData = [
                    { id: 1, name: 'test1', done: true },
                    { id: 2, name: 'test2', done: true },
                    { id: 3, name: 'test3', done: true }
                ];
                $httpBackend.when('GET', '/api/todos').respond(200, serverData);
                $httpBackend.expectGET('/api/todos');

                todoStore.getAll().then(
                    function success(data) {
                        expect(todoStore.remaining.value).toBe(0);
                    });

                $httpBackend.flush();
            });

            it('when todos have mixed done status', function () {
                var serverData = [
                    { id: 1, name: 'test1', done: true },
                    { id: 2, name: 'test2', done: false },
                    { id: 3, name: 'test3', done: true }
                ];
                $httpBackend.when('GET', '/api/todos').respond(200, serverData);
                $httpBackend.expectGET('/api/todos');

                todoStore.getAll().then(
                    function success(data) {
                        expect(todoStore.remaining.value).toBe(1);
                    });

                $httpBackend.flush();
            });
        });
    });
});
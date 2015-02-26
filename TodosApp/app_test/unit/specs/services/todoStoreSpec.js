/// <reference path="../../commonReferences.js" />
/// <reference path="../../../app/services/TodoStore.js" />

describe('TodoStore', function () {
    var TodoStore, $httpBackend, $logMock;

    beforeEach(function () {
        $logMock = jasmine.createSpyObj('authSvc', ['info', 'error']);

        module('todo', function servicesOverride($provide) {
            $provide.value('$log', $logMock);
        });

    });

    beforeEach(inject(function (_TodoStore_, _$httpBackend_) {
        TodoStore = _TodoStore_,
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getAll', function () {
        it('when server responds 200 log info', function () {
            $httpBackend.when('GET', '/api/todos').respond(200, [
            { id: 1, name: 'test1', done: false }
            ]);
            $httpBackend.expectGET('/api/todos');

            TodoStore.getAll();

            $httpBackend.flush();
            expect($logMock.info).toHaveBeenCalled();
        });

        it('when server responds 400 log error', function () {
            $httpBackend.when('GET', '/api/todos').respond(400);
            $httpBackend.expectGET('/api/todos');

            TodoStore.getAll();

            $httpBackend.flush();
            expect($logMock.error).toHaveBeenCalled();
        });
    });
});
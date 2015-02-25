var DetailsPage = require('../pages/listPage.js');

describe('Todo details page', function () {

    var detailsPage,
        originalCount;

    beforeEach(function () {
        detailsPage = new DetailsPage();
        detailsPage.get();

        detailsPage.todoSpans.count().then(function (value) {
            originalCount = value;
        });

    });

    describe('when a new todo is added', function () {

        it('should be shown in list', function () {

            detailsPage.setTodo('My first todo');
            detailsPage.addButton.click();

            var expectedCount = originalCount + 1;
            expect(detailsPage.todoSpans.count()).toBe(expectedCount);
        });

        it('should not be done', function () {

            var lastTodoSpan = detailsPage.todoSpans.last();

            expect(lastTodoSpan.getText()).toEqual('is done?: false');
        });

    });

    describe('when a todo is checked', function () {

        it('should toggle its done status', function () {

            var lastTodoCheck = detailsPage.todoChecks.last();
            var lastTodoSpan = detailsPage.todoSpans.last();

            lastTodoCheck.click();

            expect(lastTodoSpan.getText()).toEqual('is done?: true');

            lastTodoCheck.click();

            expect(lastTodoSpan.getText()).toEqual('is done?: false');

            lastTodoCheck.click();

            expect(lastTodoSpan.getText()).toEqual('is done?: true');
        });

    });

    describe('when there are done todos', function () {

        it('remove done button should be active', function () {
            expect(detailsPage.removeTodoButton.getAttribute('disabled')).toEqual(null);
        });

        it('remove done delete done todos', function () {

            detailsPage.removeTodoButton.click();

            expect(detailsPage.todoSpans.count()).toEqual(0);
        });

    });

    describe('when there are no todos', function () {

        it('remove done button should be disabled', function () {
            expect(detailsPage.removeTodoButton.isEnabled()).toEqual(false);
        });

        it('add button should be disabled', function () {
            expect(detailsPage.addButton.isEnabled()).toEqual(false);
        });
    });

});
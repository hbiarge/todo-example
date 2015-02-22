var DetailsPage = function () {
    var self = this;
    self.input = element(by.name('newTodoText'));
    self.addButton = element(by.id('addTodo'));
    self.removeTodoButton = element(by.id('removeDone'));
    self.todoSpans = element.all(by.repeater('todo in todos').column('todo.done'));
    self.todoChecks = element.all(by.model('todo.done'));

    self.get = function () {
        browser.get('index.html');
    };

    self.setTodo = function (name) {
        self.input.sendKeys(name);
    };
};

module.exports = DetailsPage;
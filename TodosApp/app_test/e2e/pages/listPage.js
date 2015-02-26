var DetailsPage = function () {
    var self = this;
    self.input = element(by.name('newTodoText'));
    self.addButton = element(by.buttonText('add'));
    self.removeTodoButton = element(by.buttonText('remove done'));
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
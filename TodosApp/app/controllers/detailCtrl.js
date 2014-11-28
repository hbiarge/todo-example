(function () {
    'use strict';

    function detailCtrl($scope, $routeParams, todoStore) {

        $scope.todo = todoStore.getById(parseInt($routeParams.todoId));

    }

    detailCtrl.$inject = ['$scope', '$routeParams', 'todoStore'];

    angular.module('todo').controller('DetailCtrl', detailCtrl);

})();

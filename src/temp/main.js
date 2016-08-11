var todoApp = angular.module('todoList', []);

todoApp.controller('addTodo', function($scope){
    $scope.todos = [];
    $scope.todo = {};

    $scope.addTodoBtn = function(){
        $scope.todos.push($scope.todo);
        $scope.todo = {};
    }
})

.controller('removeTodos', function($scope){
    $scope.removeTodoBtn = function(task){
        var removalIndex = $scope.todos.indexOf(task)
        $scope.todos.splice(removalIndex, 1);
    }

});
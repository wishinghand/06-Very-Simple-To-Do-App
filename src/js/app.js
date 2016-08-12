var todoApp = angular.module('todoList', []);

todoApp.controller('addTodo', function($scope){
    //instantiate empty todo list (.todos) and todo object (.todo)
    $scope.todos = [];
    $scope.todo = {};

    $scope.addTodoBtn = function(){
        $scope.todos.push($scope.todo);
        //emptying todo object after pushing to array, clears objects scope, no need for further DOM manipulation to clear inputs
        $scope.todo = {};
    }
})

.controller('removeTodos', function($scope){
    $scope.removeTodoBtn = function(task){
        //passing the argument into function on DOM gives access to specific task being referred to in Array, allows indexOf to grab it's index and splice it off
        var removalIndex = $scope.todos.indexOf(task)
        $scope.todos.splice(removalIndex, 1);
    }

});
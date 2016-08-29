(function() {
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController);

    TodoController.$inject = [];

    /* @ngInject */
    function TodoController() {
        var vm = this;
        vm.title = 'TodoController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();
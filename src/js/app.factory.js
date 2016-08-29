(function() {
    'use strict';

    angular
        .module('app')
        .factory('TodoFactory', TodoFactory);

    TodoFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function TodoFactory($http, $q) {
        var service = {
           create: create,
           read: read,
           update: update,
           delete: deleteTodo
        };
        return service;

        ////////////////

        function create(){

        }
        
        function read(){

        }
        
        function update(){

        }
        
        function delete(){

        }
        

    }
})();
(function() {
    'use strict';

    angular
        .module('app.shots')
        .config(config);

    config.$inject = ['$routeProvider'];

    /* @ngInject */
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/shots/list.html',
                controller: 'List',
                controllerAs: 'list'
            })
            .when('/:shotId', {
                templateUrl: 'app/shots/shot.html',
                controller: 'Shot',
                controllerAs: 'shot'
            });
    }
})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(config);

    config.$inject = ['$httpProvider'];
    /* @ngInject */
    function config($httpProvider) {
    	var accessToken = 'access-token';
        $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
    }
})();

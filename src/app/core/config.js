(function() {
    'use strict';

    angular
        .module('app.core')
        .config(config);

    config.$inject = ['$httpProvider'];
    /* @ngInject */
    function config($httpProvider) {
    	var accessToken = '1ff19f35ddd2d90a8e66b4e36221f4488a489acddf26a4ce75136bcf8484cafb';
        $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
    }
})();

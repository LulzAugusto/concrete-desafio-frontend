(function() {
    'use strict';

    angular
        .module('app.shots')
        .controller('Shot', Shot);

    Shot.$inject = ['Shots', '$routeParams', '$location'];

    /* @ngInject */
    function Shot(Shots, $routeParams, $location) {
        var vm = this;

        vm.model = {};
        vm.goToList = goToList;

        activate();

        function activate() {
            return Shots.getShot($routeParams.shotId).then(function(shot) {
                vm.model = shot;
            });
        }

        function goToList() {
            $location.url('/');
        }
    }
})();

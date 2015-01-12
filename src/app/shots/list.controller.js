(function() {
    'use strict';

    angular
        .module('app.shots')
        .controller('List', List);

    List.$inject = ['Shots', '$timeout'];

    /* @ngInject */
    function List(Shots, $timeout) {
        var vm = this;
        var page = 1;

        vm.shots = [];
        vm.debouncePaginate = debouncePaginate();

        activate();

        function activate() {
            return getShots().then();
        }

        function debouncePaginate() {
            var timeWindow = 300;
            var timeout;
            /* jshint validthis: true */
            var context = this;

            return function() {
                $timeout.cancel(timeout);
                timeout = $timeout(paginate, timeWindow);
            };
        }

        function paginate() {
            page += 1;
            activate();
        }

        function getShots() {
            return Shots.getShots(page).then(function(shots) {
                vm.shots.push.apply(vm.shots, shots);
            });
        }
    }
})();

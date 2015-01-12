(function() {
    'use strict';

    angular
        .module('app.shots')
        .factory('Shots', Shots);

    Shots.$inject = ['$http', 'API_URL', '$sce'];

    /* @ngInject */
    function Shots($http, API_URL, $sce) {
        var url = API_URL + 'shots';

        var service = {
            getShots: getShots,
            getShot: getShot
        };

        return service;

        function getShots(page) {
            var params = {
                page: page ? page : 1,
                per_page: 5
            };

            return $http
                .get(url, {params: params})
                .then(function(result) {
                    return initializeObjects(result.data);
                });
        }

        function getShot(id) {
            return $http
                .get(url + '/' + id)
                .then(function(result) {
                    return initializeObjects([result.data]);
                });
        }

        function initializeObjects(list) {
            var shots = [];
            angular.forEach(list, function(shotResource) {
                shots.push(angular.extend(new Shot(), shotResource));
            });

            return shots.length > 1 ? shots : shots[0];
        }

        function Shot() {
            this.getImageUrl = function() {
                return angular.isString(this.images.hidpi) ? this.images.hidpi : this.images.normal;
            };

            this.getDescription = function() {
                return $sce.trustAsHtml(this.description);
            };
        }
    }
})();

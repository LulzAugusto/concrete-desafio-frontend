(function() {
    'use strict';

    angular
        .module('app.shots')
        .directive('csShotsImage', csShotsImage);

    /* @ngInject */
    function csShotsImage() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'app/shots/image.directive.html',
            scope: {
            	shot: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
})();

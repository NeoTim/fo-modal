(function(window, angular, undefined) {
    'use strict';

    angular.module('ngLinkActive', []).directive('linkActive', function($location) {
        return {

            restrict: 'A',
            link: function(scope, element) {

                // 获取a的href属性
                var path = element[0].href;

                scope.location = $location;

                // 监听url变化
                scope.$watch('location.absUrl()', function(newPath) {

                    if (path === newPath) {
                        element.addClass('active');
                    } else {
                        element.removeClass('active');
                    }
                });
            }
        };
    });

    // console.log(window.ngLinkActive);

})(window, window.angular);

angular.module('app', [
    'ngRoute',
    'ngLinkActive',
    'ngNearbyPopover',
    'controllers'
])

.config(function($routeProvider, $httpProvider) {

    $routeProvider
        .otherwise({
            redirectTo: '/'
        })
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html'
        })
});

angular.
  module('letgoApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/login', {
          template: '<login></login>'
        }).
        when('/newUser', {
          template: '<newUser></newUser>'
        }).
        when('/forSale', {
          template: '<forSale></forSale>'
        }).
        when('/forSale/:listId', {
          template: '<itemDetail></itemDetail>'
        }).
        otherwise('/login');
    }
  ]);
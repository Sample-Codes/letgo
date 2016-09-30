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
          template: '<new-user></new-user>'
        }).
        when('/forSale/', {
          template: '<for-sale></for-sale>'
        }).
        // when('/forSale/:username', {
        //   template: '<for-sale></for-sale>'
        // }).
        when('/newListing', {
          template: '<new-listing></new-listing>'
        }).
        when('/updateListingPrice', {
          template: '<update-listing-price></update-listing-price>'
        }).
        when('/itemDetail/:listid', {
          template: '<item-detail></item-detail>'
        }).
        when('/updateListing/:listid', {
          template: '<update-listing></update-listing>'
        }).
        otherwise('/login');
    }
  ]);
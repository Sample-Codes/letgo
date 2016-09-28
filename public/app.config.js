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
        when('/updateListingPrice/:listid:listingprice', {
          template: '<update-listingprice></update-listingprice>'
        }).
        when('/updateListing/:listid', {
          template: '<update-listing></update-listing>'
        }).
        otherwise('/login');
    }
  ]);
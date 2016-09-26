// Register `forSale` component, along with its associated controller and template
angular.
  module('forSale', ['ngCookies']).
  component('forSale', {
      templateUrl: '/static/forSale/forSale.template.html',

      controller: function forSaleController($scope, $http, $location, $cookies) {
        var self = this;
        self.orderProp = 'insert_ts';
        //self.username = decodeURIComponent($routeParams.username);
        //console.log("params: " + self.username);

        var cUserid = $cookies.get('userid');
        var cUsername = $cookies.get('name');
        var cLocation = $cookies.get('location');
        self.username = cUsername;
        self.location = cLocation;

        if (cUserid == undefined) {
          $location.url('/login');
        }

        $http.get('/getListings').then(function (response) {
          self.listings = response.data;
        });

        //** click submit
        self.redirect = function () {
          $location.url('/newListing/');
        }

        //** click Sign Out
        self.signout = function() {
          $cookies.remove('userid');
          $cookies.remove('email');
          $cookies.remove('name');
          $cookies.remove('location');
          reloadBG();   //** reload background image *optional*
          $location.url('/login');
        }    
    }
  });
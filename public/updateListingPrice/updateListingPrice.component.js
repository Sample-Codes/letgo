// Register `forSale` component, along with its associated controller and template
angular.
  module('updateListingPrice')
  .component('updateListingPrice', {
    templateUrl: '/static/updateListingPrice/updateListingPrice.template.html',

    controller: function updateListingPriceController($scope, $http, $location, $cookies) {
      var self = this;

      //self.listing = $routeParams.listing;
      //
      //self.listprice = $routeParams.listingprice;
      //console.log('listing from scope:')
      //console.dir($scope)
      //self.listid = $scope.selectListing.listid;price;
      //console.dir(self.listing);
      
      //console.log("listprice from route params: " + self.listid);

      var cUserid = $cookies.get('userid');
      var cUsername = $cookies.get('name');
      var cLocation = $cookies.get('location');
      var cListId = $cookies.get('listid');
      var cPrice = $cookies.get('price');
      self.userid = cUserid;
      self.username = cUsername;
      self.mylocation = cLocation;
      self.listid = cListId;
      self.listprice = cPrice;

      console.log("listid : " + self.listid);

      self.reset = function () {
        self.price = self.listprice;
        //self.price = 10;
      };
      self.reset();

      self.redirect = function () {
        console.log('User clicked update price');
        
        console.log(self);

        var fd = new FormData();
        fd.append('listId', self.listid);
        fd.append('price', self.price);

        $http.post('/updateListingPrice', fd)
          .success(function (res, url, data, config) {
            console.log('res')
            console.dir(res)
            console.log("$http.post('/updateListingPrice') triggered.");
            $location.url('/forSale')
          })
          .error(function (res) {
            console.log("error: " + res);
          });

      }
      self.cancel = function () {
        console.log('User cancelled updating listing price form.');
        $location.url('/forSale')
      }
    }
  });
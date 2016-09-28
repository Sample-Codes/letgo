// Register `forSale` component, along with its associated controller and template
angular.
  module('updateListingPrice')
  .component('updateListingPrice', {
    templateUrl: '/static/updateListingPrice/updateListingPrice.template.html',

    controller: function newLisupdateListingPriceController($scope, $http, $location, $cookies, $routeParams) {
      var self = this;

      self.listid = $routeParams.listid;
      self.listprice = $routeParams.listingprice;
      console.log("listid from route params: " + self.listid);
      console.log("listprice from route params: " + self.listid);

      var cUserid = $cookies.get('userid');
      var cUsername = $cookies.get('name');
      var cLocation = $cookies.get('location');
      self.userid = cUserid;
      self.username = cUsername;
      self.mylocation = cLocation;

      self.reset = function () {
        self.price = self.listprice;
      };
      self.reset();

      self.redirect = function () {
        console.log('User clicked update price');
        
        console.log(self);

        var fd = new FormData();
        fd.append('userId', self.userid);
        fd.append('price', self.price);

        $http.post('/insertListing', fd)
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
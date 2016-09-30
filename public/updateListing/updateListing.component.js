// Register `forSale` component, along with its associated controller and template
angular.
  module('updateListing')
  .component('updateListing', {
    templateUrl: '/static/updateListing/updateListing.template.html',

    controller: function updateListingController($scope, $http, $location, $cookies, $routeParams, ListingService ) {
      var self = this;

      //$scope.options = ['POSTED', 'PENDING', 'SOLD'];

      self.listid = $routeParams.listid;
      console.log("listid from route params: " + self.listid);

      self.cUserid = $cookies.get('userid');
      console.log("Userid from cookies jar: " + self.cUserid);

      var cLocation = $cookies.get('location');
      self.myLocation = cLocation;
      
      ListingService.allList().then(function(dataResponse) {

        self.listing = ListingService.singleItem(self.listid, dataResponse.data);
    
      });


      self.redirect = function () {
        console.log('User clicked submit');
        console.log('service here')
        
        console.log(self);
        //console.log($scope);
        //console.log($scope.$ctrl);

         //console.log('file here')
        // console.dir(self.myFile)

        // var fd = new FormData();
        // fd.append('userId', self.cUserid);
        // fd.append('listId', self.listid);

        // //fd.append('file', self.myFile);
        // fd.append('description', self.listing.description);
        // fd.append('category', self.listing.category);
        // fd.append('price', self.listing.price);
        // fd.append('location', self.listing.location);
        // fd.append('status', self.listing.status);
        // console.log(fd)

        var updatedListing = {
          userId: self.cUserid,
          listId: self.listid,
          description: self.listing.description,
          price: self.listing.price,
          category: self.listing.category,
          location: self.listing.location,
          status: self.listing.status,
        };

        console.dir(updatedListing)

        $http.post('/updateListing', updatedListing)
          .success(function (res, url, data, config) {
            //console.log('res')
            //console.dir(res)
            console.log("$http.post('/updateListing') triggered.");
            $location.url('/itemDetail/' + self.listid)
          })
          .error(function (res) {
            console.log("error: " + res);
          });

      }

      self.reset = function () {
        self.listing.description = "";
        self.listing.category = "";
        self.listing.price = 5;
        self.listing.location = self.myLocation;
        self.listing.status = "POSTED";
      }

      self.cancel = function () {
        console.log('User cancelled posting form.');
        $location.url('/forSale')
      }


    }
  });
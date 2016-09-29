// Register `forSale` component, along with its associated controller and template
angular.
  module('newListing')
  .component('newListing', {
    templateUrl: '/static/newListing/newListing.template.html',

    controller: function newListingController($scope, $http, $location, $cookies) {
      var self = this;

      var cUserid = $cookies.get('userid');
      var cUsername = $cookies.get('name');
      var cLocation = $cookies.get('location');
      self.userid = cUserid;
      self.username = cUsername;
      self.mylocation = cLocation;

      self.reset = function () {
        self.description = "";
        self.category = "";
        self.price = 5;
        self.myFile = "";
        self.location = self.mylocation;
      };
      self.reset();

      self.redirect = function () {
        console.log('User clicked submit');
        console.log('service here')
        
        console.log(self);
        //console.log($scope);
        //console.log($scope.$ctrl);

         //console.log('file here')
        // console.dir(self.myFile)

        var fd = new FormData();
        fd.append('file', self.myFile);
        fd.append('userId', self.userid);
        fd.append('description', self.description);
        fd.append('category', self.category);
        fd.append('price', self.price);
        fd.append('location', self.location);

        $http.post('/insertListing', fd, {
           transformRequest: angular.identity,
           headers: { 'Content-Type': undefined }
         }
         )
          .success(function (res, url, data, config) {
            console.log('res')
            console.dir(res)
            console.log("$http.post('/insertPost') triggered.");
            $location.url('/forSale')
          })
          .error(function (res) {
            console.log("error: " + res);
          });

      }
      self.cancel = function () {
        console.log('User cancelled posting form.');
        $location.url('/forSale')
      }
    }
  });
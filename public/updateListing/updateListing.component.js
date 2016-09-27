// Register `forSale` component, along with its associated controller and template
angular.
  module('updateListing')
  .component('updateListing', {
    templateUrl: '/static/updateListing/updateListing.template.html',

    controller: function updateListingController($scope, $http, $location, $cookies, $routeParams) {
      var self = this;

      self.listid = $routeParams.listid;
       console.log("listid from route params: " + self.listid);

      self.cUserid = $cookies.get('userid');
      console.log("Userid from cookies jar: " + self.cUserid);

      self.redirect = function () {
        console.log('User clicked submit');
        console.log('service here')
        
        console.log(self);
        //console.log($scope);
        //console.log($scope.$ctrl);

         //console.log('file here')
        // console.dir(self.myFile)

        var fd = new FormData();
        fd.append('userId', self.cUserid);
        fd.append('listId', self.listid);

        fd.append('file', self.myFile);
        fd.append('description', self.description);
        fd.append('category', self.category);
        fd.append('price', self.price);
        fd.append('location', self.location);

        $http.post('/updateListing', fd, {
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
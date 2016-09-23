// Register `login` component, along with its associated controller and template
angular.
  module('login').
  component('login', {  
      //** template
      templateUrl: '/static/login/login.template.html',
      //** controller
      controller: function loginController($scope, $http, $location) {
        var self = this;
        //** click submit 
        self.redirect = function() {
          console.log('User clicked submit with ', self.userName);

          $http.get('/getUser/'+self.userName)
            .success(function(res) {    //** First function handles success
                reloadBG();   //** reload background image *optional*
                var email = encodeURIComponent(self.userName);

                $location.url('/forSale/' + email);
            })
            .error(function(res){         //** First function handles error
              console.log("Invalid username, try again!");
              self.errorMessage = "Invalid username, try again!";
            });

          // $http.get('/getUser/'+self.userName)
          //   .then(function (res) {    //** First function handles success
          //       reloadBG();   //** reload background image *optional*
          //       $location.url('/forSale');
          //   }, function(res){         //** First function handles error
          //     console.log("Invalid username, try again!");
          //     self.errorMessage = "Invalid username, try again!";
          //   })
        }
        //** click register
        self.register = function() {
          reloadBG();   //** reload background image *optional*
          $location.url('/newUser');
        }            
      }

  });

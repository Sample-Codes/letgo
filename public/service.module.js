angular.module('servicesMod', [
  'ngRoute',
  'login'
]).service('ListingService', function($http){    

    var allListings;
    
    //save method create a new contact if not already exists
    //else update the existing object
    this.saveListings = function (listings) {
        console.log('inside saveListings');
        $http.get('/getListings').then(function (response) {
            listings = response.data;
            console.log('listings '+ listings);
             for (var i = 0; i < listings.length; i++) {
                listings[i].liked = false;
            }
           
        }),(err)=>{
            console.log('error getting all the listings');
        };
    }

    //simply search contacts list for given id
    //and returns the contact object if found
    this.myList = function (id, listings) {
        var arr = [];
        for (i in listings) {
            if (listings[i].userid == id) {
               arr.push(listings[i]);                
            }
        }
        return arr;
    }

    this.singleItem = function(listId, listings){
        for (i in listings){
            if(listings[i].listid == listId){
                singleListing = listings[i];
                console.log("single item: " + singleListing);
                return singleListing;
            }
        }
    }
    
    //iterate through contacts list and delete 
    //contact if found
    this.delete = function (listId) {
        $http.push('/deleteListing').then(function (response){

        }),(err)=>{
            console.log("problem deleting listing");
        }
        
    }

    //simply returns the contacts list
    this.allList = function () {
        console.log('inside saveListings');
        var p = $http.get('/getListings');
        p.then(function(res){
            allListings = res.data;
        });
       return p;
    }
        
    }
)
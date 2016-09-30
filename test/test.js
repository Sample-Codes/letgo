
var fs = require('fs');
var db = require('../db.js');

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var assert = require('chai').assert;

var user = {
  userid: '',
  name: '',
  location: '',
  email: ''
};
var listing = {
  listid: '',
  userName: '',
  userEmail: '',
  userid: '',
  description: '',
  price: '',
  category: '',
  status: '',
  location: '',
  imageFile: '',
  insertDt: ''
};
var watchedListing = {
  userid: '',
  listid: '',
  insertDt: '',
  listing: ''
};


/**********************************************************************************
 * Before running the tests make sure to run the populateDB.js
 * This will populate the database with known values
 * Data Summary
 * userid between 1 and 10
 * listid between 1 and 60
 * userid listids  watchlist
 * -------------------------
 *    1   1-6       [10,20,30,40,50,60]; //uid 1 exclude 1-6
 *    2   7-12      [1,21,31,41,51]; //uid 2 exclude  7-12
 *    3   13-18     [2,4,8,32]; //uid 3 exclude  13-18
 *    4   19-24     [3,6,9,12,15,18,27,30,33,36,]; //uid 4 exclude 19-24
 *    5   25-30     [4,8,12,16,20,24,32,36,40,44,48,52,56,60]; //uid 5 exclude 25-30
 *    6   31-36     [5,10,15,20,25,30,40,45,50,55,60]; //uid 6 exclude 31-36
 *    7   37-42     [6,12,18,24,30,48,54,60]; //uid 7 exclude 37-42
 *    8   43-48     [7,14,21,28,35,42,49,56]; //uid 8 exclude 43-48
 *    9   49-54     [8,16,24,32,40,48,56]; //uid 9 exclude 49-54
 *   10   55-60     [9,18,27,36,45,54]; //uid 10 exclude 55-60
 * 
 * user email = 'user_email' + (userid -1) + '@gmail.com'
 * 
 * getUser;        // email
 * updateUser;  // userid name, email, location, password
 * updateUserName;  // userid
 * updateUserPassword;  // userid
 * updateUserEmail;  // userid
 * insertUser;  // name, email, location, password
 * updateUserLocation;  // userid
 * deleteUser;  // userid
 * insertListing;  // userid, description, price, category, location, photo
 * updateListing;  //userid, listid, description, price, category, status, location, photo
 * updateListingPrice; //userid, listid,price
 * updateListingDescription; //userid, listid,description
 * updateListingLocation;//userid, listid, location
 * updateListingPhoto; //userid, listid,photo
 * addListingPhoto; //userid, listid,photo
 * deleteListingPhoto; //userid, listid,photo
 * deleteListingPhotos;
 * deleteUserPhotos;
 * getListingPhotos; //listid,photo
 * updateListingStatus;//userid, listid,status
 * getAllListings;   // NONE
 * getListings;  //  Listing object
 * deleteListing; //userid, listid
 * getSellList; //userid
 * getWatchList; // userid
 * insertWatchList; //userid, listid
 * deleteWatchList; //userid, listid
 * deleteEntireWatchList; //
 * getWatchersForListing; * 
 **********************************************************************************/

describe('Database Testing', function () {
  // Test user retrieval and modifications first
  /*
    describe('Retrieve User()', function () {
    it('Test the retrieve a user profile', function () {
      return (db.getUser('user_email0@gmail.com','password')).then(function (user) {
        expect(user).to.not.equal(null);
        expect(user.userid).to.not.equal(null);
        expect(user.name).to.not.equal(null);
        expect(user.email).to.not.equal(null);
        expect(user.location).to.not.equal(null);
      }, function (error) {
         assert.fail(error);
      });
    });
    it('Test the retrieve a unknown user profile', function () {
      return (db.getUser('useremail0@gmail.com','password')).then(function (user) {
        expect(user).to.equal(null);
      }, function (error) {
        assert.fail(error);
       });
    });
    it('Test the retrieve a known user profile w bad password', function () {
      return (db.getUser('user_email0@gmail.com','Password')).then(function (user) {
        expect(user).to.equal(null);
      }, function (error) {
        assert.fail(error);
      });
    });
    
  });  // End Retrieve user

  describe('Test updating user profile', function(){
    it('updateUser', function() {
      var name = 'Anshe Purdy';
      var email= 'AnshePurdy@verizon.net';
      var loc = 'Glen Burnie';
      var pwd = 'password';
      return (db.updateUser(4,name, email,loc)).then(function(){
        return (db.getUser(email,pwd)).then(function (user) {
          expect(user).to.not.equal(null);
          expect(user.userid).to.equal(4);
          expect(user.name).to.equal(name);
          expect(user.email).to.equal(email);
          expect(user.location).to.equal(loc);
        }, function (error) {
          assert.fail(error);
        }); 
      }, function (error) {
         assert.fail(error);
      });
    })
    it('updateUserName', function() {
     var email= 'user_email4@gmail.com';
     var name = 'Damifino Purdy';
     var pwd = 'password';
    return (db.updateUserName(5,name)).then(function(){
       return (db.getUser(email,pwd)).then(function (user) {
          expect(user).to.not.equal(null);
          expect(user.userid).to.equal(5);
          expect(user.name).to.equal(name);
        }, function (error) {
          assert.fail(error);
        });
      }, function (error) {
         assert.fail(error);
      });
    });
    it('updateUserPassword', function() {
      var email= 'user_email4@gmail.com';
      var pwd = 'Damifino';
      return (db.updateUserPassword(5,pwd)).then(function(){
        return (db.getUser(email,pwd)).then(function (user) {
          expect(user).to.not.equal(null);
          expect(user.userid).equal(5);
          expect(user.password).equal(pwd);
        }, function (error) {
          assert.fail(error);
        });
       
      }, function (error) {
         assert.fail(error);
      });
    })
    it('updateUserEmail', function() {
      var email= 'Damifino@verizon.net';
      var pwd = 'Damifino';
      return (db.updateUserEmail(5,email)).then(function(){
        return (db.getUser(email,pwd)).then(function (user) {
          expect(user).to.not.equal(null);
          expect(user.userid).equal(5);
          expect(user.email).equal(email);
        }, function (error) {
          assert.fail(error);
        });
       
      }, function (error) {
         assert.fail(error);
      });
    })
    it('updateUserLocation', function() {
      var loc = 'Odenton';
      var email= 'Damifino@verizon.net';
      var pwd = 'Damifino';
      return (db.updateUserLocation(5,loc)).then(function(){
        return (db.getUser(email,pwd)).then(function (user) {
          expect(user).to.not.equal(null);
          expect(user.userid).equal(5);
          expect(user.location).equal(loc);
        }, function (error) {
          assert.fail(error);
        });
       
      }, function (error) {
         assert.fail(error);
      });
    });
  });

   describe('Test listing retrieval and updated', function(){
    it('getAllListings()', function () {
      return (db.getAllListings()).then(function (list) {
        expect(list.length).gt(0);
        expect(list.length).equal(60);
      }, function (error) {
        assert.fail(error);
      });
    });
    it('getListings(null)', function () {
      return (db.getListings(null)).then(function (list){
        expect(list.length).gt(0);
        expect(list.length).equal(60);
      }, function (error){
        assert.fail(error);
      });
    });
    it('getListings(listid)', function () {
      var srch = Object.create(listing)
      srch.listid= 15;
      srch.userName= null;
      srch.userEmail= null;
      srch.userid= null;
      srch.description= null;
      srch.price= null;
      srch.category= null;
      srch.status= null;
      srch.location= null;
      srch.imageFile= null;
      srch.insertDt= null;
      return (db.getListings(srch)).then(function (list){
        expect(list.length).equal(1);

      }, function (error){        
        assert.fail(error);
      });
    });
    it('getListings(userid)', function () {
      var srch = Object.create(listing)
      srch.listid= null;
      srch.userName= null;
      srch.userEmail= null;
      srch.userid= 5;
      srch.description= null;
      srch.price= null;
      srch.category= null;
      srch.status= null;
      srch.location= null;
      srch.imageFile= null;
      srch.insertDt= null;
      return (db.getListings(srch)).then(function (list){
        expect(list.length).equal(6);
      }, function (error){
        assert.fail(error);        
      });
    });
    it('getListings(category)', function () {
      var srch = Object.create(listing)
      srch.listid= null;
      srch.userName= null;
      srch.userEmail= null;
      srch.userid= null;
      srch.description= null;
      srch.price= null;
      srch.category= 'Car';
      srch.status= null;
      srch.location= null;
      srch.imageFile= null;
      srch.insertDt= null;
      return (db.getListings(srch)).then(function (list){
        expect(list.length).equal(10);
      }, function (error){
        assert.fail(error);        
      });
    });
    it('getListings(location)', function () {
      var srch = Object.create(listing)
      srch.listid= null;
      srch.userName= null;
      srch.userEmail= null;
      srch.userid= null;
      srch.description= null;
      srch.price= null;
      srch.category= null;
      srch.status= null;
      srch.location= 'Baltimore';
      srch.imageFile= null;
      srch.insertDt= null;
      return (db.getListings(srch)).then(function (list){
        expect(list.length).equal(24);
      }, function (error){
        assert.fail(error);        
      });
    });
    it('getListings(category, location)', function () {
      var srch = Object.create(listing)
      srch.listid= null;
      srch.userName= null;
      srch.userEmail= null;
      srch.userid= null;
      srch.description= null;
      srch.price= null;
      srch.category= 'Car';
      srch.status= null;
      srch.location= 'Baltimore';
      srch.imageFile= null;
      srch.insertDt= null;
      return (db.getListings(srch)).then(function (list){
        expect(list.length).equal(4);
      }, function (error){
        assert.fail(error);        
      });
    });
  });
 
  describe('Test updating listings', function() {
    it('Update listing(all)', function () {
       var list1 = Object.create(listing)
      list1.listid= 4;
      list1.userid= 1;
      list1.description= null;
      list1.price= 18999.95;
      list1.category= null;
      list1.status= 'Offer';
      list1.location= 'Belair';
      list1.imageFile= null;
   
      return (db.updateListing(list1.userid, list1.listid, list1.description, list1.price, 
        list1.category, list1.status, list1.location)).then(function () {
          assert.isTrue(true, 'Listing updated');
          return (db.getListings(list1)).then(function (list) {
            expect(list.length).equal(1);
            var list2 = list[0];
            expect(list2.price).equal(list1.price);
            expect(list2.status).equal(list1.status);
            expect(list2.location).equal(list1.location);
     //       expect(list2.description).equal(list1.description);
          }, function(error){
              assert.fail(error);
          });
      }, function (error) {
        assert.fail(error);
      });
    });
    it('Update listing(Price)', function () {
      var price = 2565.99;

      return (db.updateListingPrice(2, 9, price)).then(function () {
         assert.isTrue(true, 'Listing updated');
      }, function (error) {
        assert.fail(error);
      });
    });
    it('Update listing(Description)', function () {
      var description = 'The moaning lisa';
 
      return (db.updateListing(2, 9, description)).then(function () {
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
         assert.fail(error);
      });
    });
    it('Update listing(Photo)', function () {
      var photo = 'photo2.jpg';
      return (db.updateListing(2, 9, photo)).then(function () {
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('Update listing(Status)', function () {
      var status = 'pending';

      return (db.updateListing(2, 9, status)).then(function () {
        assert.isTrue(true, 'Listing updated');
      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('Update listing(Location)', function () {
      var location = 'DC';

      return (db.updateListingLocation(2, 9, location)).then(function () {
       assert.isTrue(true, 'Listing updated');
      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('getSellList(userid)', function () {
      var srchListing = Object.create(listing);
      return (db.getSellList(1)).then(function (list) {
  
        expect(list.length > 0);
        expect(list.length).to.equal(6, 'Six rows');

      }, function (error) {
  
        assert.fail(error);
      });
    });
  });
  */

  // Test inserting a user
  describe('test user insert functions', function () {
    it('insertUser(name, email, location)clean', function () {
      var user1 = Object.create(user);
      user1.name = "Iniyo Montoya";
      user1.email = "Iniyo@PrincessBride.com";
      user1.location = "Philadelphia";
      return (db.insertUser(user1.name, user1.email, user1.location)).then(function (pk) {
        user1.userid = pk;
        expect(pk).gt(0);
        return (db.getUser(user1.email, 'password')).then(function (iniyo){
          expect(iniyo).not.equal(null);
          expect(iniyo.userid).equal(pk);
        }, function (err) {assert.fail(err);});
      }, function (error) {
        assert.fail(error);
      });
    });
    it('insertUser(name, email, location)duplicate', function () {
      var user1 = Object.create(user);
      user1.name = "Iniyo Montoya";
      user1.email = "Iniyo@PrincessBride.com";
      user1.location = "Philadelphia";
      return (db.insertUser(user1.name, user1.email, user1.location)).then(function (pk) {
        expect(pk).equal(null);
        assert.isTrue(false, 'duplicate allowed');
       }, function (error) {
        assert.isTrue(true, 'Duplicate insert blocked');
      });
    });

    it('insertUser(name, email, location, password)', function () {
      var user1 = Object.create(user);
      user1.name = "Fessig Giant";
      user1.email = "Fessig@PrincessBride.com";
      user1.location = "Philadelphia";
      user1.password = 'Abc123';
      return (db.insertUser(user1.name, user1.email, user1.location,user1.password)).then(function (pk) {
        user1.userid = pk;
        expect(pk).gt(0);
        return (db.getUser(user1.email, user1.password)).then(function (fessig){
          expect(fessig).not.equal(null);
          expect(fessig.userid).equal(pk);
        }, function (err) {assert.fail(err);});
      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('insertUser(Missing email)', function () {
      var user1 = Object.create(user);
      user1.name = "Princess Buttercup";
      user1.email = null;
      user1.location = "Philadelphia";
      user1.password = 'Abc123';
      return (db.insertUser(user1.name, null, user1.location)).then(function (pk) {
        assert.isTrue(false, 'success is failure');
      }, function (error) {
        assert.isTrue(true, 'failure is a success');
      });
    });
  });

 /*
  // Test listing insert
  describe('Test Listings()', function () {
    // name, email, location
    it('Test the ability to insert a user', function () {
      var userid, list1.description, list1.price, list1.category, user1.location, null
      return (db.insertListing(userid, description, list1.price, list1.category, user1.location, null)).then(function (data) {
        list1.listid = data;
        expect(data > 0);
      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('Test the ability to insert a user', function () {

      return (db.insertListing(user1.userid, list1.description, list1.price, list1.category, user1.location, null)).then(function (data) {
        list1.listid = data;
        expect(data > 0);
      }, function (error) {
  
        assert.fail(error);
      });
    });
  });
  */
  /*
  // Test watchlist retrieval
  describe('Test watchlist functions', function () {
    it('retrieve a users watch list(userid)', function () {
      return (db.getWatchList(1)).then(function (list) {
        expect(list.length).gt(0);
        expect(list.length).to.equal(1, 'One rows');

      }, function (error) {
        assert.fail(error);
      });
    });
    it('add a listing to a users watch list(userid, listid)', function () {
      return (db.insertWatchList(1, 10)).then(function (list) {
  
        expect(list.length).gt(0);
        expect(list.length).equal(1, 'One rows');

      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('add a list of users watchinng a listing(listid)', function () {
      return (db.getWatchersForListing(10)).then(function (list) {
  
        expect(list.length).gt(0);
        expect(list.length).to.equal(1, 'One rows');

      }, function (error) {
  
        assert.fail(error);
      });
    });
  });
  // Test Delete functions


  describe('Test delete functions', function () {
    it('Delete an item from the watchlist(userid, listid)', function () {
      return (db.deleteWatchList(1, 10)).then(function () {
        expect(list.length > 0);
        expect(list.length).to.equal(1, 'One rows');

      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('Delete a listing deletes watchlist too(listid)', function () {
      return (db.deleteListing(2,11)).then(function () {
        expect(list.length > 0);
        expect(list.length).to.equal(1, 'One rows');

      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('Delete a user deletes listing, watchlist too(listid)', function () {
      return (db.deleteUser(2)).then(function () {
        expect(list.length > 0);
        expect(list.length).to.equal(1, 'One rows');

      }, function (error) {
  
        assert.fail(error);
      });
    });
    it('Delete a users watchlist too(listid)', function () {
      return (db.deleteEntireWatchList(3)).then(function () {
        expect(list.length > 0);
        expect(list.length).to.equal(1, 'One rows');

      }, function (error) {
  
        assert.fail(error);
      });
    });
  });
*/
});
